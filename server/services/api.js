// services/api.js
const API_BASE_URL = 'http://localhost:3000';

class ApiService {
  // Helper method for making API requests
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Analytics endpoints
  async getDashboardStats() {
    return this.request('/analytics/dashboard-stats');
  }

  async getUsageAnalytics(months = 12) {
    return this.request(`/analytics/usage-analytics?months=${months}`);
  }

  async getStationPerformance() {
    return this.request('/analytics/station-performance');
  }

  async getPeakUsageAnalysis() {
    return this.request('/analytics/peak-usage');
  }

  async getRevenueTrends() {
    return this.request('/analytics/revenue-trends');
  }

  // Usage logs endpoints
  async getAllUsageLogs() {
    return this.request('/usage-logs');
  }

  async getUsageLogById(id) {
    return this.request(`/usage-logs/${id}`);
  }

  async createUsageLog(data) {
    return this.request('/usage-logs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateUsageLog(id, data) {
    return this.request(`/usage-logs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteUsageLog(id) {
    return this.request(`/usage-logs/${id}`, {
      method: 'DELETE',
    });
  }

  // Station endpoints
  async getAllStations() {
    return this.request('/station');
  }

  async getStationById(id) {
    return this.request(`/station/${id}`);
  }

  // Auth endpoints
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Utility methods
  setAuthToken(token) {
    localStorage.setItem('token', token);
  }

  removeAuthToken() {
    localStorage.removeItem('token');
  }

  getAuthToken() {
    return localStorage.getItem('token');
  }
}

export default new ApiService();