import { useState } from 'react'

/**
 * Custom hook for authentication management
 */
export const useAuth = () => {
  const [user, setUser] = useState(null)

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  const isAuthenticated = Boolean(user)

  return {
    user,
    login,
    logout,
    isAuthenticated
  }
}
