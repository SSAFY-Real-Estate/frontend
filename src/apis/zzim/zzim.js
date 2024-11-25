import instance from "../utils/instance";

export const postZzim = async(data) => {
    const response = await instance.post('/zzim', data);
    return response.data;
}