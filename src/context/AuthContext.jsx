import { createContext, useContext, useEffect, useState } from 'react'
import { login as apiLogin, signup as apiSignup } from '../services/api'

const AuthContext = createContext({
  currentUser: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  isAuthenticated: false,
  setCurrentUser: () => {},
  loading: true
})

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      setCurrentUser({ token }) 
    } else {
      setCurrentUser(null)
    }

    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const { token } = await apiLogin(email, password)
    localStorage.setItem('token', token)
    setCurrentUser({ token })
    return true
  }

  const signup = async (name, email, password) => {
    const { token } = await apiSignup(name, email, password)
    localStorage.setItem('token', token)
    setCurrentUser({ token })
    return true
  }

  const logout = () => {
    localStorage.removeItem('token')
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        signup,
        logout,
        loading,
        setCurrentUser // expose this for Google login
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}