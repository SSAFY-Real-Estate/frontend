import axios from "axios";
import getServerAddress, { LOCAl_ADDRESS } from "@/constants/serverAddress";

export const instance = axios.create({
  baseURL: "http://" + getServerAddress(),
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

export default instance;
