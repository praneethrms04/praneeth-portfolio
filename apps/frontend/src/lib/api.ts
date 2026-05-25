import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const url: string = error.config?.url ?? "";
      const isAuthRoute = url.includes("/auth/login") || url.includes("/auth/register");
      if (!isAuthRoute) {
        localStorage.removeItem("token");
        if (typeof window !== "undefined") {
          const { useAuthStore } = await import("@/store/auth.store");
          const { useAuthModalStore } = await import("@/store/authModal.store");
          useAuthStore.getState().logout();
          useAuthModalStore.getState().openModal("login");
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;
