import React from 'react'
import { useAdminDashboard } from './hooks/useAdminDashboard'
import {
  ServiceForm,
  IncidentForm,
  ErrorAlert,
  RefreshButton,
  AdminTabs,
  ServicesTab,
  IncidentsTab
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

        <RefreshButton onRefresh={onRefresh} loading={loading} />
      </div>

      {/* Tabs */}
      <AdminTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        servicesCount={services.length}
        incidentsCount={incidents.length}
      />

      {/* Services Tab */}
      {activeTab === 'services' && (
        <ServicesTab
          services={services}
          onAddService={() => setShowServiceForm(true)}
          onEditService={startEditService}
          onDeleteService={handleDeleteService}
          loading={loading}
        />
      )}

      {/* Incidents Tab */}
      {activeTab === 'incidents' && (
        <IncidentsTab
          incidents={incidents}
          onAddIncident={() => setShowIncidentForm(true)}
          onEditIncident={startEditIncident}
        />
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
