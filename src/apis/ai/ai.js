import { instance } from "@/apis/utils/instance";

export const getHomes = async(data) => {
    const response = await instance.post('/ai/command', data);
    return response.data;
}