import { useState, useCallback } from 'react'
import apiService from '../services/api'

/**
 * Custom hook for incidents management
 */
export const useIncidents = () => {
  const [incidents, setIncidents] = useState([])

  const loadIncidents = useCallback(async () => {
    const incidentsData = await apiService.getIncidents()
    setIncidents(incidentsData)
    return incidentsData
  }, [])

  const createIncident = useCallback(async (incident) => {
    const newIncident = await apiService.createIncident(incident)
    setIncidents(prev => [...prev, newIncident])
    return newIncident
  }, [])

  const updateIncident = useCallback(async (id, updates) => {
    const updatedIncident = await apiService.updateIncident(id, updates)
    setIncidents(prev => prev.map(i => i.id === id ? updatedIncident : i))
    return updatedIncident
  }, [])

  const deleteIncident = useCallback(async (id) => {
    await apiService.deleteIncident(id)
    setIncidents(prev => prev.filter(i => i.id !== id))
  }, [])

  const addIncidentUpdate = useCallback(async (incidentId, update) => {
    await apiService.addIncidentUpdate(incidentId, update)
    // Reload incidents to get the updated data
    const updatedIncidents = await apiService.getIncidents()
    setIncidents(updatedIncidents)
  }, [])

  return {
    incidents,
    setIncidents,
    loadIncidents,
    createIncident,
    updateIncident,
    deleteIncident,
    addIncidentUpdate
  }
}
