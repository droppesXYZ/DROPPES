import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Protocol, Task } from './types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isInitialized: boolean
  login: (user: User) => void
  logout: () => void
  setInitialized: (initialized: boolean) => void
  updateUser: (updates: Partial<User>) => void
}

interface ProtocolState {
  protocols: Protocol[]
  setProtocols: (protocols: Protocol[]) => void
  addProtocol: (protocol: Protocol) => void
  updateProtocol: (id: string, updates: Partial<Protocol>) => void
  removeProtocol: (id: string) => void
}

interface TaskState {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  removeTask: (id: string) => void
  toggleTaskComplete: (id: string) => void
}

interface UIState {
  isLoading: boolean
  error: string | null
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

// Auth Store
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isInitialized: false,
      login: (user) => set({ user, isAuthenticated: true, isInitialized: true }),
      logout: () => {
        set({ user: null, isAuthenticated: false, isInitialized: true })
        // Limpar também o localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage')
        }
      },
      setInitialized: (initialized) => set({ isInitialized: initialized }),
      updateUser: (updates) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } })
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

// Protocol Store
export const useProtocolStore = create<ProtocolState>((set) => ({
  protocols: [],
  setProtocols: (protocols) => set({ protocols }),
  addProtocol: (protocol) => set((state) => ({ protocols: [...state.protocols, protocol] })),
  updateProtocol: (id, updates) =>
    set((state) => ({
      protocols: state.protocols.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  removeProtocol: (id) =>
    set((state) => ({
      protocols: state.protocols.filter((p) => p.id !== id),
    })),
}))

// Task Store
export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
  toggleTaskComplete: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted, completedAt: !t.isCompleted ? new Date() : null } : t
      ),
    })),
}))

// UI Store
export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  error: null,
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
})) 