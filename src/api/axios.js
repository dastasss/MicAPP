// axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3001',  // Para emulador Android
  timeout: 5000,
});

export default api;
