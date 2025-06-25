import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api", // Always point to backend server
});

const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:5001/api"
  : "http://localhost:5001/api"; // ✅ Still use localhost since Electron runs backend locally


export default api;
