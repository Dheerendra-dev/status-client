/**
 * Utility functions for calculating status page metrics
 */

/**
 * Calculate overall system uptime as average of all services
 */
export const calculateOverallUptime = (services) => {
  if (!services || services.length === 0) return 0
  const total = services.reduce((sum, service) => sum + (service.uptime || 0), 0)
  return Number((total / services.length).toFixed(1))
}

/**
 * Calculate average response time based on service status
 */
export const calculateAverageResponseTime = (services) => {
  if (!services || services.length === 0) return 0
  
  const statusMultiplier = {
    'operational': 1,
    'degraded': 1.5,
    'partial': 2,
    'major': 3
  }
  
  const baseTime = 100
  const total = services.reduce((sum, service) => {
    const multiplier = statusMultiplier[service.status] || 1
    return sum + (baseTime * multiplier)
  }, 0)
  
  return Math.round(total / services.length)
}

/**
 * Count incidents resolved in current month
 */
export const countThisMonthIncidents = (incidents) => {
  if (!incidents || incidents.length === 0) return 0
  
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  
  return incidents.filter(incident => {
    if (incident.status !== 'resolved') return false
    
    const incidentDate = new Date(
      incident.createdAt || 
      incident.timestamp || 
      incident.resolvedAt || 
      Date.now()
    )
    
    return incidentDate.getMonth() === currentMonth && 
           incidentDate.getFullYear() === currentYear
  }).length
}

/**
 * Get last update time from services and incidents
 */
export const getLastUpdateTime = (services, incidents) => {
  const allTimestamps = [
    ...(services || []).map(s => new Date(s.lastUpdated || s.updatedAt || Date.now())),
    ...(incidents || []).map(i => new Date(i.updatedAt || i.timestamp || Date.now()))
  ]
  
  if (allTimestamps.length === 0) return 'Just now'
  
  const mostRecent = new Date(Math.max(...allTimestamps))
  const now = new Date()
  const diffMinutes = Math.floor((now - mostRecent) / (1000 * 60))
  
  if (diffMinutes < 1) return 'Just now'
  if (diffMinutes === 1) return '1 minute ago'
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`
  
  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours === 1) return '1 hour ago'
  if (diffHours < 24) return `${diffHours} hours ago`
  
  const diffDays = Math.floor(diffHours / 24)
  return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`
}

/**
 * Get metric value CSS class based on value and thresholds
 */
export const getMetricClass = (value, type) => {
  switch (type) {
    case 'uptime':
      if (value >= 99) return 'success'
      if (value >= 95) return 'warning'
      return 'error'
    
    case 'responseTime':
      if (value <= 150) return 'success'
      if (value <= 300) return 'warning'
      return 'error'
    
    case 'incidents':
      if (value === 0) return 'success'
      if (value <= 2) return 'warning'
      return 'error'
    
    default:
      return ''
  }
}

/**
 * Calculate system health score (0-100)
 */
export const calculateHealthScore = (services, incidents) => {
  if (!services || services.length === 0) return 100
  
  const uptimeScore = calculateOverallUptime(services)
  const activeIncidents = incidents?.filter(i => i.status !== 'resolved').length || 0
  
  // Deduct points for active incidents
  const incidentPenalty = Math.min(activeIncidents * 10, 30) // Max 30 point penalty
  
  return Math.max(0, Math.min(100, uptimeScore - incidentPenalty))
}

/**
 * Get overall system status based on services and incidents
 */
export const getOverallSystemStatus = (services, incidents) => {
  const activeIncidents = incidents?.filter(i => i.status !== 'resolved') || []
  
  if (activeIncidents.length === 0) {
    const operationalServices = services?.filter(s => s.status === 'operational').length || 0
    const totalServices = services?.length || 0
    
    if (operationalServices === totalServices) return 'operational'
    if (operationalServices / totalServices >= 0.8) return 'degraded'
    return 'partial'
  }
  
  // Check incident severity
  const hasMajorIncident = activeIncidents.some(i => i.severity === 'major')
  if (hasMajorIncident) return 'major'
  
  const hasPartialIncident = activeIncidents.some(i => i.severity === 'partial')
  if (hasPartialIncident) return 'partial'
  
  return 'degraded'
}
