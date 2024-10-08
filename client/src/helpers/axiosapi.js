// src/api.js
import axios from "axios";

const API_URL = "http://localhost:8081/api";

const axiosapi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default axiosapi;
