import { NextResponse } from 'next/server';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { convertFirestoreDoc } from '@/lib/firestore';
import { Protocol } from '@/lib/types';

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, 'protocols'));
    const protocols = querySnapshot.docs.map(doc => convertFirestoreDoc<Protocol>(doc));
    return NextResponse.json({ protocols });
  } catch (error) {
    console.error('Erro ao listar todos os protocolos:', error);
    return NextResponse.json({ error: 'Erro ao listar protocolos' }, { status: 500 });
  }
} 