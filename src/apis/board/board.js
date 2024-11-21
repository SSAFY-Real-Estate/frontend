import { instance } from "@/apis/utils/instance";

function getListAll(param, success, fail) {
  instance.get("/board", { params: param }).then(success).catch(fail);
}
