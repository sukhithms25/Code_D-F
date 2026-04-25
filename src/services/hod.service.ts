import api from "@/lib/api";

export const hodService = {
  getStudents: () => api.get("/hod/students"),
  getRankings: () => api.get("/hod/rankings"),
  getAnalytics: () => api.get("/hod/analytics"),
  getAlerts: () => api.get("/hod/alerts"),
  sendAnnouncement: (data: Record<string, unknown>) => api.post("/hod/announcements", data),
};
