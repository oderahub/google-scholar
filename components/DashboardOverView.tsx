'use client'

import React from 'react'
import UserProfileCard from './UserProfileCard'
import ProposalsList from './ProposalList'
import RecentActivity from './RecentActivity'

export default function ResearchDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Section */}
        <div className="lg:col-span-1">
          <UserProfileCard />
        </div>

        {/* Proposals and Activity Section */}
        <div className="lg:col-span-2 space-y-6">
          <ProposalsList />
          <RecentActivity />
        </div>
      </div>
    </div>
  )
}
