// src/api.js
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const projectAPI = {
  getAllProjects: () => api.get('/projects'),
  getProjectById: (id) => api.get(`/projects/${id}`),
  createProject: (data) => api.post('/projects', data),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/${id}`),
  checkHealth: () => api.get('/health'),
}

/**
 * Certificados
 * Ajuste os endpoints conforme o seu backend (ex.: /certificates).
 */
export const certificateAPI = {
  listCertificates: () => api.get('/certificates'),
  uploadCertificate: (formData) =>
    api.post('/certificates/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteCertificate: (id) => api.delete(`/certificates/${id}`),

  /**
   * Retorna uma URL direta para download/visualização.
   * Se o backend exigir auth, inclua token na querystring
   * ou troque para uma rota que faça proxy no servidor.
   */
  downloadCertificateUrl: (id) => `${API_BASE_URL}/certificates/${id}/download`,
}

export default api