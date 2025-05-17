// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react'

// 1. Create context with proper default value
const AuthContext = createContext({
  currentUser: null,
  login: () => {},
  signup: () => {},
  logout: () => {}
})

// 2. Create provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  const login = async (email, password) => {
    try {
      // Replace with actual auth logic
      setCurrentUser({ email })
      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }

  const signup = async (email, password) => {
    try {
      // Replace with actual auth logic
      setCurrentUser({ email })
      return true
    } catch (error) {
      console.error("Signup failed:", error)
      return false
    }
  }

  const logout = () => {
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// 3. Custom hook for consuming context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}