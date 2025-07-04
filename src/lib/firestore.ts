// Este arquivo agora só deve conter funções utilitárias para acessar o Firestore, sem autenticação.

import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  serverTimestamp,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  FieldValue,
  limit,
  orderBy
} from 'firebase/firestore'
import { db } from './firebase'
import { User, Protocol, Investment, Task, Payment, Airdrop, TwoFactorCode, CalendarEvent, ProtocolLink, AffiliateCode, AffiliateUsage } from './types'
import { convertFirestoreDate } from './utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertTimestamp = (timestamp: FieldValue | any): Date => {
  if (!timestamp) return new Date()
  return timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
}

// Converter documento do Firestore para objeto com tipos corretos
export function convertFirestoreDoc<T extends object>(doc: DocumentSnapshot | QueryDocumentSnapshot): T | null {
  const data = doc.data()
  if (!data) return null

  const converted = { id: doc.id, ...data }
  
  // Converter timestamps para Date
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convertedAny = converted as any

  if (convertedAny.createdAt) convertedAny.createdAt = convertTimestamp(convertedAny.createdAt)
  if (convertedAny.updatedAt) convertedAny.updatedAt = convertTimestamp(convertedAny.updatedAt)
  if (convertedAny.premiumUntil) convertedAny.premiumUntil = convertTimestamp(convertedAny.premiumUntil)
  if (convertedAny.farmStartDate) convertedAny.farmStartDate = convertTimestamp(convertedAny.farmStartDate)
  if (convertedAny.dueDate) convertedAny.dueDate = convertTimestamp(convertedAny.dueDate)
  if (convertedAny.completedAt) convertedAny.completedAt = convertTimestamp(convertedAny.completedAt)
  if (convertedAny.verifiedAt) convertedAny.verifiedAt = convertTimestamp(convertedAny.verifiedAt)
  if (convertedAny.validUntil) convertedAny.validUntil = convertTimestamp(convertedAny.validUntil)
  // Para eventos de calendário, usar função especial que mantém fuso local
  if (convertedAny.date) convertedAny.date = convertFirestoreDate(convertedAny.date)
  if (convertedAny.expiresAt) convertedAny.expiresAt = convertTimestamp(convertedAny.expiresAt)

  return convertedAny as T
}

// USERS
export const userService = {
  async create(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'users'), {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return docRef.id
  },

  async findByEmail(email: string): Promise<User | null> {
    const q = query(collection(db, 'users'), where('email', '==', email.toLowerCase()))
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) return null
    
    const doc = querySnapshot.docs[0]
    return convertFirestoreDoc<User>(doc)
  },

  async findById(id: string): Promise<User | null> {
    const docRef = doc(db, 'users', id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) return null
    
    return convertFirestoreDoc<User>(docSnap)
  },

  async update(id: string, userData: Partial<User>): Promise<void> {
    const docRef = doc(db, 'users', id)
    await updateDoc(docRef, {
      ...userData,
      updatedAt: serverTimestamp()
    })
  },

  async findAll(): Promise<User[]> {
    const querySnapshot = await getDocs(collection(db, 'users'))
    return querySnapshot.docs.map(doc => convertFirestoreDoc<User>(doc)).filter(Boolean) as User[]
  }
}

