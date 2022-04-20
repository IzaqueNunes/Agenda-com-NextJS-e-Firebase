import React, { createContext, SetStateAction, useState } from 'react'

interface Props {
  children: React.ReactNode
}

interface IAuth {
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<SetStateAction<boolean>>

  isPageLoading: boolean
  setIsPageLoading: React.Dispatch<SetStateAction<boolean>>

  user: string
  setUser: React.Dispatch<SetStateAction<string>>

  userId: string
  setUserId: React.Dispatch<SetStateAction<string>>
}

export const AuthContext = createContext<IAuth>({
  isSignedIn: false,
  setIsSignedIn: () => null,

  isPageLoading: true,
  setIsPageLoading: () => null,

  user: '',
  setUser: () => null,

  userId: '',
  setUserId: () => null
})

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const [user, setUser] = useState('')
  const [userId, setUserId] = useState('')

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
        isPageLoading,
        setIsPageLoading,
        user,
        setUser,
        userId,
        setUserId
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
