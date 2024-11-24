import instance from "../utils/instance"

export const mainNoticeList = async() => {
    const response =  await instance.get('/notice/desc');
    return response.data;
}

export const getNoticeDetail = async(noticeId) => {
    const response = await instance.get(`notice/${noticeId}`);
    return response.data;
}