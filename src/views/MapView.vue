<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { onMounted, ref, watch } from "vue";
import { getLocation } from "@/apis/map/map.js";
const mapContainer = ref(null);

onMounted(() => {
  loadKakaoMap(mapContainer.value);
});

const loadKakaoMap = (container) => {
  const script = document.createElement("script");
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
    import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
  }`;
  document.head.appendChild(script);

  script.onload = () => {
    window.kakao.maps.load(() => {
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      const mapInstance = new window.kakao.maps.Map(container, options);
    });
  };
};

//map load
//현재 map의 중앙값
// const map = ref(); // 카카오 맵

// //남동쪽 북서쪽 좌표 범위 안에 있는 좌표들을 가져옴
// const locationList = ref([]); // 범위안 좌표

// const apiGetLocation = (location) => {
//   getLocation(
//     location,
//     ({ data }) => {
//       locationList.value = data.map((item, index) => ({
//         key: index + 1, // 고유한 key 값 추가 (1부터 시작)
//         ...item, // 기존 데이터 그대로 유지
//       }));
//       const markers = data.map(
//         ({ lat, lng }) =>
//           new kakao.maps.Marker({
//             position: new kakao.maps.LatLng(lat, lng),
//           })
//       );

//       clusterer.addMarkers(markers);
//       console.log(clusterList);
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
// };
</script>

<template>
  <div ref="mapContainer" style="width: 500px; height: 500px"></div>
</template>
<style scoped></style>
