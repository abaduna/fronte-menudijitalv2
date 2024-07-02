import axios from "axios";
export const API = axios.create({baseURL: "http://localhost:8080/"});

API.interceptors.request.use( function(config) {
    // Haz algo antes de que la solicitud sea enviada, por ejemplo, agregar un token de autenticación
    const token = localStorage.getItem("token"); // O de donde obtengas tu token
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function(error) {
    // Manejar el error de la solicitud
    return Promise.reject(error);
  })