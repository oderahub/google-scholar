'use client'
import { LoginCallBack, useOCAuth } from '@opencampus/ocid-connect-js'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

const Redirect = () => {
  const router = useRouter()
  const { authState } = useOCAuth()

  const loginSuccess = () => {
    console.log('Success')
    router.push('/')
  }

  const loginError = (error: any) => {
    console.error('Login error:', error)
  }

  function CustomErrorComponent() {
    return (
      <Card className="w-full max-w-md mx-auto mt-20 border-red-500/20 bg-red-500/5">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 text-red-500">
            <AlertCircle className="h-5 w-5" />
            <h3 className="font-medium">Authentication Error</h3>
          </div>
          <p className="mt-2 text-muted-foreground">
            {authState.error?.message || 'An error occurred during login. Please try again.'}
          </p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 text-sm text-blue-500 hover:text-blue-400 transition-colors"
          >
            Return to home
          </button>
        </CardContent>
      </Card>
    )
  }

  function CustomLoadingComponent() {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-t-2 border-indigo-500 animate-spin animation-delay-150"></div>
          <div className="absolute inset-4 rounded-full border-t-2 border-purple-500 animate-spin animation-delay-300"></div>
        </div>
        <p className="mt-6 text-muted-foreground">Authenticating with OpenCampus ID...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <LoginCallBack
        errorCallback={loginError}
        successCallback={loginSuccess}
        customErrorComponent={<CustomErrorComponent />}
        customLoadingComponent={<CustomLoadingComponent />}
      />
    </div>
  )
}

export default Redirect
