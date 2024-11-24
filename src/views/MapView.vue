<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { onMounted, ref, watch, onBeforeMount } from "vue";
import { getLocation } from "@/apis/map/map";
import { isKakaoMapApiLoaded } from 'vue3-kakao-maps/@utils';

const corInfo = ref([]); // 좌표 data
const map = ref();
const location = ref({
  // getLocation parameter
  swLat: 28.814718216888917,
  swLng: 119.87472617492291,
  neLat: 37.66096638568398,
  neLng: 133.95703806681934,
});

// axios
const gLoction = () => {
  getLocation(
    location.value,
    ({ data }) => {
      // 좌표 객체들을 position 배열로 묶어서 넣기
      corInfo.value = data;
    },

    (error) => {
      console.log(error);
    }
  );
};

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  console.log("map");
};

const getInfo = () => {
  if (map.value) {
    const bounds = map.value.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();
    location.value.swLat = swLatLng.getLat();
    location.value.swLng = swLatLng.getLng();
    location.value.neLat = neLatLng.getLat();
    location.value.neLng = neLatLng.getLng();
    gLoction();
  }
}

watch(map, () => {
  if (map.value && isKakaoMapApiLoaded.value) {
    kakao.maps.event.addListener(map.value, "dragend", () => {
      getInfo();
    });

    kakao.maps.event.addListener(map.value, "zoom_changed", () => {
      const level = map.value.getLevel(); // 변경된 줌 레벨 가져오기
      console.log(`지도 줌 레벨이 변경되었습니다: ${level}`);
    });
  }
});


</script>

<template>
  <button @click="getInfo">누르세요</button>
  <KakaoMap
    :lat="33.450701"
    :lng="126.57066"
    :markerList="corInfo"
    @onLoadKakaoMap="onLoadKakaoMap"
  />
  <div>{{corInfo}}</div>
</template>
<style scoped></style>
