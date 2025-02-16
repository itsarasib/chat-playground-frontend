import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://1838-2405-9800-b861-c89-e0-edf7-56e4-44df.ngrok-free.app",
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
