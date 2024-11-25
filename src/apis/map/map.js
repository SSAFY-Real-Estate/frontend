//
import { instance } from "@/apis/utils/instance";

// 범위안 좌표 가져오기
function getLocation(param, success, fail) {
  instance
    .post(`/map/location`, JSON.stringify(param))
    .then(success)
    .catch(fail);
}

//범위안 도 좌표
function getDoLocation(param, success, fail) {
  instance
    .post(`/map/cluster`, JSON.stringify(param))
    .then(success)
    .catch(fail);
}

export { getLocation,getDoLocation };
