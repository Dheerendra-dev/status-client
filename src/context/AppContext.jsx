import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { createService, createIncident, createIncidentUpdate, SERVICE_STATUS, INCIDENT_STATUS } from '../types'

// Initial state
const initialState = {
  user: null,
  organization: null,
  services: [],
  incidents: [],
  loading: false,
  error: null,
}

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_USER: 'SET_USER',
  SET_ORGANIZATION: 'SET_ORGANIZATION',
  SET_SERVICES: 'SET_SERVICES',
  ADD_SERVICE: 'ADD_SERVICE',
  UPDATE_SERVICE: 'UPDATE_SERVICE',
  DELETE_SERVICE: 'DELETE_SERVICE',
  SET_INCIDENTS: 'SET_INCIDENTS',
  ADD_INCIDENT: 'ADD_INCIDENT',
  UPDATE_INCIDENT: 'UPDATE_INCIDENT',
  ADD_INCIDENT_UPDATE: 'ADD_INCIDENT_UPDATE',
  RESOLVE_INCIDENT: 'RESOLVE_INCIDENT',
}

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload }
    
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false }
    
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload }
    
    case ActionTypes.SET_ORGANIZATION:
      return { ...state, organization: action.payload }
    
    case ActionTypes.SET_SERVICES:
      return { ...state, services: action.payload }
    
    case ActionTypes.ADD_SERVICE:
      return { ...state, services: [...state.services, action.payload] }
    
    case ActionTypes.UPDATE_SERVICE:
      return {
        ...state,
        services: state.services.map(service =>
          service.id === action.payload.id ? { ...service, ...action.payload } : service
        )
      }
    
    case ActionTypes.DELETE_SERVICE:
      return {
        ...state,
        services: state.services.filter(service => service.id !== action.payload)
      }
    
    case ActionTypes.SET_INCIDENTS:
      return { ...state, incidents: action.payload }
    
    case ActionTypes.ADD_INCIDENT:
      return { ...state, incidents: [...state.incidents, action.payload] }
    
    case ActionTypes.UPDATE_INCIDENT:
      return {
        ...state,
        incidents: state.incidents.map(incident =>
          incident.id === action.payload.id ? { ...incident, ...action.payload } : incident
        )
      }
    
    case ActionTypes.ADD_INCIDENT_UPDATE:
      return {
        ...state,
        incidents: state.incidents.map(incident =>
          incident.id === action.payload.incidentId
            ? { ...incident, updates: [...incident.updates, action.payload] }
            : incident
        )
      }
    
    case ActionTypes.RESOLVE_INCIDENT:
      return {
        ...state,
        incidents: state.incidents.map(incident =>
          incident.id === action.payload
            ? { ...incident, status: INCIDENT_STATUS.RESOLVED, resolvedAt: new Date().toISOString() }
            : incident
        )
      }
    
    default:
      return state
  }
}

// Create context
const AppContext = createContext()

// Context provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load initial data (mock data for now)
  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = () => {
    // Mock data - in a real app, this would come from an API
    const mockServices = [
      createService({
        id: uuidv4(),
        name: 'Website',
        description: 'Main company website',
        status: SERVICE_STATUS.OPERATIONAL,
      }),
      createService({
        id: uuidv4(),
        name: 'API',
        description: 'Core API services',
        status: SERVICE_STATUS.DEGRADED,
      }),
      createService({
        id: uuidv4(),
        name: 'Database',
        description: 'Primary database cluster',
        status: SERVICE_STATUS.OPERATIONAL,
      }),
    ]

    const mockIncidents = [
      createIncident({
        id: uuidv4(),
        title: 'API Response Times Elevated',
        description: 'We are investigating elevated response times for our API services.',
        status: INCIDENT_STATUS.INVESTIGATING,
        impact: 'minor',
        serviceIds: [mockServices[1].id],
        updates: [
          createIncidentUpdate({
            id: uuidv4(),
            message: 'We have identified the issue and are working on a fix.',
            status: INCIDENT_STATUS.IDENTIFIED,
            createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
          })
        ]
      })
    ]

    dispatch({ type: ActionTypes.SET_SERVICES, payload: mockServices })
    dispatch({ type: ActionTypes.SET_INCIDENTS, payload: mockIncidents })
  }

  // Action creators
  const actions = {
    setLoading: (loading) => dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: ActionTypes.SET_ERROR, payload: error }),
    setUser: (user) => dispatch({ type: ActionTypes.SET_USER, payload: user }),
    setOrganization: (org) => dispatch({ type: ActionTypes.SET_ORGANIZATION, payload: org }),
    
    addService: (serviceData) => {
      const service = createService({ ...serviceData, id: uuidv4() })
      dispatch({ type: ActionTypes.ADD_SERVICE, payload: service })
      return service
    },
    
    updateService: (id, updates) => {
      const updatedService = { id, ...updates, updatedAt: new Date().toISOString() }
      dispatch({ type: ActionTypes.UPDATE_SERVICE, payload: updatedService })
    },
    
    deleteService: (id) => {
      dispatch({ type: ActionTypes.DELETE_SERVICE, payload: id })
    },
    
    addIncident: (incidentData) => {
      const incident = createIncident({ ...incidentData, id: uuidv4() })
      dispatch({ type: ActionTypes.ADD_INCIDENT, payload: incident })
      return incident
    },
    
    updateIncident: (id, updates) => {
      const updatedIncident = { id, ...updates, updatedAt: new Date().toISOString() }
      dispatch({ type: ActionTypes.UPDATE_INCIDENT, payload: updatedIncident })
    },
    
    addIncidentUpdate: (incidentId, message, status) => {
      const update = createIncidentUpdate({
        id: uuidv4(),
        incidentId,
        message,
        status,
      })
      dispatch({ type: ActionTypes.ADD_INCIDENT_UPDATE, payload: update })
    },
    
    resolveIncident: (id) => {
      dispatch({ type: ActionTypes.RESOLVE_INCIDENT, payload: id })
    },
  }

  return (
    <AppContext.Provider value={{ ...state, ...actions }}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
