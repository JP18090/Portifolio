const RENDER_BACKEND_URL = 'https://portifolio-1znw.onrender.com/api';
const LOCAL_API_URL = '/api';

function getApiBaseUrl(): string {
  // 1. Variável de ambiente (build-time)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // 2. Se está rodando no Render (frontend), apontar para o backend do Render
  if (typeof window !== 'undefined' && window.location.hostname.includes('onrender.com')) {
    return RENDER_BACKEND_URL;
  }
  // 3. Local dev (usa proxy do Vite)
  return LOCAL_API_URL;
}

export const API_BASE_URL = getApiBaseUrl();
