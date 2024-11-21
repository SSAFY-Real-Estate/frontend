import axios from "axios";
import getServerAddress from "@/constants/serverAddress";

export const instance = axios.create({
    baseURL: "http://" + getServerAddress(),
    headers: {
        Authorization: "Bearer " + localStorage.getItem("AccessToken"),
        "Content-Type": "application/json;charset=utf-8",
    },
    withCredentials: true,
})

export default instance;
