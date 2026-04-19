import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mood tracking
export const moodAPI = {
  getMoods: (userId) => api.get(`/mood/${userId}`),
  createMood: (moodData) => api.post('/mood', moodData),
  getMoodStats: (userId) => api.get(`/mood/stats/${userId}`),
};

// Affirmations
export const affirmationAPI = {
  getAll: () => api.get('/affirmations'),
  getRandom: () => api.get('/affirmations/random'),
  getByCategory: (category) => api.get(`/affirmations/category/${category}`),
};

// Users
export const userAPI = {
  register: (userData) => api.post('/users/register', userData),
  getUser: (userId) => api.get(`/users/${userId}`),
};

export default api;