import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.humantic.ai/",
});

export default instance;
