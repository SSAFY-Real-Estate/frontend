//
import { instance } from "@/apis/utils/instance";

// 범위안 좌표 가져오기
function getLocation(location, success, fail) {
  instance
    .post(`/map/location`, JSON.stringify(location))
    .then(success)
    .catch(fail);
}

export { getLocation };
