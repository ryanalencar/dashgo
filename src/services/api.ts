import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const _api = axios.create({
  baseURL: "http://localhost:3333/",
});
