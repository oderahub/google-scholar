'use client'

import React from 'react'
import { useAuth } from './AuthProvider'
import { User, LogIn } from 'lucide-react'
import LoginButton from './LoginButton'

export default function UserProfile() {
  const { user, logout } = useAuth()
  console.log('UserProfile: render, user:', user)

  if (!user) {
    return <LoginButton />
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <User className="text-blue-600" />
        )}
      </div>
      <div>
        <h4 className="font-semibold text-sm">{user.name || 'Researcher Profile'}</h4>
        <p className="text-xs text-gray-500">{user.email || 'Verified Researcher'}</p>
      </div>
      <button onClick={logout} className="text-red-500 hover:text-red-700 transition-colors">
        <LogIn className="w-5 h-5 transform rotate-180" />
      </button>
    </div>
  )
}

// 'use client'

// import React from 'react'
// import { useAuth } from '../AuthProvider'
// import { User, LogIn } from 'lucide-react'
// import LoginButton from '../LoginButton'

// export default function UserProfile() {
//   const { user, logout } = useAuth()

//   if (!user) {
//     return <LoginButton />
//   }

//   return (
//     <div className="flex items-center space-x-3">
//       <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
//         {user.profilePicture ? (
//           <img
//             src={user.profilePicture}
//             alt="Profile"
//             className="w-full h-full rounded-full object-cover"
//           />
//         ) : (
//           <User className="text-blue-600" />
//         )}
//       </div>
//       <div>
//         <h4 className="font-semibold text-sm">{user.name || 'Researcher Profile'}</h4>
//         <p className="text-xs text-gray-500">{user.email || 'Verified Researcher'}</p>
//       </div>
//       <button onClick={logout} className="text-red-500 hover:text-red-700 transition-colors">
//         <LogIn className="w-5 h-5 transform rotate-180" />
//       </button>
//     </div>
//   )
// }
