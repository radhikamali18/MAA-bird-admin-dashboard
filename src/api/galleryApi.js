import api from "@/lib/axios";

export const getGallery = async () => {
  const response = await api.get("/gallery");
  return response.data;
};

export const createGallery = async (galleryData) => {
  const response = await api.post("/gallery", galleryData);
  return response.data;
};

export const updateGallery = async (id, galleryData) => {
  const response = await api.put(`/gallery/${id}`, galleryData);
  return response.data;
};

export const deleteGallery = async (id) => {
  const response = await api.delete(`/gallery/${id}`);
  return response.data;
};