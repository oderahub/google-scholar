'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: string | null
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  balance: null,
  connect: async () => {},
  disconnect: () => {}
})

export const useWallet = () => useContext(WalletContext)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)

  // Check if wallet was previously connected
  useEffect(() => {
    const savedWalletState = localStorage.getItem('walletConnected')
    const savedAddress = localStorage.getItem('walletAddress')

    if (savedWalletState === 'true' && savedAddress) {
      setIsConnected(true)
      setAddress(savedAddress)
      // In a real app, we would fetch the current balance here
      setBalance('1,000 ETH')
    }
  }, [])

  const connect = async () => {
    try {
      // In a real app, this would connect to MetaMask or other wallet providers
      // For demo purposes, we'll simulate a successful connection
      const mockAddress = '0x' + Math.random().toString(16).slice(2, 42)

      setIsConnected(true)
      setAddress(mockAddress)
      setBalance('1,000 ETH')

      // Save connection state
      localStorage.setItem('walletConnected', 'true')
      localStorage.setItem('walletAddress', mockAddress)

      return Promise.resolve()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      return Promise.reject(error)
    }
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
    setBalance(null)

    // Clear saved connection state
    localStorage.removeItem('walletConnected')
    localStorage.removeItem('walletAddress')
  }

  return (
    <WalletContext.Provider value={{ isConnected, address, balance, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}
