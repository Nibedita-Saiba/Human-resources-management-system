import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend URL
});

export const getEmployees = () => API.get("/employees");
export const addEmployee = (data) => API.post("/employees", data);

export default API;
