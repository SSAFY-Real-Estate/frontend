import instance from "../utils/instance";

export const checkPrincipalApi = async() => {
    const response = await instance.get('/principal');
    return response.data;
}