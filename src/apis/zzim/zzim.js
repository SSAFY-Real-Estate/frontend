import instance from "../utils/instance";

export const postZzim = async(data) => {
    const response = await instance.post('/zzim', data);
    return response.data;
}

export const getZzims = async(userId) => {
    const response = await instance.get(`/zzim/${userId}`);
    return response.data;
}

export const deleteZzimApi = async(lat, lng, userId) => {
    const response = await instance.delete(`/zzim/${lat}/${lng}/${userId}`);
    return response.data;
}