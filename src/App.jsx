import React from 'react'
import './App.css'

// Components
import StatusPage from './components/StatusPage'
import AdminDashboard from './components/AdminDashboard'
import LoginForm from './components/LoginForm'
import Navigation from './components/ui/Navigation'
import LoadingSpinner from './components/ui/LoadingSpinner'
import ErrorDisplay from './components/ui/ErrorDisplay'

// Custom hooks
import { useAuth, useNavigation, useAppData } from './hooks'

function App() {
  // Custom hooks
  const auth = useAuth()
  const navigation = useNavigation('status')
  const {
    loading,
    error,
    services,
    incidents,
    loadData,
    createService,
    updateService,
    deleteService,
    createIncident,
    updateIncident,
    addIncidentUpdate
  } = useAppData()

  // Event handlers
  const handleLogin = (userData) => {
    auth.login(userData)
  }

  const handleLogout = () => {
    auth.logout()
    navigation.navigateToStatus()
  }

  // Show login form if user is not authenticated and trying to access admin
  if (!auth.isAuthenticated && navigation.isAdminView) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div>
      {/* Navigation */}
      <Navigation
        currentView={navigation.currentView}
        onNavigate={navigation.navigateTo}
        user={auth.user}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main>
        {loading && <LoadingSpinner />}

        {error && <ErrorDisplay error={error} onRetry={loadData} />}

        {!loading && !error && navigation.isStatusView && (
          <StatusPage services={services} incidents={incidents} />
        )}

        {!loading && !error && navigation.isAdminView && (
          <div className="main-container" style={{ padding: '40px 24px' }}>
            <AdminDashboard
              services={services}
              incidents={incidents}
              onCreateService={createService}
              onUpdateService={updateService}
              onDeleteService={deleteService}
              onCreateIncident={createIncident}
              onUpdateIncident={updateIncident}
              onRefresh={loadData}
            />
          </div>
        )}
      </main>
    </div>
  )
}

export default App
