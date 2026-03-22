import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    console.error('API Error:', message);
    return Promise.reject(new Error(message));
  }
);

// Project APIs
export const projectAPI = {
  getAll: (page = 1, limit = 10) => 
    api.get(`/projects?page=${page}&limit=${limit}`),
  
  getById: (id: number) => 
    api.get(`/projects/${id}`),
  
  create: (data: { name: string; description?: string }) => 
    api.post('/projects', data),
  
  delete: (id: number) => 
    api.delete(`/projects/${id}`),
};

// Task APIs
export const taskAPI = {
  getByProject: (projectId: number, filters?: { status?: string; sort?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.sort) params.append('sort', filters.sort);
    const query = params.toString();
    return api.get(`/projects/${projectId}/tasks${query ? `?${query}` : ''}`);
  },
  
  create: (projectId: number, data: {
    title: string;
    description?: string;
    status?: 'todo' | 'in-progress' | 'done';
    priority?: 'low' | 'medium' | 'high';
    due_date?: string;
  }) => 
    api.post(`/projects/${projectId}/tasks`, data),
  
  update: (id: number, data: {
    title: string;
    description?: string;
    status?: 'todo' | 'in-progress' | 'done';
    priority?: 'low' | 'medium' | 'high';
    due_date?: string;
  }) => 
    api.put(`/tasks/${id}`, data),
  
  delete: (id: number) => 
    api.delete(`/tasks/${id}`),
};

export default api;
