import instance from "../utils/instance"

export const getMyInfoApi = async(userId) => {
    const response = await instance.get(`/my/${userId}`);
    return response.data;
}

export const checkNicknameCheckApi = async(nickname) => {
    const response = await instance.get(`my/nicknamecheck/${nickname}`);
    return response.data;
}

export const updateInfoApi = async(data) => {
    const response = await instance.put(`my/`, data);
    return response.data;
}