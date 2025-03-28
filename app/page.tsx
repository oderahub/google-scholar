'use client'
import { useOCAuth } from '@opencampus/ocid-connect-js'
import LoginButton from '@/components/LoginButton'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LogOut, User, Shield, Key } from 'lucide-react'
import BackgroundEffect from '@/components/BackgroundEffect'

export default function Home() {
  const { authState, ocAuth } = useOCAuth()

  const handleLogout = () => {
    ocAuth.signOut()
  }

  // Error state
  if (authState?.error || authState === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md border-red-500/20 bg-red-500/5">
          <CardHeader>
            <CardTitle className="text-red-500">Authentication Error</CardTitle>
            <CardDescription>There was a problem with the authentication service.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {authState?.error?.message || 'An unknown error occurred. Please try again later.'}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Loading state
  if (authState && authState.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-t-2 border-indigo-500 animate-spin animation-delay-150"></div>
          <div className="absolute inset-4 rounded-full border-t-2 border-purple-500 animate-spin animation-delay-300"></div>
        </div>
        <p className="mt-6 text-muted-foreground">Loading authentication state...</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <BackgroundEffect />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          {authState?.isAuthenticated ? (
            <AuthenticatedView authState={authState} ocAuth={ocAuth} onLogout={handleLogout} />
          ) : (
            <UnauthenticatedView />
          )}
        </div>
      </div>
    </div>
  )
}

function UnauthenticatedView() {
  return (
    <Card className="w-full max-w-md border-blue-500/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/40 backdrop-blur-sm">
      <CardHeader className="text-center">
        <Badge className="mx-auto mb-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
          OpenCampus ID
        </Badge>
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          Welcome to Research Scholar
        </CardTitle>
        <CardDescription>Connect with your OpenCampus ID to access the platform</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mb-6">
          <User className="h-10 w-10 text-blue-400" />
        </div>
        <p className="text-center text-muted-foreground mb-6">
          Securely authenticate using your academic credentials to access research funding
          opportunities.
        </p>
        <LoginButton />
      </CardContent>
      <CardFooter className="flex justify-center border-t border-blue-500/10 pt-4">
        <p className="text-xs text-muted-foreground">
          By connecting, you agree to our Terms of Service and Privacy Policy
        </p>
      </CardFooter>
    </Card>
  )
}

function AuthenticatedView({ authState, ocAuth, onLogout }: any) {
  const userData = ocAuth.getAuthState()

  return (
    <Card className="w-full max-w-2xl border-blue-500/20 bg-gradient-to-br from-blue-950/40 to-indigo-950/40 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge className="bg-green-500/10 text-green-400 hover:bg-green-500/20">
            Authenticated
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </Button>
        </div>
        <CardTitle className="text-2xl font-bold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          Welcome, {userData?.user?.name || 'Researcher'}
        </CardTitle>
        <CardDescription>You're successfully connected with OpenCampus ID</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-sm">User Information</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Email: {userData?.user?.email || 'Not available'}
              </p>
              <p className="text-sm text-muted-foreground">
                ID:{' '}
                {userData?.user?.sub ? userData.user.sub.substring(0, 15) + '...' : 'Not available'}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Authentication Status</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Session expires:{' '}
                {userData?.expiresAt
                  ? new Date(userData.expiresAt * 1000).toLocaleString()
                  : 'Unknown'}
              </p>
              <p className="text-sm text-muted-foreground">
                Authentication method: OpenCampus ID Connect
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Key className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium text-sm">Access Permissions</h3>
              <p className="text-sm text-muted-foreground mt-1">
                You now have access to submit research proposals, track funding, and connect with
                funding organizations.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-blue-500/10 pt-4">
        <div className="w-full text-center">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500">
            Go to Dashboard
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