// PROTOCOLS
export const protocolService = {
  async create(protocolData: Omit<Protocol, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'protocols'), {
      ...protocolData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return docRef.id
  },

  async findByUserEmail(userEmail: string): Promise<Protocol[]> {
    const q = query(
      collection(db, 'protocols'), 
      where('userEmail', '==', userEmail)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertFirestoreDoc<Protocol>(doc)).filter(Boolean) as Protocol[];
  },

  /** @deprecated Use findByUserEmail instead */
  async findByUserId(userId: string): Promise<Protocol[]> {
    // Mantido temporariamente para compatibilidade
    return this.findByUserEmail(userId);
  },

  async findById(id: string): Promise<Protocol | null> {
    const docRef = doc(db, 'protocols', id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) return null
    
    return convertFirestoreDoc<Protocol>(docSnap)
  },

  async update(id: string, protocolData: Partial<Protocol>): Promise<void> {
    const docRef = doc(db, 'protocols', id)
    await updateDoc(docRef, {
      ...protocolData,
      updatedAt: serverTimestamp()
    })
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, 'protocols', id)
    await deleteDoc(docRef)
  },

  async getTotalInvestedByUser(userEmail: string): Promise<number> {
    const protocols = await this.findByUserEmail(userEmail);
    const protocolIds = protocols.map(p => p.id);
    if (protocolIds.length === 0) return 0;

    // Esta lógica pode ser otimizada se os investimentos forem buscados de uma vez
    let totalInvested = 0;
    for (const protocolId of protocolIds) {
      const investments = await investmentService.findByProtocolIdAndUser(protocolId, userEmail);
      const protocolInvestment = investments.reduce((sum, investment) => {
        return sum + (investment.type === 'DEPOSIT' ? investment.amount : -investment.amount)
      }, 0);
      totalInvested += protocolInvestment;
    }
    return totalInvested;
  },

  async getActiveProtocolsCount(userEmail: string): Promise<number> {
    const q = query(
      collection(db, 'protocols'),
      where('userEmail', '==', userEmail),
      where('isActive', '==', true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  },

  async findAll(): Promise<Protocol[]> {
    const querySnapshot = await getDocs(collection(db, 'protocols'));
    return querySnapshot.docs.map(doc => convertFirestoreDoc<Protocol>(doc)).filter(Boolean) as Protocol[];
  }
}

// INVESTMENTS
export const investmentService = {
  async create(investmentData: Omit<Investment, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'investments'), {
      ...investmentData,
      createdAt: serverTimestamp()
    })
    return docRef.id
  },

  async findByProtocolId(protocolId: string): Promise<Investment[]> {
    const q = query(
      collection(db, 'investments'), 
      where('protocolId', '==', protocolId)
    )
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => convertFirestoreDoc<Investment>(doc)).filter(Boolean) as Investment[]
  },

  async findById(id: string): Promise<Investment | null> {
    const docRef = doc(db, 'investments', id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) return null
    
    return convertFirestoreDoc<Investment>(docSnap)
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, 'investments', id)
    await deleteDoc(docRef)
  },

  async deleteByProtocolId(protocolId: string): Promise<void> {
    const q = query(
      collection(db, 'investments'), 
      where('protocolId', '==', protocolId)
    )
    const querySnapshot = await getDocs(q)
    
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref))
    await Promise.all(deletePromises)
  },

  async findAll(): Promise<Investment[]> {
    const querySnapshot = await getDocs(collection(db, 'investments'));
    return querySnapshot.docs.map(doc => convertFirestoreDoc<Investment>(doc)).filter(Boolean) as Investment[];
  },

  async findByProtocolIdAndUser(protocolId: string, userEmail: string): Promise<Investment[]> {
    const q = query(
      collection(db, 'investments'),
      where('protocolId', '==', protocolId),
      where('userEmail', '==', userEmail)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertFirestoreDoc<Investment>(doc)).filter(Boolean) as Investment[];
  },

  async findByUserEmail(userEmail: string): Promise<Investment[]> {
    const q = query(
      collection(db, 'investments'),
      where('userEmail', '==', userEmail)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertFirestoreDoc<Investment>(doc)).filter(Boolean) as Investment[];
  }
}

