// config/api.ts

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://essentialux-1.onrender.com' // Tu backend en producción
  : 'http://localhost:3000';             // Backend local

export { API_BASE_URL };
