import axios from "axios";
import getServerAddress from "@/constants/serverAddress";

export const instance = axios.create({
    baseURL: "http://" + getServerAddress()
})

export default instance;