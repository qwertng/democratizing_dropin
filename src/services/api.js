import axios from 'axios';

// Use relative paths for Next.js API routes
const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registrationService = {
  // Create a new registration
  async createRegistration(registrationData) {
    try {
      const response = await api.post('/registrations', registrationData);
      return response.data;
    } catch (error) {
      console.error('Error creating registration:', error);
      throw error;
    }
  },

  // Get registration by phone number
  async getRegistrationByPhone(phone) {
    try {
      const response = await api.get(`/registrations/phone/${phone}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching registration:', error);
      throw error;
    }
  },

  // Update registration
  async updateRegistration(id, updateData) {
    try {
      const response = await api.put(`/registrations/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating registration:', error);
      throw error;
    }
  },

  // Cancel registration
  async cancelRegistration(id) {
    try {
      const response = await api.put(`/registrations/${id}`, { cancelled: true });
      return response.data;
    } catch (error) {
      console.error('Error cancelling registration:', error);
      throw error;
    }
  },

  // Get all active registrations
  async getAllRegistrations() {
    try {
      const response = await api.get('/registrations');
      return response.data;
    } catch (error) {
      console.error('Error fetching registrations:', error);
      throw error;
    }
  },
};

export default api;
