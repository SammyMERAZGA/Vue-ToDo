import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

export default Axios;