// TASKS
export const taskService = {
  async create(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'tasks'), {
      ...taskData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return docRef.id
  },

  async findByUserEmail(userEmail: string): Promise<Task[]> {
    const q = query(
      collection(db, 'tasks'), 
      where('userEmail', '==', userEmail)
    )
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => convertFirestoreDoc<Task>(doc)).filter(Boolean) as Task[]
  },

  /** @deprecated Use findByUserEmail instead */
  async findByUserId(userId: string): Promise<Task[]> {
    // Mantido temporariamente para compatibilidade
    return this.findByUserEmail(userId);
  },

  async findByProtocolId(protocolId: string): Promise<Task[]> {
    const q = query(
      collection(db, 'tasks'), 
      where('protocolId', '==', protocolId)
    )
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => convertFirestoreDoc<Task>(doc)).filter(Boolean) as Task[]
  },

  async findById(id: string): Promise<Task | null> {
    const docRef = doc(db, 'tasks', id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) return null
    
    return convertFirestoreDoc<Task>(docSnap)
  },

  async update(id: string, taskData: Partial<Task>): Promise<void> {
    const docRef = doc(db, 'tasks', id)
    await updateDoc(docRef, {
      ...taskData,
      updatedAt: serverTimestamp()
    })
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, 'tasks', id)
    await deleteDoc(docRef)
  },

  async deleteByProtocolId(protocolId: string): Promise<void> {
    const q = query(
      collection(db, 'tasks'), 
      where('protocolId', '==', protocolId)
    )
    const querySnapshot = await getDocs(q)
    
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref))
    await Promise.all(deletePromises)
  },

  async cleanOrphanTasks(userEmail: string): Promise<number> {
    // Buscar todas as tasks do usuário
    const userTasks = await this.findByUserEmail(userEmail)
    
    // Buscar todos os protocolos do usuário
    const userProtocols = await protocolService.findByUserEmail(userEmail)
    const validProtocolIds = new Set(userProtocols.map(p => p.id))
    
    // Encontrar tasks órfãs (que referenciam protocolos que não existem mais ou não têm protocolId)
    const orphanTasks = userTasks.filter(task => 
      !task.protocolId || !validProtocolIds.has(task.protocolId)
    )
    
    // Deletar tasks órfãs
    const deletePromises = orphanTasks.map(task => this.delete(task.id))
    await Promise.all(deletePromises)
    
    return orphanTasks.length
  },

  async getTasksCount(protocolIds: string[], isCompleted: boolean): Promise<number> {
    if (protocolIds.length === 0) return 0;
    const q = query(
      collection(db, 'tasks'),
      where('protocolId', 'in', protocolIds),
      where('isCompleted', '==', isCompleted)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  },

  async findAll(): Promise<Task[]> {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    return querySnapshot.docs.map(doc => convertFirestoreDoc<Task>(doc)).filter(Boolean) as Task[];
  },

  async findByProtocolIdAndUser(protocolId: string, userEmail: string): Promise<Task[]> {
    const q = query(
      collection(db, 'tasks'),
      where('protocolId', '==', protocolId),
      where('userEmail', '==', userEmail)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertFirestoreDoc<Task>(doc)).filter(Boolean) as Task[];
  }
}

// PAYMENTS
export const paymentService = {
  async create(paymentData: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'payments'), {
      ...paymentData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return docRef.id
  },

  async findByUserEmail(userEmail: string): Promise<Payment[]> {
    const q = query(
      collection(db, 'payments'), 
      where('userEmail', '==', userEmail)
    )
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => convertFirestoreDoc<Payment>(doc)).filter(Boolean) as Payment[]
  },

  /** @deprecated Use findByUserEmail instead */
  async findByUserId(userId: string): Promise<Payment[]> {
    // Mantido temporariamente para compatibilidade
    return this.findByUserEmail(userId);
  },

  async update(id: string, paymentData: Partial<Payment>): Promise<void> {
    const docRef = doc(db, 'payments', id)
    await updateDoc(docRef, {
      ...paymentData,
      updatedAt: serverTimestamp()
    })
  },

  async findAll(): Promise<Payment[]> {
    const querySnapshot = await getDocs(collection(db, 'payments'))
    return querySnapshot.docs.map(doc => convertFirestoreDoc<Payment>(doc)).filter(Boolean) as Payment[]
  },

  async findById(id: string): Promise<Payment | null> {
    const docRef = doc(db, 'payments', id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) return null
    
    return convertFirestoreDoc<Payment>(docSnap)
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, 'payments', id)
    await deleteDoc(docRef)
  }
}

// TWO FACTOR AUTHENTICATION
export const twoFactorService = {
  async create(twoFactorData: Omit<TwoFactorCode, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'twoFactorCodes'), {
      ...twoFactorData,
      createdAt: serverTimestamp()
    })
    return docRef.id
  },

  async findValidCode(userEmail: string, code: string): Promise<TwoFactorCode | null> {
    const q = query(
      collection(db, 'twoFactorCodes'),
      where('userEmail', '==', userEmail),
      where('code', '==', code),
      where('isUsed', '==', false)
    )
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) return null
    
    const doc = querySnapshot.docs[0]
    const twoFactorCode = convertFirestoreDoc<TwoFactorCode>(doc)
    
    // Verificar se não expirou
    if (!twoFactorCode || twoFactorCode.expiresAt < new Date()) {
      return null
    }

    return twoFactorCode
  },

  async markAsUsed(id: string): Promise<void> {
    const docRef = doc(db, 'twoFactorCodes', id)
    await updateDoc(docRef, {
      isUsed: true
    })
  },

  async deleteExpiredCodes(): Promise<void> {
    const q = query(
      collection(db, 'twoFactorCodes'),
      where('expiresAt', '<', new Date())
    )
    const querySnapshot = await getDocs(q)
    
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref))
    await Promise.all(deletePromises)
  }
}

