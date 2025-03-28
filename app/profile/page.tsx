'use client'

import React, { useState } from 'react'
import AdvancedDappLayout from '@/components/layouts/AdvancedDappLayout'
import { useAuth } from '@/components/AuthProvider'
import { useProposals } from '@/components/ProposalContext'
import { Trophy, DollarSign, FileText, Edit, Save, X } from 'lucide-react'

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const { proposals } = useProposals()
  const [isEditing, setIsEditing] = useState(false)
  const [bio, setBio] = useState(
    user?.profile && 'bio' in user.profile ? user.profile.bio || '' : ''
  )
  const [portfolioFiles, setPortfolioFiles] = useState<File[]>([])
  const [existingPortfolio, setExistingPortfolio] = useState(
    user?.profile && 'portfolio' in user.profile ? user.profile.portfolio || [] : []
  )

  if (!user) {
    return (
      <AdvancedDappLayout>
        <div className="p-8 text-center">
          <h2 className="text-xl font-bold">Please Log In</h2>
          <p className="text-gray-600">You need to log in to view your profile.</p>
        </div>
      </AdvancedDappLayout>
    )
  }

  const userProposals = proposals.filter((p) => p.researcherId === user.id)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPortfolioFiles([...portfolioFiles, ...Array.from(e.target.files)])
    }
  }

  const handleSave = () => {
    // Simulate IPFS upload by generating a mock hash
    const newPortfolioItems = portfolioFiles.map((file) => ({
      name: file.name,
      hash: `ipfs://${Math.random().toString(36).substring(2, 15)}`, // Mock IPFS CID
      uploadedAt: new Date().toISOString()
    }))

    const updatedProfile = {
      ...user.profile,
      bio,
      portfolio: [...existingPortfolio, ...newPortfolioItems]
    } as ResearcherProfile | FunderProfile

    updateProfile(updatedProfile)
    setPortfolioFiles([])
    setIsEditing(false)
  }

  const handleRemoveFile = (index: number) => {
    setPortfolioFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleRemoveExisting = (hash: string) => {
    setExistingPortfolio((prev) => prev.filter((item) => item.hash !== hash))
  }

  return (
    <AdvancedDappLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={user.profilePicture || '/default-avatar.png'}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs mt-2">
                {user.role}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
              <Trophy className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-sm text-gray-600">Reputation</span>
              <p className="font-bold text-xl">{user.reputationScore || 0}</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 mb-2" />
              <span className="text-sm text-gray-600">Funds Received</span>
              <p className="font-bold text-xl">${(user.fundsReceived || 0).toLocaleString()}</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600 mb-2" />
              <span className="text-sm text-gray-600">Active Proposals</span>
              <p className="font-bold text-xl">
                {userProposals.filter((p) => p.status !== 'completed').length}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Bio</h3>
              {isEditing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-600">
                  {user.profile && 'bio' in user.profile
                    ? user.profile.bio || 'No bio available'
                    : 'No bio available'}
                </p>
              )}
            </div>

            {user.role === 'researcher' && (
              <div>
                <h3 className="text-lg font-medium">Research Portfolio</h3>
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {portfolioFiles.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Files to Upload:</h4>
                        {portfolioFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between text-sm text-gray-600"
                          >
                            <span>{file.name}</span>
                            <button
                              onClick={() => handleRemoveFile(index)}
                              className="text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {existingPortfolio.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Existing Portfolio:</h4>
                        {existingPortfolio.map((item) => (
                          <div
                            key={item.hash}
                            className="flex items-center justify-between text-sm text-gray-600"
                          >
                            <span>
                              {item.name} (IPFS: {item.hash})
                            </span>
                            <button
                              onClick={() => handleRemoveExisting(item.hash)}
                              className="text-red-500"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {existingPortfolio.length === 0 ? (
                      <p className="text-gray-500">No portfolio items uploaded.</p>
                    ) : (
                      existingPortfolio.map((item) => (
                        <div key={item.hash} className="text-gray-600">
                          <p>{item.name}</p>
                          <p className="text-sm text-gray-500">
                            IPFS: {item.hash} | Uploaded:{' '}
                            {new Date(item.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {user.role === 'researcher' &&
              user.profile &&
              'academicCredentials' in user.profile && (
                <div>
                  <h3 className="text-lg font-medium">Academic Credentials</h3>
                  <p className="text-gray-600">{user.profile.academicCredentials}</p>
                  <p className="text-sm text-gray-500">Verified via blockchain (OCID: {user.id})</p>
                </div>
              )}
          </div>

          {isEditing && (
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setBio(user.profile && 'bio' in user.profile ? user.profile.bio || '' : '')
                  setPortfolioFiles([])
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        {user.role === 'researcher' && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Research Proposals</h3>
            {userProposals.length === 0 ? (
              <p className="text-gray-500">No proposals yet.</p>
            ) : (
              <div className="space-y-4">
                {userProposals.map((proposal) => (
                  <div key={proposal.id} className="border-b pb-2 last:border-b-0">
                    <h4 className="font-medium">{proposal.title}</h4>
                    <p className="text-sm text-gray-600">{proposal.description}</p>
                    <p className="text-sm text-gray-500">Status: {proposal.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </AdvancedDappLayout>
  )
}
