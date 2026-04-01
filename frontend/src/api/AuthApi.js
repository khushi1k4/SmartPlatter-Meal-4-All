import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const loginUser = (data) => API.post("/auth/login", data);
export const signupUser = (data) => API.post("/auth/signup", data);

export const submitDailyMeal = (payload) => API.post("/nutrition/daily", payload);
export const getDailyNutrition = () => API.get("/nutrition/daily");
export const getWeeklyData = () => API.get("/nutrition/weekly");
export const getMonthlyData = () => API.get("/nutrition/monthly");

export default API;