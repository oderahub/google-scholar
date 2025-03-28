'use client'

import React from 'react'
import { useProposals } from './ProposalContext'
import { useAuth } from './AuthProvider'
import { FileText, CheckCircle, Clock } from 'lucide-react'

export default function ProposalsList() {
  const { user } = useAuth()
  const { proposals } = useProposals()

  // Filter proposals for the current user
  const userProposals = proposals?.filter((proposal) => proposal.researcherId === user?.id) || []

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
            Pending
          </span>
        )
      case 'approved':
        return (
          <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
            Approved
          </span>
        )
      case 'rejected':
        return (
          <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
            Rejected
          </span>
        )
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium text-gray-800 bg-gray-100 rounded-full">
            Unknown
          </span>
        )
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center">
        <FileText className="mr-2 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Your Research Proposals</h2>
      </div>
      <div className="p-6">
        {userProposals.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            No proposals found. Start a new research project!
          </div>
        ) : (
          <div className="space-y-4">
            {userProposals.map((proposal) => (
              <div
                key={proposal.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{proposal.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{proposal.description}</p>
                  </div>
                  <div>{getStatusBadge(proposal.status)}</div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Funding Goal: ${proposal.fundingGoal.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    Submitted: {new Date(proposal.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
