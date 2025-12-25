import axios from "axios";

const API = axios.create({
  baseURL: "https://no-limit-king-backend.onrender.com/api",
});

export default API;
