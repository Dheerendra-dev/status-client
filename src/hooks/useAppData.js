import { useState, useEffect, useCallback } from 'react'
import { useServices } from './useServices'
import { useIncidents } from './useIncidents'

/**
 * Custom hook for managing app-wide data loading and error handling
 */
export const useAppData = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const servicesHook = useServices()
  const incidentsHook = useIncidents()

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Load services and incidents in parallel
      await Promise.all([
        servicesHook.loadServices(),
        incidentsHook.loadIncidents()
      ])
    } catch (err) {
      console.error('Failed to load data:', err)
      setError('Failed to load data from server. Please check if the server is running.')
    } finally {
      setLoading(false)
    }
  }, [servicesHook.loadServices, incidentsHook.loadIncidents])

  // Load data on mount
  useEffect(() => {
    loadData()
  }, [loadData])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Enhanced service operations with error handling
  const createServiceWithErrorHandling = useCallback(async (service) => {
    try {
      return await servicesHook.createService(service)
    } catch (err) {
      console.error('Failed to add service:', err)
      setError('Failed to add service')
      throw err
    }
  }, [servicesHook.createService])

  const updateServiceWithErrorHandling = useCallback(async (id, updates) => {
    try {
      return await servicesHook.updateService(id, updates)
    } catch (err) {
      console.error('Failed to update service:', err)
      setError('Failed to update service')
      throw err
    }
  }, [servicesHook.updateService])

  const deleteServiceWithErrorHandling = useCallback(async (id) => {
    try {
      await servicesHook.deleteService(id)
    } catch (err) {
      console.error('Failed to delete service:', err)
      setError('Failed to delete service')
      throw err
    }
  }, [servicesHook.deleteService])

  // Enhanced incident operations with error handling
  const createIncidentWithErrorHandling = useCallback(async (incident) => {
    try {
      return await incidentsHook.createIncident(incident)
    } catch (err) {
      console.error('Failed to add incident:', err)
      setError('Failed to add incident')
      throw err
    }
  }, [incidentsHook.createIncident])

  const updateIncidentWithErrorHandling = useCallback(async (id, updates) => {
    try {
      return await incidentsHook.updateIncident(id, updates)
    } catch (err) {
      console.error('Failed to update incident:', err)
      setError('Failed to update incident')
      throw err
    }
  }, [incidentsHook.updateIncident])

  const addIncidentUpdateWithErrorHandling = useCallback(async (incidentId, update) => {
    try {
      await incidentsHook.addIncidentUpdate(incidentId, update)
    } catch (err) {
      console.error('Failed to add incident update:', err)
      setError('Failed to add incident update')
      throw err
    }
  }, [incidentsHook.addIncidentUpdate])

  return {
    // State
    loading,
    error,
    services: servicesHook.services,
    incidents: incidentsHook.incidents,

    // Actions
    loadData,
    clearError,

    // Service operations
    createService: createServiceWithErrorHandling,
    updateService: updateServiceWithErrorHandling,
    deleteService: deleteServiceWithErrorHandling,

    // Incident operations
    createIncident: createIncidentWithErrorHandling,
    updateIncident: updateIncidentWithErrorHandling,
    addIncidentUpdate: addIncidentUpdateWithErrorHandling
  }
}
