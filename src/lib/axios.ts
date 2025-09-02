import { useAuthStore } from "@/stores/auth-store";
import axios from "axios";
import { refresh } from "./services/auth-service";

export const api = axios.create({
    // baseURL: "http://localhost:3000/api"
    baseURL: "https://movix-backend-qffl.onrender.com/api"
})

export const secureApi = axios.create({
    // baseURL: "http://localhost:3000/api"
    baseURL: "https://movix-backend-qffl.onrender.com/api",
    withCredentials: true
})

secureApi.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
}, (error) => Promise.reject(error))

secureApi.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error.config;
  
      if (error?.response?.status === 401 && !prevRequest._retry) {
        prevRequest._retry = true;
  
        try {
          const refreshed = await refresh();
          const newToken = refreshed.data.accessToken;
  
          useAuthStore.getState().setToken(newToken);
          prevRequest.headers.Authorization = `Bearer ${newToken}`;
  
          return secureApi(prevRequest);
        } catch (refreshedError) {
          useAuthStore.getState().setToken(null);
          return Promise.reject(refreshedError);
        }
      }
  
      return Promise.reject(error);
    }
  );
