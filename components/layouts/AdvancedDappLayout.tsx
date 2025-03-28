'use client'

import React, { useState, useEffect } from 'react'
import {
  LayoutGrid,
  BookOpen,
  DollarSign,
  User,
  Settings,
  Search,
  Bell,
  Wallet,
  Award,
  Target,
  LogOut
} from 'lucide-react'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdvancedDappLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [walletConnected, setWalletConnected] = useState(false)
  const router = useRouter()

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        setWalletConnected(true)
        console.log('Wallet connected:', accounts[0])
      } catch (error) {
        console.error('Wallet connection failed:', error)
      }
    } else {
      alert('Please install MetaMask!')
    }
  }

  const getNavItems = () => {
    const baseItems = user
      ? [{ icon: <LayoutGrid />, label: 'Dashboard', key: 'dashboard', href: '/dashboard' }]
      : [] // Empty array when no user (hides Dashboard)

    if (!user) return baseItems

    switch (user.role) {
      case 'researcher':
        return [
          ...baseItems,
          {
            icon: <BookOpen />,
            label: 'New Proposal',
            key: 'new-proposal',
            href: '/proposals/new'
          },
          { icon: <Target />, label: 'Project Tracking', key: 'tracking', href: '/tracking' },
          { icon: <User />, label: 'Profile', key: 'profile', href: '/profile' }
        ]
      case 'funder':
        return [
          ...baseItems,
          { icon: <BookOpen />, label: 'Browse Proposals', key: 'proposals', href: '/proposals' },
          { icon: <DollarSign />, label: 'Funding', key: 'funding', href: '/funding' },
          { icon: <User />, label: 'Profile', key: 'profile', href: '/profile' }
        ]
      case 'admin':
        return [
          ...baseItems,
          { icon: <Settings />, label: 'Admin Settings', key: 'settings', href: '/admin/settings' },
          { icon: <BookOpen />, label: 'All Proposals', key: 'proposals', href: '/admin/proposals' }
        ]
      default:
        return baseItems
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f4f7fa] to-[#e6eaf3]">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-xl border-r border-gray-100 p-6 flex flex-col justify-between">
        <div>
          <div className="mb-10">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-full">
                <Award className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">ResearchChain</h1>
            </div>
            <p className="text-xs text-gray-500 mt-2">Decentralized Research Funding</p>
          </div>

          <nav className="space-y-2">
            {getNavItems().map((item) => (
              <Link key={item.key} href={item.href}>
                <button
                  onClick={() => setActiveMenu(item.key)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300
                    ${
                      activeMenu === item.key
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    }
                  `}
                >
                  {React.cloneElement(item.icon, {
                    className:
                      'w-5 h-5 ' + (activeMenu === item.key ? 'text-blue-600' : 'text-gray-400')
                  })}
                  <span>{item.label}</span>
                </button>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10">
          <div className="bg-blue-600 text-white rounded-xl p-5 relative overflow-hidden">
            <h3 className="font-bold text-lg mb-2">
              {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
            </h3>
            <p className="text-xs mb-4 opacity-80">
              {walletConnected
                ? 'Your wallet is linked for funding and verification'
                : 'Connect your wallet to participate'}
            </p>
            {!walletConnected && (
              <button
                onClick={connectWallet}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                <Wallet className="w-4 h-4 inline mr-2" />
                Connect
              </button>
            )}
          </div>
          {user && (
            <button
              onClick={() => {
                logout()
                setWalletConnected(false)
                router.push('/')
              }}
              className="mt-4 w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <LogOut className="w-5 h-5 text-gray-400" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm px-10 py-4 flex justify-between items-center">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search proposals, researchers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center space-x-6">
            <button className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </button>
            {user && (
              <div className="flex items-center space-x-2">
                <img
                  src={user.profilePicture || '/default-avatar.png'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">Reputation: {user.reputationScore || 0}</p>
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="p-8 space-y-8">{children}</main>
      </div>
    </div>
  )
}
