import axios from "axios";
import getServerAddress from "@/constants/serverAddress";

export const instance = axios.create({
<<<<<<< HEAD
  baseURL: "http://" + getServerAddress(),
  headers: {
    Authorization: "Bearer " + localStorage.getItem("AccessToken"),
    "Content-Type": "application/json;charset=utf-8",
  },
});
=======
    baseURL: "http://" + getServerAddress(),
    headers: {
        Authorization: "Bearer " + localStorage.getItem("AccessToken"),
        "Content-Type": "application/json;charset=utf-8",
    },
    withCredentials: true,
})
>>>>>>> puthouse

export default instance;
