'use client'

import React from 'react'
import { useAuth } from './AuthProvider'
import { Trophy, DollarSign, FileText } from 'lucide-react'

export default function UserProfileCard() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-md mx-auto">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-600">Your Profile</h2>
        <img
          src={user.profilePicture || '/default-avatar.png'}
          alt={`${user.name}'s profile`}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {user.role}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
              <Trophy className="w-5 h-5 text-blue-600 mb-1" />
              <span className="text-xs text-gray-600">Reputation</span>
              <p className="font-bold text-lg">{user.reputationScore || 0}</p>
            </div>

            <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600 mb-1" />
              <span className="text-xs text-gray-600">Funds</span>
              <p className="font-bold text-lg">${(user.fundsReceived || 0).toLocaleString()}</p>
            </div>

            <div className="flex flex-col items-center p-3 bg-purple-50 rounded-lg">
              <FileText className="w-5 h-5 text-purple-600 mb-1" />
              <span className="text-xs text-gray-600">Proposals</span>
              <p className="font-bold text-lg">{user.activeProposals || 0}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600">{user.bio || 'No bio available'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
