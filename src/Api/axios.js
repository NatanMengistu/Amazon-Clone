import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://amazon-api-deploy-xal3.onrender.com",
});
export { axiosInstance };
