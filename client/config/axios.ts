import axios from "axios";

const baseUrl: string = 'http://localhost:8000';
const instance = axios.create({
    baseURL : baseUrl
})
instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );


export default instance