'use client'

import React from 'react'
import { LoginCallBack, useOCAuth } from '@opencampus/ocid-connect-js'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'

export default function Redirect() {
  const router = useRouter()
  const { ocAuth, authState } = useOCAuth()
  const { login } = useAuth() // Use login from AuthProvider to set user

  // Success callback: Set user data and redirect
  const loginSuccess = async () => {
    try {
      console.log('Login successful, authState:', authState)
      // Assuming authState contains user info after successful login
      const userData = {
        id: authState?.user?.id || 'unknown', // Adjust based on actual OCID response
        name: authState?.user?.name || 'Researcher',
        email: authState?.user?.email || 'researcher@university.edu',
        profilePicture: authState?.user?.picture || undefined
      }
      // Update AuthProvider with user data
      localStorage.setItem('user', JSON.stringify(userData))
      await login('researcher') // This could be extended to sync with OCID data directly
      // This could be extended to sync with OCID data directly
      router.push('/dashboard') // Redirect to dashboard
    } catch (error) {
      console.error('Error processing login success:', error)
      router.push('/?error=login_failed')
    }
  }

  // Error callback: Log and redirect with error
  const loginError = (error: any) => {
    console.error('Login error:', error)
    router.push('/?error=auth_error') // Redirect to home with error param
  }

  // Custom error component
  function CustomErrorComponent() {
    return (
      <div className="text-white bg-red-600 p-4 rounded-lg">
        Error Logging in: {authState.error?.message || 'Unknown error'}
      </div>
    )
  }

  // Custom loading component
  function CustomLoadingComponent() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <LoginCallBack
      errorCallback={loginError}
      successCallback={loginSuccess}
      customErrorComponent={<CustomErrorComponent />}
      customLoadingComponent={<CustomLoadingComponent />}
    />
  )
}

