import axios from "axios";

// fallback helps if env variable missing during build
const BASE_URL =
  import.meta.env.VITE_API_URL || "https://meal4all-backend.onrender.com";

const API = axios.create({
  baseURL: `${BASE_URL}/api`,   // ensures /api prefix always exists
  withCredentials: true
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const loginUser = (data) => API.post("/auth/login", data);
export const signupUser = (data) => API.post("/auth/signup", data);

export const submitDailyMeal = (payload) => API.post("/nutrition/daily", payload);
export const getDailyNutrition = () => API.get("/nutrition/daily");
export const getWeeklyData = () => API.get("/nutrition/weekly");
export const getMonthlyData = () => API.get("/nutrition/monthly");

export default API;