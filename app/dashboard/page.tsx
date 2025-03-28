// 'use client'

// import React from 'react'
// import AdvancedDappLayout from '../../components/layouts/AdvancedDappLayout'
// import DashboardOverview from '../../components/DashboardOverView'

// export default function Dashboard() {
//   return (
//     <AdvancedDappLayout>
//       <DashboardOverview />
//     </AdvancedDappLayout>
//   )
// }

'use client'

import React from 'react'
import AdvancedDappLayout from '@/components/layouts/AdvancedDappLayout'
import { useAuth } from '@/components/AuthProvider'
import { useProposals } from '@/components/ProposalContext'
import { useRouter } from 'next/navigation'
import UserProfileCard from '@/components/UserProfileCard'
import ProposalsList from '@/components/ProposalList'
import RecentActivity from '@/components/RecentActivity'
import { FileText, DollarSign, Clock } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const { proposals } = useProposals()
  const router = useRouter()

  if (!user) {
    router.push('/')
    return null
  }

  // Funder Dashboard: See all projects in the system
  const FunderDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Funder Dashboard</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">All Research Proposals</h2>
        {proposals.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No proposals in the system yet.</p>
        ) : (
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors flex justify-between items-center"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-medium">{proposal.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{proposal.description}</p>
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      Goal: ${proposal.fundingGoal.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(proposal.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">
                    Status:{' '}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        proposal.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : proposal.status === 'funded'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {proposal.status}
                    </span>
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => router.push(`/proposals/${proposal.id}`)} // Placeholder for details page
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    View Details
                  </button>
                  {proposal.status === 'pending' && (
                    <button
                      onClick={() => alert(`Funding ${proposal.title}`)} // Placeholder for funding action
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Fund Project
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  // Researcher Dashboard: Reuse your ResearchDashboard layout
  const ResearcherDashboard = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Researcher Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <UserProfileCard />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <ProposalsList />
          <RecentActivity />
        </div>
      </div>
    </div>
  )

  // Admin Dashboard: Placeholder
  const AdminDashboard = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <p className="text-gray-600">Welcome, {user.name}. Admin features coming soon.</p>
    </div>
  )

  return (
    <AdvancedDappLayout>
      {user.role === 'funder' && <FunderDashboard />}
      {user.role === 'researcher' && <ResearcherDashboard />}
      {user.role === 'admin' && <AdminDashboard />}
    </AdvancedDappLayout>
  )
}
