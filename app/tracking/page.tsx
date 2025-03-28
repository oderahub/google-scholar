'use client'

import React from 'react'
import AdvancedDappLayout from '@/components/layouts/AdvancedDappLayout'
import { useAuth } from '@/components/AuthProvider'
import { useProposals } from '@/components/ProposalContext'
import { CheckCircle, Clock } from 'lucide-react'

export default function TrackingPage() {
  const { user } = useAuth()
  const { proposals, updateMilestone } = useProposals()

  if (!user) {
    return (
      <AdvancedDappLayout>
        <div className="p-8 text-center">
          <h2 className="text-xl font-bold">Please Log In</h2>
          <p className="text-gray-600">You need to log in to track projects.</p>
        </div>
      </AdvancedDappLayout>
    )
  }

  const relevantProposals =
    user.role === 'researcher'
      ? proposals.filter((p) => p.researcherId === user.id)
      : proposals.filter((p) => p.status === 'funded' || p.status === 'completed')

  return (
    <AdvancedDappLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Project Tracking</h1>
        {relevantProposals.length === 0 ? (
          <div className="text-center text-gray-500 py-4">No projects to track yet.</div>
        ) : (
          relevantProposals.map((proposal) => (
            <div key={proposal.id} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{proposal.title}</h2>
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
              </div>
              <p className="text-gray-600 mb-4">{proposal.description}</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Funding Goal: ${proposal.fundingGoal.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Funds Utilized: ${proposal.fundsUtilized?.toLocaleString() || 0}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">Milestones</h3>
                {proposal.milestones?.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex items-center justify-between py-2 border-b last:border-b-0"
                  >
                    <div className="flex items-center space-x-2">
                      {milestone.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                      <span>{milestone.description}</span>
                    </div>
                    {user.role === 'researcher' && (
                      <button
                        onClick={() =>
                          updateMilestone(proposal.id, milestone.id, !milestone.completed)
                        }
                        className={`px-3 py-1 rounded-lg text-sm ${
                          milestone.completed
                            ? 'bg-gray-200 text-gray-600'
                            : 'bg-blue-600 text-white'
                        }`}
                      >
                        {milestone.completed ? 'Undo' : 'Mark Complete'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </AdvancedDappLayout>
  )
}
