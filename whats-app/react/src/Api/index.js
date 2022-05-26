import axios from "axios";

const API = "https://fd74-102-186-163-96.ngrok.io";

const request = axios.create({
  baseURL: `${API}/api`,
});

export default request;
export { API };
