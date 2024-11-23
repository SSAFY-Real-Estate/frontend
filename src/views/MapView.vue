<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { onMounted, ref, watch, onBeforeMount } from "vue";
import { getLocation } from "@/apis/map/map";

const corInfo = ref(); // 좌표 data
const map = ref();
const location = ref({
  // getLocation parameter
  swLat: 28.814718216888917,
  swLng: 119.87472617492291,
  neLat: 37.66096638568398,
  neLng: 133.95703806681934,
});

const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  console.log("map");
};

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
onBeforeMount(() => {
  gLoction();
  console.log(corInfo.value);
});
</script>

<template>
  <button @click="getInfo">누르세요</button>
  <KakaoMap
    :lat="33.450701"
    :lng="126.57066"
    :markerCluster="{
      markers: corInfo,
    }"
    :level="14"
    @onLoadKakaoMap="onLoadKakaoMap"
  />
</template>
<style scoped></style>
