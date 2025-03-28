'use client'

import React from 'react'
import { useAuth } from './AuthProvider'

export default function LoginButton() {
  const { login } = useAuth()

  return (
    <div className="space-x-4">
      <button
        onClick={() => login('researcher')}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Login as Researcher
      </button>
      <button
        onClick={() => login('funder')}
        className="px-4 py-2 bg-green-600 text-white rounded-lg"
      >
        Login as Funder
      </button>
      <button
        onClick={() => login('admin')}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg"
      >
        Login as Admin
      </button>
    </div>
  )
}

// 'use client'

// import React from 'react'
// import { useOCAuth } from '@opencampus/ocid-connect-js'
// import { LogIn } from 'lucide-react'

// export default function LoginButton() {
//   const { ocAuth } = useOCAuth()

//   const handleLogin = async () => {
//     try {
//       await ocAuth.signInWithRedirect({ state: 'opencampus' })
//     } catch (error) {
//       console.error('Login error:', error)
//     }
//   }

//   return (
//     <button
//       onClick={handleLogin}
//       className="
//         flex items-center justify-center space-x-2
//         bg-blue-600 text-white
//         px-4 py-2 rounded-lg
//         hover:bg-blue-700
//         transition-colors
//         focus:outline-none
//         focus:ring-2
//         focus:ring-blue-500
//         focus:ring-offset-2
//       "
//     >
//       <LogIn className="w-5 h-5" />
//       <span>
//         Link <span className="font-bold">OCID</span>
//       </span>
//     </button>
//   )
// }

// // 'use client'
// // import React from 'react'
// // import { useOCAuth } from '@opencampus/ocid-connect-js'

// // const LoginButton = () => {
// //   const { ocAuth } = useOCAuth();

// //   const handleLogin = async () => {
// //     try {
// //       await ocAuth.signInWithRedirect({ state: 'opencampus' });
// //     } catch (error) {
// //       console.error('Login error:', error);
// //     }
// //   };
// //   return (
// //     <button className=' bg-red-400 p-2' onClick={handleLogin}>Link <span className='text-bold'>OCID</span></button>
// //   )
// // }

// // export default LoginButton
