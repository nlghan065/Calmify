import axios from "axios";

// Đảm bảo VITE_API_URL là http://localhost:5000/api
const BASE_URL = import.meta.env.VITE_API_URL;

export const exerciseAPI = {
  // GET /api/exercises/categories
  getCategories: () => axios.get(`${BASE_URL}/exercises/categories`),

  // GET /api/exercises/categories/:id
  getCategoryDetail: (id) =>
    axios.get(`${BASE_URL}/exercises/categories/${id}`),

  // GET /api/exercises/:id
  getExerciseDetail: (id) => axios.get(`${BASE_URL}/exercises/${id}`),
};
