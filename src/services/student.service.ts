import api from "@/lib/api";

export const studentService = {
  getProfile: () => api.get("/student/profile"),
  getRoadmap: () => api.get("/student/roadmap"),
  getProgress: () => api.get("/student/progress"),
  getScore: () => api.get("/student/score"),
  updateProfile: (data: any) => api.put("/student/profile", data),
  uploadResume: (formData: FormData) => api.post("/student/resume", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  }),
  getRecommendations: () => api.get("/student/recommendations"),
};