// AFFILIATE CODES MANAGEMENT
export const affiliateCodeService = {
  async create(codeData: Omit<AffiliateCode, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'affiliateCodes'), {
      ...codeData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return docRef.id
  },

  async findById(id: string): Promise<AffiliateCode | null> {
    const docRef = doc(db, 'affiliateCodes', id)
    const docSnap = await getDoc(docRef)
    return convertFirestoreDoc<AffiliateCode>(docSnap)
  },

  async findByCode(code: string): Promise<AffiliateCode | null> {
    const q = query(
      collection(db, 'affiliateCodes'),
      where('code', '==', code.toUpperCase()),
      limit(1)
    )
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) return null
    
    const doc = querySnapshot.docs[0]
    return convertFirestoreDoc<AffiliateCode>(doc)
  },

  async findAll(): Promise<AffiliateCode[]> {
    const q = query(
      collection(db, 'affiliateCodes'),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertFirestoreDoc<AffiliateCode>(doc)).filter(Boolean) as AffiliateCode[]
  },

  async findActive(): Promise<AffiliateCode[]> {
    const q = query(
      collection(db, 'affiliateCodes'),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertFirestoreDoc<AffiliateCode>(doc)).filter(Boolean) as AffiliateCode[]
  },

  async update(id: string, updates: Partial<Omit<AffiliateCode, 'id' | 'createdAt'>>): Promise<void> {
    const docRef = doc(db, 'affiliateCodes', id)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    })
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, 'affiliateCodes', id)
    await deleteDoc(docRef)
  },

  async toggleActive(id: string): Promise<void> {
    const code = await this.findById(id)
    if (!code) throw new Error('Código não encontrado')
    
    await this.update(id, { isActive: !code.isActive })
  }
}

// AFFILIATE USAGE MANAGEMENT
export const affiliateUsageService = {
  async create(usageData: Omit<AffiliateUsage, 'id' | 'createdAt' | 'affiliateCode' | 'user' | 'payment'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'affiliateUsages'), {
      ...usageData,
      createdAt: serverTimestamp()
    })
    return docRef.id
  },

  async findById(id: string): Promise<AffiliateUsage | null> {
    const docRef = doc(db, 'affiliateUsages', id)
    const docSnap = await getDoc(docRef)
    return convertFirestoreDoc<AffiliateUsage>(docSnap)
  },

  async findByPaymentId(paymentId: string): Promise<AffiliateUsage | null> {
    const q = query(
      collection(db, 'affiliateUsages'),
      where('paymentId', '==', paymentId),
      limit(1)
    )
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) return null
    
    const doc = querySnapshot.docs[0]
    return convertFirestoreDoc<AffiliateUsage>(doc)
  },

  async findByAffiliateCodeId(affiliateCodeId: string): Promise<AffiliateUsage[]> {
    const q = query(
      collection(db, 'affiliateUsages'),
      where('affiliateCodeId', '==', affiliateCodeId),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertFirestoreDoc<AffiliateUsage>(doc)).filter(Boolean) as AffiliateUsage[]
  },

  async findAll(): Promise<AffiliateUsage[]> {
    const q = query(
      collection(db, 'affiliateUsages'),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertFirestoreDoc<AffiliateUsage>(doc)).filter(Boolean) as AffiliateUsage[]
  },

  async findByMonth(year: number, month: number): Promise<AffiliateUsage[]> {
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0, 23, 59, 59)
    
    const q = query(
      collection(db, 'affiliateUsages'),
      where('createdAt', '>=', startDate),
      where('createdAt', '<=', endDate),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => convertFirestoreDoc<AffiliateUsage>(doc)).filter(Boolean) as AffiliateUsage[]
  }
}

// AIRDROPS
export const airdropService = {
  async create(airdropData: Omit<Airdrop, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'airdrops'), {
      ...airdropData,
      createdAt: serverTimestamp()
    })
    return docRef.id
  },

  async findByProtocolId(protocolId: string): Promise<Airdrop[]> {
    const q = query(
      collection(db, 'airdrops'), 
      where('protocolId', '==', protocolId)
    )
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => convertFirestoreDoc<Airdrop>(doc)).filter(Boolean) as Airdrop[]
  },

  async findById(id: string): Promise<Airdrop | null> {
    const docRef = doc(db, 'airdrops', id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) return null
    
    return convertFirestoreDoc<Airdrop>(docSnap)
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, 'airdrops', id)
    await deleteDoc(docRef)
  },

  async deleteByProtocolId(protocolId: string): Promise<void> {
    const q = query(
      collection(db, 'airdrops'), 
      where('protocolId', '==', protocolId)
    )
    const querySnapshot = await getDocs(q)
    
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref))
    await Promise.all(deletePromises)
  },

  async findByProtocolIdAndUser(protocolId: string, userEmail: string): Promise<Airdrop[]> {
    const q = query(
      collection(db, 'airdrops'),
      where('protocolId', '==', protocolId),
      where('userEmail', '==', userEmail)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertFirestoreDoc<Airdrop>(doc)).filter(Boolean) as Airdrop[];
  },

  async findByUserEmail(userEmail: string): Promise<Airdrop[]> {
    const q = query(
      collection(db, 'airdrops'),
      where('userEmail', '==', userEmail)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertFirestoreDoc<Airdrop>(doc)).filter(Boolean) as Airdrop[];
  }
}

