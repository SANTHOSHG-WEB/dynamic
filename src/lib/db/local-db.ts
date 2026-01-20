
import { QRCode } from '@/lib/types'

const STORAGE_KEY = 'dynqr_codes'

export const LocalDB = {
    getCodes: (): QRCode[] => {
        if (typeof window === 'undefined') return []
        const codes = localStorage.getItem(STORAGE_KEY)
        return codes ? JSON.parse(codes) : []
    },

    getCode: (id: string): QRCode | null => {
        const codes = LocalDB.getCodes()
        return codes.find(c => c.id === id) || null
    },

    createCode: (code: Omit<QRCode, 'id' | 'created_at' | 'updated_at' | 'scan_count' | 'user_id'>) => {
        const codes = LocalDB.getCodes()
        const newCode: QRCode = {
            ...code,
            id: crypto.randomUUID(),
            user_id: 'guest-user-123',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            scan_count: 0,
            is_active: true
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify([newCode, ...codes]))
        return newCode
    },

    updateCode: (id: string, updates: Partial<QRCode>) => {
        const codes = LocalDB.getCodes()
        const index = codes.findIndex(c => c.id === id)
        if (index === -1) throw new Error('Code not found')

        const updatedCode = { ...codes[index], ...updates, updated_at: new Date().toISOString() }
        codes[index] = updatedCode
        localStorage.setItem(STORAGE_KEY, JSON.stringify(codes))
        return updatedCode
    },

    deleteCode: (id: string) => {
        const codes = LocalDB.getCodes()
        const newCodes = codes.filter(c => c.id !== id)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newCodes))
    }
}
