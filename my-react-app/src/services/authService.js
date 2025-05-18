import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; // dostosuj do backendu

export async function loginUser(credentials) {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
}