// CALENDAR EVENTS
export const calendarEventService = {
  async create(eventData: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'calendarEvents'), {
      ...eventData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return docRef.id
  },

  async findByUserEmail(userEmail: string): Promise<CalendarEvent[]> {
    const q = query(
      collection(db, 'calendarEvents'),
      where('userEmail', '==', userEmail)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertFirestoreDoc<CalendarEvent>(doc)).filter(Boolean) as CalendarEvent[];
  },

  async findByUserEmailAndDateRange(userEmail: string, startDate: Date, endDate: Date): Promise<CalendarEvent[]> {
    const allEvents = await this.findByUserEmail(userEmail);
    // Filtrar por data no cliente
    return allEvents
      .filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= startDate && eventDate <= endDate;
      });
  },

  async findById(id: string): Promise<CalendarEvent | null> {
    const docRef = doc(db, 'calendarEvents', id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) return null
    
    return convertFirestoreDoc<CalendarEvent>(docSnap)
  },

  async update(id: string, eventData: Partial<CalendarEvent>): Promise<void> {
    const docRef = doc(db, 'calendarEvents', id)
    await updateDoc(docRef, {
      ...eventData,
      updatedAt: serverTimestamp()
    })
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, 'calendarEvents', id)
    await deleteDoc(docRef)
  },

  async findUpcomingEvents(userEmail: string, days: number = 7): Promise<CalendarEvent[]> {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + days);
    
    const q = query(
      collection(db, 'calendarEvents'),
      where('userEmail', '==', userEmail),
      where('date', '>=', now),
      where('date', '<=', futureDate),
      orderBy('date', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertFirestoreDoc<CalendarEvent>(doc)).filter(Boolean) as CalendarEvent[];
  }
}

// PROTOCOL LINKS
export const protocolLinkService = {
  async create(linkData: Omit<ProtocolLink, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'protocolLinks'), {
      ...linkData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return docRef.id
  },

  async findByProtocolId(protocolId: string): Promise<ProtocolLink[]> {
    const q = query(
      collection(db, 'protocolLinks'), 
      where('protocolId', '==', protocolId)
    )
    const querySnapshot = await getDocs(q)
    
    const links = querySnapshot.docs.map(doc => convertFirestoreDoc<ProtocolLink>(doc)).filter(Boolean) as ProtocolLink[]
    
    // Ordenar por data de criação no cliente (mais recente primeiro)
    return links.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  },

  async findById(id: string): Promise<ProtocolLink | null> {
    const docRef = doc(db, 'protocolLinks', id)
    const docSnap = await getDoc(docRef)
    
    if (!docSnap.exists()) return null
    
    return convertFirestoreDoc<ProtocolLink>(docSnap)
  },

  async update(id: string, linkData: Partial<ProtocolLink>): Promise<void> {
    const docRef = doc(db, 'protocolLinks', id)
    await updateDoc(docRef, {
      ...linkData,
      updatedAt: serverTimestamp()
    })
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, 'protocolLinks', id)
    await deleteDoc(docRef)
  },

  async deleteByProtocolId(protocolId: string): Promise<void> {
    const q = query(
      collection(db, 'protocolLinks'), 
      where('protocolId', '==', protocolId)
    )
    const querySnapshot = await getDocs(q)
    
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref))
    await Promise.all(deletePromises)
  },

  async findByProtocolIdAndUser(protocolId: string, userEmail: string): Promise<ProtocolLink[]> {
    const q = query(
      collection(db, 'protocolLinks'),
      where('protocolId', '==', protocolId),
      where('userEmail', '==', userEmail)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertFirestoreDoc<ProtocolLink>(doc)).filter(Boolean) as ProtocolLink[];
  }
} 