import { instance } from "@/apis/utils/instance";
import axios from "axios";

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
function getLike(boardId, success, fail) {
  instance.get(`/board/${boardId}/like`).then(success).catch(fail);
}

function getBookMark(boardId, success, fail) {
  instance
    .get(`/board/${boardId}/check`)
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

function writeLike(boardId, param, success, fail) {
  instance
    .post(`/board/${boardId}/like`, JSON.stringify(param))
    .then(success)
    .catch(fail);
}

function writeBookMark(boardId, param, success, fail) {
  instance
    .post(`board/${boardId}/bookmark`, JSON.stringify(param))
    .then(success)
    .catch(fail);
}

// delete 요청
function delComment(boardId, success, fail) {
  instance.delete(`/board/${boardId}`).then(success).catch(fail);
}

function delLike(boardId, param, success, fail) {
  instance
    .delete(`/board/${boardId}/like/${param.userId}`)
    .then(success)
    .catch(fail);
}

function delBookMark(boardId, param, success, fail) {
  instance
    .delete(`/board/${boardId}/bookmark/${param.userId}`)
    .then(success)
    .catch(fail)
  
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
  getLike,
  delLike,
  delBookMark,
  writeBookMark,
  getBookMark
};

export const writeBoardApi = async(data) => {
  const response =  await instance.post('/board/posts', data);
  return response.data;
}

export const getBoardInfo = async(boardId) => {
  const response = await instance.get(`board/${boardId}`);
  return response.data;
}

export const updateBoard = async(boardId, data) => {
  const response = await instance.put(`board/${boardId}/update`, data);
  return response.data;
}
