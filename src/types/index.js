// Service status types
export const SERVICE_STATUS = {
  OPERATIONAL: 'operational',
  DEGRADED: 'degraded',
  PARTIAL: 'partial',
  MAJOR: 'major'
}

// Incident status types
export const INCIDENT_STATUS = {
  INVESTIGATING: 'investigating',
  IDENTIFIED: 'identified',
  MONITORING: 'monitoring',
  RESOLVED: 'resolved'
}

// Incident impact types
export const INCIDENT_IMPACT = {
  MINOR: 'minor',
  MAJOR: 'major',
  CRITICAL: 'critical'
}

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MEMBER: 'member',
  VIEWER: 'viewer'
}

// Service data structure
export const createService = (data = {}) => ({
  id: data.id || '',
  name: data.name || '',
  description: data.description || '',
  status: data.status || SERVICE_STATUS.OPERATIONAL,
  organizationId: data.organizationId || '',
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
  ...data
})

// Incident data structure
export const createIncident = (data = {}) => ({
  id: data.id || '',
  title: data.title || '',
  description: data.description || '',
  status: data.status || INCIDENT_STATUS.INVESTIGATING,
  impact: data.impact || INCIDENT_IMPACT.MINOR,
  serviceIds: data.serviceIds || [],
  organizationId: data.organizationId || '',
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
  resolvedAt: data.resolvedAt || null,
  updates: data.updates || [],
  ...data
})

// Incident update data structure
export const createIncidentUpdate = (data = {}) => ({
  id: data.id || '',
  incidentId: data.incidentId || '',
  message: data.message || '',
  status: data.status || INCIDENT_STATUS.INVESTIGATING,
  createdAt: data.createdAt || new Date().toISOString(),
  createdBy: data.createdBy || '',
  ...data
})

// Organization data structure
export const createOrganization = (data = {}) => ({
  id: data.id || '',
  name: data.name || '',
  slug: data.slug || '',
  description: data.description || '',
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
  ...data
})

// User data structure
export const createUser = (data = {}) => ({
  id: data.id || '',
  email: data.email || '',
  name: data.name || '',
  role: data.role || USER_ROLES.VIEWER,
  organizationId: data.organizationId || '',
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
  ...data
})
