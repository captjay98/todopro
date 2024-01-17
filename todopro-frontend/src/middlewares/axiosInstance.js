import axios from 'axios'
import router from '../router'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

const token = localStorage.getItem('token')
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401 && error.config.url !== '/api/user') {
        localStorage.removeItem('token');
        router.push({ name: 'login' });
      }
      return Promise.reject(error);
    }
  );

export default axiosInstance
