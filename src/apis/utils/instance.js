import axios from "axios";
import getServerAddress from "@/constants/serverAddress";

export const instance = axios.create({
<<<<<<< HEAD
    baseURL: "http://" + getServerAddress(),
    headers: {
        Authorization: "Bearer " + localStorage.getItem("AccessToken")
    }
})
=======
  baseURL: "http://" + getServerAddress(),
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});
>>>>>>> map

export default instance;
