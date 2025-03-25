'use client'
import React from 'react'
import { LoginCallBack, useOCAuth } from '@opencampus/ocid-connect-js'
import { useRouter } from 'next/navigation'


const Redirect = () => {
    const router = useRouter()
    const { authState } = useOCAuth()


    const loginSuccess = () => {
        console.log("Success")
        router.push('/');
     }
    
      const loginError = (error: any) => {
        console.error('Login error:', error);
      };


      function CustomErrorComponent() {
        return <div className='text-white'>Error Logging in: {authState.error?.message}</div>;
        }
      
        function CustomLoadingComponent() {
        return <div>Loading....</div>;
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

export default Redirect