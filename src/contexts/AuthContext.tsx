import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useState
} from 'react'

interface Props {
  children: ReactNode
}

interface IAuth {
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<SetStateAction<boolean>>

  isPageLoading: boolean
  setIsPageLoading: React.Dispatch<SetStateAction<boolean>>

  email: string
  setEmail: React.Dispatch<SetStateAction<string>>

  userId: string
  setUserId: React.Dispatch<SetStateAction<string>>
}

export const AuthContext = createContext<IAuth>({
  isSignedIn: false,
  setIsSignedIn: () => null,

  isPageLoading: true,
  setIsPageLoading: () => null,

  email: '',
  setEmail: () => null,

  userId: '',
  setUserId: () => null
})

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState('')

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
        isPageLoading,
        setIsPageLoading,
        email,
        setEmail,
        userId,
        setUserId
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider
