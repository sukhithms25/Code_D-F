import api from "@/lib/api";

export const authService = {
  login: (credentials: Record<string, unknown>) => api.post("/auth/login", credentials),
  register: (data: Record<string, unknown>) => api.post("/auth/register", data),
  logout: () => api.post("/auth/logout"),
  refresh: () => api.get("/auth/refresh"),
};
