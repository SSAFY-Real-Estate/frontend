import { instance } from "@/apis/utils/instance";

// get 요청
function getListAll(param, success, fail) {
  instance.get("/board", { params: param }).then(success).catch(fail);
}

function getTotalPage(success, fail) {
  instance.get("/board/pagination").then(success).catch(fail);
}

function getDetail(boardId, success, fail) {
  instance.get(`/board/${boardId}`).then(success).catch(fail);
}

function getComment(boardId, success, fail) {
  instance.get(`/board/${boardId}/comment`).then(success).catch(fail);
}

function getSearch(param, success, fail) {
  instance
    .get(`/board/search?page=${param.page}&word=${param.word}`)
    .then(success)
    .catch(fail);
}

function getSearchTotalPage(param, success, fail) {
  instance
    .get(`/board/search/pagination?word=${param.word}`)
    .then(success)
    .catch(fail);
}

// function getSearchList()

//post 요청
function writeComment(boardId, comment, success, fail) {
  instance
    .post(`/board/${boardId}/comment`, JSON.stringify(comment))
    .then(success)
    .catch(fail);
}

function delComment(boardId, success, fail) {
  instance.delete(`/board/${boardId}`).then(success).catch(fail);
}

function writeLike(boardId, param, success, fail) {
  instance
    .post(`/board/${boardId}/like`, JSON.stringify(param))
    .then(success)
    .catch(fail);
}
export {
  getSearchTotalPage,
  getListAll,
  getTotalPage,
  getDetail,
  getComment,
  writeComment,
  delComment,
  getSearch,
  writeLike,
};
