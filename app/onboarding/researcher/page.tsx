'use client'

import React, { useState } from 'react'
import AdvancedDappLayout from '../../../components/layouts/AdvancedDappLayout'
import { useAuth } from '../../../components/AuthProvider'
import { useProposals } from '../../../components/ProposalContext'

export default function NewProposal() {
  const { user } = useAuth()
  const { addProposal } = useProposals()
  const [form, setForm] = useState({
    title:
      user?.profile && 'currentProject' in user.profile
        ? user.profile.currentProject?.title || ''
        : '',
    description:
      user?.profile && 'currentProject' in user.profile
        ? user.profile.currentProject?.description || ''
        : '',
    fundingGoal: user?.profile && 'currentProject' in user.profile ? '' : '',
    methodology: '',
    outcomes: '',
    timeline: ''
  })

  if (!user || user.role !== 'researcher' || !user.isProfileComplete) {
    return (
      <AdvancedDappLayout>
        <div className="p-8 text-center">
          <h2 className="text-xl font-bold">Access Denied</h2>
          <p className="text-gray-600">Complete your researcher profile to create proposals.</p>
        </div>
      </AdvancedDappLayout>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const proposal = {
      researcherId: user.id,
      title: form.title,
      description: form.description,
      fundingGoal: parseFloat(form.fundingGoal) || 0,
      methodology: form.methodology,
      outcomes: form.outcomes,
      timeline: form.timeline
    }
    addProposal(proposal)
    setForm({
      title: '',
      description: '',
      fundingGoal: '',
      methodology: '',
      outcomes: '',
      timeline: ''
    }) // Reset form
  }

  return (
    <AdvancedDappLayout>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Create Research Proposal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Funding Goal ($)</label>
            <input
              type="number"
              value={form.fundingGoal}
              onChange={(e) => setForm({ ...form, fundingGoal: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Methodology</label>
            <textarea
              value={form.methodology}
              onChange={(e) => setForm({ ...form, methodology: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Expected Outcomes</label>
            <textarea
              value={form.outcomes}
              onChange={(e) => setForm({ ...form, outcomes: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Timeline (months)</label>
            <input
              type="number"
              value={form.timeline}
              onChange={(e) => setForm({ ...form, timeline: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Submit Proposal
          </button>
        </form>
      </div>
    </AdvancedDappLayout>
  )
}
