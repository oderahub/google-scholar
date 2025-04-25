'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdvancedDappLayout from '../components/layouts/AdvancedDappLayout'
import { LucideIcon, Award, Globe, Lock, Rocket } from 'lucide-react'
import { useAuth } from '@/components/AuthProvider'
import DashboardOverview from '@/components/DashboardOverView'
import UserProfile from '@/components/UserProfile'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  // Ensure component only renders on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Explicit navigation effect
  useEffect(() => {
    console.log('Home: User state changed:', user)
    if (user && isClient) {
      console.log('Home: Navigating to dashboard')
      router.push('/dashboard')
    }
  }, [user, isClient, router])

  // Prevent server-side rendering issues
  if (!isClient) {
    return null
  }

  // If user exists, show loading or redirect
  if (user) {
    return (
      <AdvancedDappLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdvancedDappLayout>
    )
  }

  // Reusable card component for features
  const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
      <div className="flex items-center mb-4">
        <Icon className="w-10 h-10 text-blue-600 mr-4" />
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  )

  return (
    <AdvancedDappLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8 lg:p-16">
              {/* Left Side: Welcome Section */}
              <div className="flex flex-col justify-center space-y-6">
                <div className="flex items-center">
                  <Award className="w-12 h-12 text-blue-600 mr-4" />
                  <h2 className="text-4xl font-bold text-gray-900">ResearchChain</h2>
                </div>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Empowering researchers to turn innovative ideas into reality through decentralized
                  funding and collaboration.
                </p>
                <div className="mt-6">
                  <UserProfile />
                </div>
              </div>

              {/* Right Side: Features */}
              <div className="grid grid-cols-1 gap-6">
                <FeatureCard
                  icon={Globe}
                  title="Global Reach"
                  description="Connect with researchers and funders worldwide, breaking geographical barriers."
                />
                <FeatureCard
                  icon={Rocket}
                  title="Accelerate Research"
                  description="Fast-track your research projects with transparent and efficient funding mechanisms."
                />
                <FeatureCard
                  icon={Lock}
                  title="Secure Funding"
                  description="Blockchain-powered platform ensuring trust, transparency, and secure transactions."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdvancedDappLayout>
  )
}
