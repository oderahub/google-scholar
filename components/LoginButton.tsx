'use client'
import { useOCAuth } from '@opencampus/ocid-connect-js'
import { Button } from '@/components/ui/button'
import { Loader2, LinkIcon } from 'lucide-react'
import { useState } from 'react'

const LoginButton = () => {
  const { ocAuth } = useOCAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      await ocAuth.signInWithRedirect({ state: 'opencampus' })
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleLogin}
      disabled={isLoading}
      className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300"
    >
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600/0 via-white/10 to-blue-600/0 group-hover:via-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <LinkIcon className="mr-2 h-4 w-4" />
      )}
      Connect with <span className="font-bold ml-1">OCID</span>
    </Button>
  )
}

export default LoginButton
