import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (email: string, password: string, username: string) =>
    api.post('/auth/register', { email, password, username }),
  me: () => api.get('/users/me'),
}

export const portfolioApi = {
  getSummary: () => api.get('/portfolio/summary'),
  getHoldings: () => api.get('/portfolio/holdings'),
  getTrades: () => api.get('/portfolio/trades'),
}

export const pricesApi = {
  getAll: () => api.get('/prices'),
  getHistory: (symbol: string, days: number = 30) =>
    api.get(`/prices/${symbol}/history?days=${days}`),
}

export const aiApi = {
  getPredictions: () => api.get('/ai/predictions'),
  getSignals: () => api.get('/ai/signals'),
}

export const exchangeApi = {
  getKeys: () => api.get('/exchanges/keys'),
  addKey: (data: { exchange: string; api_key: string; api_secret: string }) =>
    api.post('/exchanges/keys', data),
  deleteKey: (id: string) => api.delete(`/exchanges/keys/${id}`),
  syncBalances: () => api.post('/exchanges/sync'),
}
