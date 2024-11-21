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