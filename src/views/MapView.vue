<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";

// map load
const coordinate = {
  lat: 33.450701,
  lng: 126.570667,
};
</script>

<template>
  <div>
    <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true">
      <KakaoMapMarker
        :lat="coordinate.lat"
        :lng="coordinate.lng"
      ></KakaoMapMarker>
    </KakaoMap>
  </div>
</template>
<style scoped></style>
