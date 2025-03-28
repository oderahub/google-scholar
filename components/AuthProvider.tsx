'use client'

import React, { useState, useEffect, createContext } from 'react'
import { useRouter } from 'next/navigation'

interface PortfolioItem {
  name: string
  hash: string
  uploadedAt: string
}

interface ResearcherProfile {
  academicCredentials: string
  researchHistory: string
  publicationLinks: string[]
  researchInterests: string[]
  currentProject?: { title?: string; description?: string; fundingGoal?: number }
  bio?: string
  portfolio?: PortfolioItem[]
}

interface FunderProfile {
  organizationName: string
  fundingInterests: string[]
}

interface UserData {
  activeProposals: number
  bio: string
  id: string
  name: string
  email: string
  profilePicture?: string
  role: 'researcher' | 'funder' | 'admin'
  isProfileComplete: boolean
  profile?: ResearcherProfile | FunderProfile
  reputationScore?: number
  fundsReceived?: number
}

interface AuthContextType {
  user: UserData | null
  login: (role: 'researcher' | 'funder' | 'admin') => void
  logout: () => void
  updateProfile: (profile: ResearcherProfile | FunderProfile) => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {}, // Default empty function (shouldn't be called without role)
  logout: () => {},
  updateProfile: () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const router = useRouter()

  const login = (role: 'researcher' | 'funder' | 'admin') => {
    const dummyUser: UserData = {
      id: 'user123',
      name: role === 'researcher' ? 'Dr. Jane Doe' : role === 'funder' ? 'Fund Corp' : 'Admin John',
      email: role === 'researcher' ? 'jane.doe@university.edu' : 'fund@corp.com',
      profilePicture: 'https://via.placeholder.com/150',
      role,
      isProfileComplete: false,
      reputationScore: role === 'researcher' ? 85 : 0,
      fundsReceived: role === 'researcher' ? 10000 : 0,
      activeProposals: 0,
      bio: ''
    }
    setUser(dummyUser)
    localStorage.setItem('user', JSON.stringify(dummyUser))
    router.push(`/onboarding/${role}`)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updateProfile = (profile: ResearcherProfile | FunderProfile) => {
    if (!user) return
    const updatedUser = { ...user, profile, isProfileComplete: true }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
    router.push('/dashboard')
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
