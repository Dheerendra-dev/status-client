import { useState, useEffect } from 'react'
import { Activity, Settings, LogOut } from 'lucide-react'
import './App.css'

// Simple components
import StatusPage from './components/StatusPage'
import AdminDashboard from './components/AdminDashboard'
import LoginForm from './components/LoginForm'

// API service
import apiService from './services/api'

function App() {
  const [user, setUser] = useState(null)
  const [services, setServices] = useState([])
  const [incidents, setIncidents] = useState([])
  const [currentView, setCurrentView] = useState('status')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load data from API on component mount
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Load services and incidents in parallel
      const [servicesData, incidentsData] = await Promise.all([
        apiService.getServices(),
        apiService.getIncidents()
      ])

      setServices(servicesData)
      setIncidents(incidentsData)
    } catch (err) {
      console.error('Failed to load data:', err)
      setError('Failed to load data from server. Please check if the server is running.')
    } finally {
      setLoading(false)
    }
  }

  const addService = async (service) => {
    try {
      const newService = await apiService.createService(service)
      setServices([...services, newService])
      return newService
    } catch (err) {
      console.error('Failed to add service:', err)
      setError('Failed to add service')
      throw err
    }
  }

  const updateService = async (id, updates) => {
    try {
      const updatedService = await apiService.updateService(id, updates)
      setServices(services.map(s => s.id === id ? updatedService : s))
      return updatedService
    } catch (err) {
      console.error('Failed to update service:', err)
      setError('Failed to update service')
      throw err
    }
  }

  const deleteService = async (id) => {
    try {
      await apiService.deleteService(id)
      setServices(services.filter(s => s.id !== id))
    } catch (err) {
      console.error('Failed to delete service:', err)
      setError('Failed to delete service')
      throw err
    }
  }

  const addIncident = async (incident) => {
    try {
      const newIncident = await apiService.createIncident(incident)
      setIncidents([...incidents, newIncident])
      return newIncident
    } catch (err) {
      console.error('Failed to add incident:', err)
      setError('Failed to add incident')
      throw err
    }
  }

  const updateIncident = async (id, updates) => {
    try {
      const updatedIncident = await apiService.updateIncident(id, updates)
      setIncidents(incidents.map(i => i.id === id ? updatedIncident : i))
      return updatedIncident
    } catch (err) {
      console.error('Failed to update incident:', err)
      setError('Failed to update incident')
      throw err
    }
  }

  const addIncidentUpdate = async (incidentId, update) => {
    try {
      await apiService.addIncidentUpdate(incidentId, update)
      // Reload incidents to get the updated data
      const updatedIncidents = await apiService.getIncidents()
      setIncidents(updatedIncidents)
    } catch (err) {
      console.error('Failed to add incident update:', err)
      setError('Failed to add incident update')
      throw err
    }
  }

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView('status')
  }

  // Show login form if user is not authenticated and trying to access admin
  if (!user && currentView === 'admin') {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <Activity size={32} />
            StatusPage
          </div>
          <div className="nav-links">
            <button
              onClick={() => setCurrentView('status')}
              className={`nav-button ${currentView === 'status' ? 'active' : 'secondary'}`}
            >
              Status Page
            </button>
            <button
              onClick={() => setCurrentView('admin')}
              className={`nav-button ${currentView === 'admin' ? 'active' : 'secondary'}`}
            >
              <Settings size={16} />
              Admin
            </button>
            {user && (
              <>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="nav-button secondary"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {loading && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
            fontSize: '18px',
            color: '#64748b'
          }}>
            Loading...
          </div>
        )}

        {error && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '400px',
            fontSize: '16px',
            color: '#ef4444',
            textAlign: 'center',
            padding: '20px'
          }}>
            <div>
              <p>{error}</p>
              <button
                onClick={loadData}
                style={{
                  marginTop: '16px',
                  padding: '8px 16px',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {!loading && !error && currentView === 'status' && (
          <StatusPage services={services} incidents={incidents} />
        )}

        {!loading && !error && currentView === 'admin' && (
          <div className="main-container" style={{ padding: '40px 24px' }}>
            <AdminDashboard
              services={services}
              incidents={incidents}
              onAddService={addService}
              onUpdateService={updateService}
              onDeleteService={deleteService}
              onAddIncident={addIncident}
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
