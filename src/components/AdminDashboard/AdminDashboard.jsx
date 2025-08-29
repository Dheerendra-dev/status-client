import React from 'react'
import { Plus, AlertCircle } from 'lucide-react'
import { useAdminDashboard } from './hooks/useAdminDashboard'
import {
  ServiceForm,
  IncidentForm,
  ServiceCard,
  IncidentCard,
  EmptyState,
  ErrorAlert
} from './components'

const AdminDashboard = ({
  services = [],
  incidents = [],
  onCreateService,
  onUpdateService,
  onDeleteService,
  onCreateIncident,
  onUpdateIncident,
  loading = false,
  onRefresh
}) => {
  const {
    // UI State
    activeTab,
    setActiveTab,
    showServiceForm,
    setShowServiceForm,
    showIncidentForm,
    setShowIncidentForm,
    error,
    clearError,

    // Form State
    serviceForm,
    setServiceForm,
    incidentForm,
    setIncidentForm,

    // Handlers
    handleServiceSubmit,
    handleDeleteService,
    startEditService,
    resetServiceForm,
    handleIncidentSubmit,
    startEditIncident,
    resetIncidentForm,

    // Data
    editingService,
    editingIncident
  } = useAdminDashboard({
    services,
    incidents,
    onCreateService,
    onUpdateService,
    onDeleteService,
    onCreateIncident,
    onUpdateIncident,
    loading,
    onRefresh
  })

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <p className="admin-subtitle">Manage your services and incidents</p>

        <ErrorAlert error={error} onClose={clearError} />

        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={loading}
            className="btn btn-secondary"
            style={{ marginTop: '16px' }}
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          onClick={() => setActiveTab('services')}
          className={`admin-tab ${activeTab === 'services' ? 'active' : ''}`}
        >
          Services ({services.length})
        </button>
        <button
          onClick={() => setActiveTab('incidents')}
          className={`admin-tab ${activeTab === 'incidents' ? 'active' : ''}`}
        >
          Incidents ({incidents.length})
        </button>
      </div>

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div className="admin-section">
          <div className="section-header">
            <h2 className="section-title">Services</h2>
            <button
              onClick={() => setShowServiceForm(true)}
              className="btn btn-primary"
            >
              <Plus size={16} />
              Add Service
            </button>
          </div>

          {/* Services List */}
          {services.length === 0 ? (
            <EmptyState
              title="No services yet"
              description="Create your first service to start monitoring your infrastructure."
            />
          ) : (
            <div className="services-admin-grid">
              {services.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onEdit={startEditService}
                  onDelete={handleDeleteService}
                  loading={loading}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Incidents Tab */}
      {activeTab === 'incidents' && (
        <div className="admin-section">
          <div className="section-header">
            <h2 className="section-title">Incidents</h2>
            <button
              onClick={() => setShowIncidentForm(true)}
              className="btn btn-primary"
              style={{ background: '#dc2626', borderColor: '#dc2626' }}
            >
              <AlertCircle size={16} />
              Create Incident
            </button>
          </div>

          {/* Incidents List */}
          {incidents.length === 0 ? (
            <EmptyState
              title="No incidents"
              description="No active incidents. Your services are running smoothly!"
            />
          ) : (
            <div className="services-admin-grid">
              {incidents.map(incident => (
                <IncidentCard
                  key={incident.id}
                  incident={incident}
                  onEdit={startEditIncident}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Forms */}
      <ServiceForm
        showServiceForm={showServiceForm}
        editingService={editingService}
        serviceForm={serviceForm}
        setServiceForm={setServiceForm}
        handleServiceSubmit={handleServiceSubmit}
        resetServiceForm={resetServiceForm}
        loading={loading}
      />

      <IncidentForm
        showIncidentForm={showIncidentForm}
        editingIncident={editingIncident}
        incidentForm={incidentForm}
        setIncidentForm={setIncidentForm}
        handleIncidentSubmit={handleIncidentSubmit}
        resetIncidentForm={resetIncidentForm}
        loading={loading}
      />
    </div>
  )
}

export default AdminDashboard
