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