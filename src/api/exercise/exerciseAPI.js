import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const exerciseAPI = {
  // Lấy danh sách category
  getCategories: () => axios.get(`${BASE_URL}/exercise-categories`),

  // Lấy chi tiết 1 category kèm exercises
  getCategoryDetail: (id) => axios.get(`${BASE_URL}/exercise-categories/${id}`),

  // Lấy chi tiết 1 bài tập
  getExerciseDetail: (id) => axios.get(`${BASE_URL}/exercises/${id}`),
};
