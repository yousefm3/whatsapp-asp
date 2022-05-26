import axios from "axios";

const API = "http://localhost:2980";

const request = axios.create({
  baseURL: `${API}/api`,
});

export default request;
export { API };
