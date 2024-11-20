import axios from "axios";
import getServerAddress, { LOCAl_ADDRESS } from "@/constants/serverAddress";

export const instance = axios.create({
    baseURL: "http://" + getServerAddress()
})

export default instance;