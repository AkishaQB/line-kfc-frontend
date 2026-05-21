import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data?.data || response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      // Could redirect to login
    }
    return Promise.reject(error);
  },
);

// API endpoints
export const authApi = {
  lineLogin: (code: string) => api.post('/auth/line/login', { code }),
  lineTokenLogin: (accessToken: string) => api.post('/auth/line/token-login', { accessToken }),
  adminLogin: (email: string, password: string) =>
    api.post('/auth/admin/login', { email, password }),
};

export const customerApi = {
  getMe: () => api.get('/customers/me'),
  updateMe: (data: any) => api.put('/customers/me', data),
  getPointsHistory: (page = 1) => api.get(`/customers/me/points?page=${page}`),
};

export const couponApi = {
  getMyCoupons: () => api.get('/coupons/my/active'),
  getCouponDetail: (assignmentId: string) => api.get(`/coupons/my/${assignmentId}`),
};

export const loyaltyApi = {
  getCards: () => api.get('/loyalty/cards'),
  getCardDetail: (id: string) => api.get(`/loyalty/cards/${id}`),
  getPoints: () => api.get('/loyalty/points'),
  redeemPoints: (points: number, description?: string) =>
    api.post('/loyalty/redeem', { points, description }),
  getTierInfo: () => api.get('/loyalty/tiers'),
};

export const notificationApi = {
  getNotifications: (page = 1) => api.get(`/notifications?page=${page}`),
  markAsRead: (id: string) => api.put(`/notifications/${id}/read`),
};
