import { useState, useCallback } from 'react'
import apiService from '../services/api'

/**
 * Custom hook for services management
 */
export const useServices = () => {
  const [services, setServices] = useState([])

  const loadServices = useCallback(async () => {
    const servicesData = await apiService.getServices()
    setServices(servicesData)
    return servicesData
  }, [])

  const createService = useCallback(async (service) => {
    const newService = await apiService.createService(service)
    setServices(prev => [...prev, newService])
    return newService
  }, [])

  const updateService = useCallback(async (id, updates) => {
    const updatedService = await apiService.updateService(id, updates)
    setServices(prev => prev.map(s => s.id === id ? updatedService : s))
    return updatedService
  }, [])

  const deleteService = useCallback(async (id) => {
    await apiService.deleteService(id)
    setServices(prev => prev.filter(s => s.id !== id))
  }, [])

  return {
    services,
    setServices,
    loadServices,
    createService,
    updateService,
    deleteService
  }
}
