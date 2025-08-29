import { useState } from 'react'

export const useAdminDashboard = ({
  services,
  incidents,
  onCreateService,
  onUpdateService,
  onDeleteService,
  onCreateIncident,
  onUpdateIncident,
  loading,
  onRefresh
}) => {
  // UI State
  const [activeTab, setActiveTab] = useState('services')
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [showIncidentForm, setShowIncidentForm] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [editingIncident, setEditingIncident] = useState(null)
  const [error, setError] = useState(null)

  // Form State
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    status: 'operational'
  })

  const [incidentForm, setIncidentForm] = useState({
    title: '',
    description: '',
    status: 'investigating',
    impact: 'minor',
    serviceIds: []
  })

  // Service Handlers
  const handleServiceSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      if (editingService) {
        await onUpdateService(editingService.id, serviceForm)
      } else {
        await onCreateService(serviceForm)
      }
      resetServiceForm()
    } catch (err) {
      setError('Failed to save service')
    }
  }

  const handleDeleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return
    }

    setError(null)
    try {
      await onDeleteService(id)
    } catch (err) {
      setError('Failed to delete service')
    }
  }

  const startEditService = (service) => {
    setEditingService(service)
    setServiceForm({
      name: service.name,
      description: service.description,
      status: service.status
    })
    setShowServiceForm(true)
  }

  const resetServiceForm = () => {
    setServiceForm({ name: '', description: '', status: 'operational' })
    setShowServiceForm(false)
    setEditingService(null)
  }

  // Incident Handlers
  const handleIncidentSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      if (editingIncident) {
        await onUpdateIncident(editingIncident.id, incidentForm)
      } else {
        await onCreateIncident(incidentForm)
      }
      resetIncidentForm()
    } catch (err) {
      setError('Failed to save incident')
    }
  }

  const startEditIncident = (incident) => {
    setEditingIncident(incident)
    setIncidentForm({
      title: incident.title,
      description: incident.description,
      status: incident.status,
      impact: incident.impact,
      serviceIds: incident.affectedServices || []
    })
    setShowIncidentForm(true)
  }

  const resetIncidentForm = () => {
    setIncidentForm({
      title: '',
      description: '',
      status: 'investigating',
      impact: 'minor',
      serviceIds: []
    })
    setShowIncidentForm(false)
    setEditingIncident(null)
  }

  // Error Handler
  const clearError = () => setError(null)

  return {
    // UI State
    activeTab,
    setActiveTab,
    showServiceForm,
    setShowServiceForm,
    showIncidentForm,
    setShowIncidentForm,
    editingService,
    editingIncident,
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
    services,
    incidents,
    loading,
    onRefresh
  }
}
