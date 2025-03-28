'use client'

import React, { useState, useMemo } from 'react'
import AdvancedDappLayout from '../../../components/layouts/AdvancedDappLayout'
import { useAuth } from '../../../components/AuthProvider'
import { useProposals } from '../../../components/ProposalContext'

export default function NewProposal() {
  const { user } = useAuth()
  const { addProposal } = useProposals()

  // Memoized initial form values
  const initialForm = useMemo(
    () => ({
      title: user?.profile?.currentProject?.title || '',
      description: user?.profile?.currentProject?.description || '',
      fundingGoal: user?.profile?.currentProject?.fundingGoal?.toString() || '',
      methodology: '',
      outcomes: '',
      budgetBreakdown: '',
      timeline: ''
    }),
    [user]
  )

  const [form, setForm] = useState(initialForm)

  // Prevent unauthorized access
  if (!user) {
    return (
      <AdvancedDappLayout>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-red-700">Please Log In</h2>
          <p className="text-gray-800">You need to log in to create a proposal.</p>
        </div>
      </AdvancedDappLayout>
    )
  }

  if (user.role !== 'researcher') {
    return (
      <AdvancedDappLayout>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-red-700">Access Denied</h2>
          <p className="text-gray-800">Only researchers can create proposals.</p>
        </div>
      </AdvancedDappLayout>
    )
  }

  if (!user.isProfileComplete) {
    return (
      <AdvancedDappLayout>
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-yellow-700">Complete Your Profile</h2>
          <p className="text-gray-800">Please complete your researcher profile first.</p>
        </div>
      </AdvancedDappLayout>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const proposal = {
      researcherId: user.id,
      title: form.title.trim(),
      description: form.description.trim(),
      fundingGoal: parseFloat(form.fundingGoal) || 0,
      methodology: form.methodology.trim(),
      outcomes: form.outcomes.trim(),
      budgetBreakdown: form.budgetBreakdown.trim(),
      timeline: form.timeline.trim() // Changed to trim instead of parseInt
    }

    addProposal(proposal)

    // Reset form
    setForm(initialForm)
  }

  return (
    <AdvancedDappLayout>
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Create Research Proposal</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              name: 'title',
              label: 'Project Title',
              type: 'text',
              placeholder: 'Enter your project title'
            },
            {
              name: 'description',
              label: 'Detailed Description',
              type: 'textarea',
              placeholder: 'Provide a comprehensive description of your research project'
            },
            {
              name: 'fundingGoal',
              label: 'Funding Amount Required ($)',
              type: 'number',
              placeholder: 'Enter the total funding needed'
            },
            {
              name: 'methodology',
              label: 'Research Methodology',
              type: 'textarea',
              placeholder: 'Describe your research approach and methods'
            },
            {
              name: 'outcomes',
              label: 'Expected Outcomes',
              type: 'textarea',
              placeholder: 'Outline the anticipated results and impact of your research'
            },
            {
              name: 'budgetBreakdown',
              label: 'Budget Breakdown',
              type: 'textarea',
              placeholder:
                'Provide a detailed breakdown of expenses (e.g., $5000 for equipment, $3000 for personnel)'
            },
            {
              name: 'timeline',
              label: 'Timeline (months)',
              type: 'number',
              placeholder: 'Estimated duration of the research project'
            }
          ].map(({ name, label, type, placeholder }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-lg font-semibold text-gray-800 mb-2">
                {label}
              </label>
              {type === 'textarea' ? (
                <textarea
                  id={name}
                  value={form[name as keyof typeof form]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [name]: e.target.value }))}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={placeholder}
                  required
                />
              ) : (
                <input
                  id={name}
                  type={type}
                  value={form[name as keyof typeof form]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [name]: e.target.value }))}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={placeholder}
                  required
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-700 text-white p-3 rounded-lg text-lg font-bold hover:bg-blue-800 transition-colors duration-300 ease-in-out"
          >
            Submit Proposal
          </button>
        </form>
      </div>
    </AdvancedDappLayout>
  )
}
