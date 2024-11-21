import instance from "../utils/instance";

// 방 내놓기 게시물 전체 조회(option : 0 최신순, option : 1 트렌딩)
export const listAllApi = async (page, option) => {
    const response = await instance.get('/puthouse',  {
        params: {
            page: page,
            option: option
        }
    })
    return response.data;
}

// 방 내놓기 게시물 전체 조회(페이지네이션)
export const paginationApi = async () => {
    const response = await instance.get('/puthouse/pagination');
    return response.data;
}

// 방 내놓기 게시물 상세 조회
export const putHouseDetailApi = async (puthouseid) => {
    const response = await instance.get(`/puthouse/${puthouseid}`);
    return response.data;
}

// 방 내놓기 게시물 삭제(본인 및 관리자)
export const deletePutHouseApi = async() => {

};

// 방 내놓기 게시물 수정(본인 및 관리자)


// 방 내놓기 게시물 좋아요한 사용자 정보 리스트 조회
export const likePutHouseUsersApi = async(data) => {
    const response = await instance.get('/puthouse/likeusers', data);
    return response.data;
}

// 방 내놓기 게시물 좋아요
export const likePutHouseApi = async(puthouseid, data) => {
    const response = await instance.post(`/puthouse/${puthouseid}/like`, data);
    return response.data;
}

// 방 내놓기 게시물 좋아요 취소
export const cancelLikePutHouseApi = async(puthouseid, data) => {
    const response = await instance.delete(`/puthouse/${puthouseid}/like`, data);
    return response.data;
}

// 방 내놓기 게시글 조회수 증가
export const viewLikePutHouseApi = async(puthouseid, data) => {
    const response = await instance.post(`/puthouse/${puthouseid}`, data);
    return response.data;
}

// 방 내놓기 상세 게시글 북마크 추가
export const bookmarkPutHouseApi = async(puthouseid, data) => {
    const response = await instance.post(`/puthouse/${puthouseid}/bookmark`, data);
    return response.data;
}

// 방 내놓기 상세 게시글 북마크 취소
export const cancelBookmarkPutHouseApi = async(puthouseid, data) => {
    const response = await instance.delete(`/puthouse/${puthouseid}/bookmark`, data);
}

// 방 내놓기 상세 게시글 북마크 적용중인 사용자 정보 조회
export const checkBookmarkUserApi = async(puthouseid, data) => {
    const response = await instance.get(`/puthouse/${puthouseid}/bookmark`, data);
}