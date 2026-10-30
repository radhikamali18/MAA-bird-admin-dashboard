import api from "@/lib/axios";

export const getVolunteers = async () => {
  const response = await api.get("/volunteers");
  return response.data;
};