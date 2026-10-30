import api from "@/lib/axios";

// Create Report
export const createReport = async (reportData) => {
  const response = await api.post("/reports", reportData);
  return response.data;
};

// Get All Reports
export const getReports = async () => {
  const response = await api.get("/reports");
  return response.data;
};

// Get Single Report
export const getReportById = async (id) => {
  const response = await api.get(`/reports/${id}`);
  return response.data;
};

// Update Report Status
export const updateReport = async (id, data) => {
  const response = await api.put(`/reports/${id}`, data);
  return response.data;
};

// Delete Report
export const deleteReport = async (id) => {
  const response = await api.delete(`/reports/${id}`);
  return response.data;
};