import axios from 'axios';

// API service for communicating with the backend
const API_BASE_URL = 'https://status-backend-k1tx.onrender.com/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds timeout for slower connections
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      console.warn('🔒 Unauthorized access');
    } else if (error.response?.status >= 500) {
      console.error('🔥 Server error - please try again later');
    } else if (error.code === 'ECONNABORTED') {
      console.error('⏰ Request timeout');
    }
    
    return Promise.reject(error);
  }
);

// ===== SERVICES API =====
export const getServices = async () => {
  try {
    const response = await apiClient.get('/services');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch services: ${error.message}`);
  }
};

export const getService = async (id) => {
  try {
    const response = await apiClient.get(`/services/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch service: ${error.message}`);
  }
};

export const createService = async (service) => {
  try {
    const response = await apiClient.post('/services', service);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create service: ${error.message}`);
  }
};

export const updateService = async (id, updates) => {
  try {
    const response = await apiClient.put(`/services/${id}`, updates);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update service: ${error.message}`);
  }
};

export const deleteService = async (id) => {
  try {
    await apiClient.delete(`/services/${id}`);
    return true;
  } catch (error) {
    throw new Error(`Failed to delete service: ${error.message}`);
  }
};

// ===== INCIDENTS API =====
export const getIncidents = async () => {
  try {
    const response = await apiClient.get('/incidents');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch incidents: ${error.message}`);
  }
};

export const getIncident = async (id) => {
  try {
    const response = await apiClient.get(`/incidents/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch incident: ${error.message}`);
  }
};

export const createIncident = async (incident) => {
  try {
    const response = await apiClient.post('/incidents', incident);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create incident: ${error.message}`);
  }
};

export const updateIncident = async (id, updates) => {
  try {
    const response = await apiClient.put(`/incidents/${id}`, updates);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update incident: ${error.message}`);
  }
};

export const deleteIncident = async (id) => {
  try {
    await apiClient.delete(`/incidents/${id}`);
    return true;
  } catch (error) {
    throw new Error(`Failed to delete incident: ${error.message}`);
  }
};

export const addIncidentUpdate = async (incidentId, update) => {
  try {
    const response = await apiClient.post(`/incidents/${incidentId}/updates`, update);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to add incident update: ${error.message}`);
  }
};

// ===== SYSTEM STATUS API =====
export const getSystemStatus = async () => {
  try {
    const response = await apiClient.get('/status');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch system status: ${error.message}`);
  }
};

// ===== HEALTH CHECK =====
export const getHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch health status: ${error.message}`);
  }
};

// ===== DEFAULT EXPORT =====
// Export all functions as a single object for backward compatibility
const apiService = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  getIncidents,
  getIncident,
  createIncident,
  updateIncident,
  deleteIncident,
  addIncidentUpdate,
  getSystemStatus,
  getHealth,
};

export default apiService;
