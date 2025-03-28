'use client'

import React, { createContext, useState, useEffect, useContext } from 'react'

interface Milestone {
  id: string
  description: string
  completed: boolean
  fundsReleased: number
}

interface Proposal {
  id: string
  researcherId: string
  title: string
  description: string
  fundingGoal: number
  methodology: string
  outcomes: string
  //   budgetBreakdown: string
  timeline: string
  status: 'pending' | 'funded' | 'completed'
  createdAt: string
  milestones?: Milestone[] // Added
  fundsUtilized?: number // Added
}

interface ProposalContextType {
  proposals: Proposal[]
  addProposal: (
    proposal: Omit<Proposal, 'id' | 'status' | 'createdAt' | 'milestones' | 'fundsUtilized'> & {
      researcherId: string
    }
  ) => void
  updateMilestone: (proposalId: string, milestoneId: string, completed: boolean) => void
}

export const ProposalContext = createContext<ProposalContextType>({
  proposals: [],
  addProposal: () => {},
  updateMilestone: () => {}
})

export function ProposalProvider({ children }: { children: React.ReactNode }) {
  const [proposals, setProposals] = useState<Proposal[]>([])

  const addProposal = (
    proposal: Omit<Proposal, 'id' | 'status' | 'createdAt' | 'milestones' | 'fundsUtilized'> & {
      researcherId: string
    }
  ) => {
    const newProposal: Proposal = {
      ...proposal,
      id: '0x' + Math.random().toString(16).slice(2),
      status: 'pending',
      createdAt: new Date().toISOString(),
      milestones: [
        { id: 'm1', description: 'Initial Research', completed: false, fundsReleased: 0 },
        { id: 'm2', description: 'Midterm Report', completed: false, fundsReleased: 0 },
        { id: 'm3', description: 'Final Submission', completed: false, fundsReleased: 0 }
      ],
      fundsUtilized: 0
    }
    setProposals((prev) => [...prev, newProposal])
    localStorage.setItem('proposals', JSON.stringify([...proposals, newProposal]))
  }

  const updateMilestone = (proposalId: string, milestoneId: string, completed: boolean) => {
    setProposals((prev) =>
      prev.map((proposal) => {
        if (proposal.id === proposalId && proposal.milestones) {
          const updatedMilestones = proposal.milestones.map((m) =>
            m.id === milestoneId
              ? { ...m, completed, fundsReleased: completed ? proposal.fundingGoal / 3 : 0 }
              : m
          )
          const fundsUtilized = updatedMilestones.reduce((sum, m) => sum + m.fundsReleased, 0)
          return { ...proposal, milestones: updatedMilestones, fundsUtilized }
        }
        return proposal
      })
    )
    localStorage.setItem('proposals', JSON.stringify(proposals))
  }

  useEffect(() => {
    const storedProposals = localStorage.getItem('proposals')
    if (storedProposals) setProposals(JSON.parse(storedProposals))
  }, [])

  return (
    <ProposalContext.Provider value={{ proposals, addProposal, updateMilestone }}>
      {children}
    </ProposalContext.Provider>
  )
}

export function useProposals() {
  const context = useContext(ProposalContext)
  if (!context) throw new Error('useProposals must be used within a ProposalProvider')
  return context
}
