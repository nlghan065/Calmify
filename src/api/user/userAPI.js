// Calmify/src/api/user/userAPI.js
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

// Helper lấy header
const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const userAPI = {
  // GET /users/me
  getMe: () => axios.get(`${BASE_URL}/users/me`, getAuthHeader()),

  // PATCH /users/me/avatar
  updateAvatar: (id, file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    return axios.patch(`${BASE_URL}/users/me/avatar`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // PATCH /users/me
  updateNickname: (id, nickname) =>
    axios.patch(`${BASE_URL}/users/me`, { nickname }, getAuthHeader()),
};
