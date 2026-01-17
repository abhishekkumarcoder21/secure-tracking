'use client';

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { LoginResponse, Task, TaskEvent, AuditLog, User, CreateTaskDto } from '@/types';

// Backend base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log('API BASE URL:', API_BASE_URL);

// Hardcoded device_id for Admin CMS
const ADMIN_DEVICE_ID = 'admin-web-001';

// Axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================
// REQUEST INTERCEPTOR
// ============================
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ============================
// RESPONSE INTERCEPTOR
// ============================
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================
// AUTH API
// ============================
export const authApi = {
  login: async (phone: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', {
      phone,
      device_id: ADMIN_DEVICE_ID,
    });
    return response.data;
  },
};

// ============================
// USERS API
// ============================
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/admin/users');
    return response.data;
  },
};

// ============================
// TASKS API
// ============================
export const tasksApi = {
  getAll: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/admin/tasks');
    return response.data;
  },

  getById: async (taskId: string): Promise<Task> => {
    const response = await api.get<Task>(`/admin/tasks/${taskId}`);
    return response.data;
  },

  getTaskEvents: async (taskId: string): Promise<TaskEvent[]> => {
    const response = await api.get<TaskEvent[]>(
      `/admin/tasks/${taskId}/events`
    );
    return response.data;
  },

  create: async (data: CreateTaskDto): Promise<Task> => {
    const response = await api.post<Task>('/admin/tasks', data);
    return response.data;
  },
};

// ============================
// AUDIT LOGS API
// ============================
export const auditLogsApi = {
  getAll: async (limit = 100, offset = 0): Promise<AuditLog[]> => {
    const response = await api.get<AuditLog[]>('/admin/audit-logs', {
      params: { limit, offset },
    });
    return response.data;
  },
};

export default api;
