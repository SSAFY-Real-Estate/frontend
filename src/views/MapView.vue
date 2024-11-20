<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { ref } from "vue";
import { getLocation } from "@/apis/map/map.js";
//map load
//현재 map의 중앙값
const map = ref(); // 카카오 맵

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  const mapTypeControl = new kakao.maps.MapTypeControl();
  map.value.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
};

//남동쪽 북서쪽 좌표 범위 안에 있는 좌표들을 가져옴
const locationList = ref([]); // 범위안 좌표
const clusterList = ref([]);
const apiGetLocation = (location) => {
  getLocation(
    location,
    ({ data }) => {
      locationList.value = data.map((item, index) => ({
        key: index + 1, // 고유한 key 값 추가 (1부터 시작)
        ...item, // 기존 데이터 그대로 유지
      }));

      clusterList.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

// 남동쪽 // 북서쪽 계산
const getInfo = () => {
  if (map.value) {
    const bounds = map.value.getBounds(); // 현재 영역으로 가져옴
    const swLatLng = bounds.getSouthWest(); // 남서쪽을 가져옴
    const neLatLng = bounds.getNorthEast(); // 북서쪽을 가져옴

    const location = {
      swLat: swLatLng.getLat(),
      swLng: swLatLng.getLng(),
      neLat: neLatLng.getLat(),
      neLng: neLatLng.getLng(),
    };

    console.log(location);
    apiGetLocation(location);
    console.log(clusterList);
    //console.log(locationList);
  }
  // :level="14"
  // :markerCluster="{ markers: locationList }"
  //:markerList="locationList"
};
</script>

<template>
  <div>
    <button @click="getInfo">누르세요</button>
    <KakaoMap
      @onLoadKakaoMap="onLoadKakaoMap"
      :lat="35.14038425376898"
      :lng="129.07583449357068"
      :level="14"
      :markerCluster="{ markers: clusterList }"
    />
  </div>
</template>
<style scoped></style>
