// API service for communicating with the backend
const API_BASE_URL = 'http://localhost:4000/api';

class ApiService {
  // Helper method for making HTTP requests
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Handle 204 No Content responses
      if (response.status === 204) {
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Services API
  async getServices() {
    return this.request('/services');
  }

  async getService(id) {
    return this.request(`/services/${id}`);
  }

  async createService(service) {
    return this.request('/services', {
      method: 'POST',
      body: JSON.stringify(service),
    });
  }

  async updateService(id, updates) {
    return this.request(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteService(id) {
    return this.request(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Incidents API
  async getIncidents() {
    return this.request('/incidents');
  }

  async getIncident(id) {
    return this.request(`/incidents/${id}`);
  }

  async createIncident(incident) {
    return this.request('/incidents', {
      method: 'POST',
      body: JSON.stringify(incident),
    });
  }

  async updateIncident(id, updates) {
    return this.request(`/incidents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteIncident(id) {
    return this.request(`/incidents/${id}`, {
      method: 'DELETE',
    });
  }

  async addIncidentUpdate(incidentId, update) {
    return this.request(`/incidents/${incidentId}/updates`, {
      method: 'POST',
      body: JSON.stringify(update),
    });
  }

  // System Status API
  async getSystemStatus() {
    return this.request('/status');
  }

  // Health Check
  async getHealth() {
    return this.request('/health', { 
      headers: {} // No content-type needed for health check
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export individual methods for convenience
export const {
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
} = apiService;
