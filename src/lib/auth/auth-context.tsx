'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

interface AuthContextType {
    user: User | null
    loading: boolean
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signOut: async () => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // HARDCODED GUEST USER for "Full Access Free" mode
    const guestUser: any = {
        id: 'guest-user-123',
        email: 'guest@dynqr.com',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString()
    }

    const [user, setUser] = useState<User | null>(guestUser)
    const [loading, setLoading] = useState(false)

    // No actual Supabase Auth effects needed for this mode
    // We just stay logged in as "Guest"

    const signOut = async () => {
        // No-op or reset to guest
        console.log("Sign out disabled in free mode")
    }

    return (
        <AuthContext.Provider value={{ user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
