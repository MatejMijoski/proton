import axios from "axios";

export const protonApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true,
});
