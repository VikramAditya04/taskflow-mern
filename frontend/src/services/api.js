import axios from "axios";

const normalizeApiUrl = (value) => {
  if (!value) return "";

  return value.trim().replace(/\/+$/, "").replace(/\/api$/, "");
};

const rawApiUrl = import.meta.env.VITE_API_URL;
const API_URL = normalizeApiUrl(rawApiUrl) || (
  window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : window.location.origin
);

console.log("API base URL:", `${API_URL}/api`);

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  timeout: 10000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.status, error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;