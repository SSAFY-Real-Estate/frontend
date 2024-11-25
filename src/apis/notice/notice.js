import instance from "../utils/instance"

export const mainNoticeList = async() => {
    const response =  await instance.get('/notice/desc');
    return response.data;
}

export const getNoticeDetail = async(noticeId) => {
    const response = await instance.get(`notice/${noticeId}`);
    return response.data;
}

export const writeNotice = async(data) => {
    const response = await instance.post('notice/post', data);
    return response.data;
}

export const deleteNotice = async(noticeId) => {
    const response = await instance.delete(`notice/${noticeId}`);
    return response.data;
}

export const updateNotice = async(noticeId, data) => {
    const response = await instance.put(`notice/${noticeId}/update`, data);
    return response.data;
}

export const getNoticeList = async(page) => {
    const response = await instance.get(`notice`, {
        params: {
            page: page,
        }
    })
    return response.data;
}

export const getNoticeListCount = async() => {
    const response = await instance.get('notice/pagination');
    return response.data;
}

export const getNoticeListSearch = async(word, page) => {
    const response = await instance.get('notice/search', {
        params: {
            word: word,
            page: page
        }
    });
    return response.data;
}

export const getNoticeCountSearch = async(word) => {
    const response = await instance.get('notice/search/pagination', {
        params: {
            word: word
        }
    });
    return response.data;
}