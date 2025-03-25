'use client'
import React from 'react'
import { useOCAuth } from '@opencampus/ocid-connect-js'

const LoginButton = () => {
  const { ocAuth } = useOCAuth();

  const handleLogin = async () => {
    try {
      await ocAuth.signInWithRedirect({ state: 'opencampus' });
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  return (
    <button className=' bg-red-400 p-2' onClick={handleLogin}>Link <span className='text-bold'>OCID</span></button>
  )
}

export default LoginButton