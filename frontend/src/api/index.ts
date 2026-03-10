import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

interface ApiConfig {
  baseURL: string
  headers: {
    'Content-Type': string
  }
}

// Criar instância de axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
} as ApiConfig)

// Adicionar token em headers se existir
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('portfolio_auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ===== PROJECTS API =====
export const projectAPI = {
  getAllProjects: () => axiosInstance.get('/projects'),
  getProjectById: (id: number | string) => axiosInstance.get(`/projects/${id}`),
  createProject: (data: any) => axiosInstance.post('/projects', data),
  updateProject: (id: number | string, data: any) => axiosInstance.put(`/projects/${id}`, data),
  deleteProject: (id: number | string) => axiosInstance.delete(`/projects/${id}`),
}

// ===== CERTIFICATES API =====
export const certificateAPI = {
  listCertificates: () => axiosInstance.get('/certificates'),
  getCertificateById: (id: number | string) => axiosInstance.get(`/certificates/${id}`),
  downloadCertificate: (id: number | string) => 
    axiosInstance.get(`/certificates/${id}/download`, { responseType: 'blob' }),
  downloadCertificateUrl: (id: number | string) => 
    `${API_BASE_URL}/certificates/${id}/download`,
  uploadCertificate: (formData: FormData) => 
    axiosInstance.post('/certificates/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updateCertificate: (id: number | string, formData: FormData) =>
    axiosInstance.put(`/certificates/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteCertificate: (id: number | string) => 
    axiosInstance.delete(`/certificates/${id}`),
}

// ===== AUTHENTICATION API =====
export const authAPI = {
  authenticate: (password: string) => 
    axiosInstance.post('/auth/authenticate', { password }),
  verifyToken: () => axiosInstance.post('/auth/verify-token', {}),
}

// ===== HEALTH CHECK =====
export const healthAPI = {
  check: () => axiosInstance.get('/health'),
}

export default axiosInstance
