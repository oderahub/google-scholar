'use client'

import React from 'react'
import { useAuth } from './AuthProvider'
import { Activity, Award, CreditCard } from 'lucide-react'

export default function RecentActivity() {
  const { user } = useAuth()

  // Mock activity data (you'd typically fetch this from a backend)
  const activityItems = [
    {
      icon: <Award className="text-blue-500" />,
      title: 'Reputation Increase',
      description: 'Your recent proposal received positive reviews',
      date: '2 days ago'
    },
    {
      icon: <CreditCard className="text-green-500" />,
      title: 'Funding Received',
      description: 'Partial funding approved for your research',
      date: '1 week ago'
    }
  ]

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center">
        <Activity className="mr-2 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
      </div>
      <div className="p-6">
        {activityItems.length === 0 ? (
          <div className="text-center text-gray-500 py-4">No recent activity</div>
        ) : (
          <div className="space-y-4">
            {activityItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-full">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">{item.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
