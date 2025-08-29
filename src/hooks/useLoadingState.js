import { useState, useCallback } from 'react'

/**
 * Custom hook for managing loading states with different types
 */
export const useLoadingState = (initialState = false) => {
  const [loading, setLoading] = useState(initialState)
  const [loadingType, setLoadingType] = useState(null)

  const startLoading = useCallback((type = 'default') => {
    setLoading(true)
    setLoadingType(type)
  }, [])

  const stopLoading = useCallback(() => {
    setLoading(false)
    setLoadingType(null)
  }, [])

  const withLoading = useCallback(async (asyncFn, type = 'default') => {
    try {
      startLoading(type)
      const result = await asyncFn()
      return result
    } finally {
      stopLoading()
    }
  }, [startLoading, stopLoading])

  return {
    loading,
    loadingType,
    startLoading,
    stopLoading,
    withLoading,
    isLoading: (type) => loading && (type ? loadingType === type : true)
  }
}
