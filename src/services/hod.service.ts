import api from "@/lib/api";

export const hodService = {
  getStudents: () => api.get("/hod/students"),
  getStudentById: (id: string) => api.get(`/hod/students/${id}`),
  getRankings: () => api.get("/hod/rankings"),
  getAnalytics: () => api.get("/hod/analytics"),
  getAlerts: () => api.get("/hod/alerts"),
  getTopPerformers: () => api.get("/hod/top-performers"),
  getLowPerformers: () => api.get("/hod/low-performers"),
  getAnnouncements: () => api.get("/hod/announcements"),
  sendAnnouncement: (data: Record<string, unknown>) => api.post("/hod/announcements", data),
  deleteAnnouncement: (id: string) => api.delete(`/hod/announcements/${id}`),
};
