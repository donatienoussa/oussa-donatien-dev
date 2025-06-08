'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { account } from '@/lib/appwrite'
import { Models } from 'appwrite'

// {} for user's preferences
type User = Models.User<{}> | null

interface UserContextType {
    user: User
    loading: boolean
    refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true,
    refreshUser: async () => { },
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>(null)
    const [loading, setLoading] = useState(true)

    const refreshUser = async () => {
        try {
            const currentUser = await account.get()
            setUser(currentUser)
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        refreshUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, loading, refreshUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
