import { useState } from 'react'

/**
 * Custom hook for navigation management
 */
export const useNavigation = (initialView = 'status') => {
  const [currentView, setCurrentView] = useState(initialView)

  const navigateTo = (view) => {
    setCurrentView(view)
  }

  const navigateToStatus = () => navigateTo('status')
  const navigateToAdmin = () => navigateTo('admin')

  return {
    currentView,
    navigateTo,
    navigateToStatus,
    navigateToAdmin,
    isStatusView: currentView === 'status',
    isAdminView: currentView === 'admin'
  }
}
