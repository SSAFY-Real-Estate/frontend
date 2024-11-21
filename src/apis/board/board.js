import { instance } from "@/apis/utils/instance";

function getListAll(param, success, fail) {
  instance.get("/board", { params: param }).then(success).catch(fail);
}

function getTotalPage(success, fail) {
  instance.get("/board/pagination").then(success).catch(fail);
}

function getDetail(boardId, success, fail) {
  instance.get(`/board/${boardId}`).then(success).catch(fail);
}
export { getListAll, getTotalPage };
