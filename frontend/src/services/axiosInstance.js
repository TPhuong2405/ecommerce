import axios from "axios";

// Tạo instance riêng
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // nếu dùng cookie
});

// Gắn interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    console.log('token', token)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
