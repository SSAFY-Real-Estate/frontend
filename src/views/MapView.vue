<script setup>
import { KakaoMap, KakaoMapMarker,KakaoMapCustomOverlay } from "vue3-kakao-maps";
import { onMounted, ref, watch, onBeforeMount } from "vue";
import { isKakaoMapApiLoaded } from 'vue3-kakao-maps/@utils';
import { getLocation,getDoLocation } from "@/apis/map/map";
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
// 모든 아파트
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

// 도 좌표
const gDoLocation = () => {
  getDoLocation(
    location.value,
    ({ data }) => {
      corInfo.value = data;
      console("잘들어왔습니다.")
    },
    (error) =>{
      console.log(error);
    }
  )
}
const onLoadKakaoMap = (mapRef) => {
  map.value = mapRef;
  console.log("map");
};

const getInfo = () => {
  if (map.value) {
    console.log("지도정보를 가져옵니다.")
    const bounds = map.value.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();
    location.value.swLat = swLatLng.getLat();
    location.value.swLng = swLatLng.getLng();
    location.value.neLat = neLatLng.getLat();
    location.value.neLng = neLatLng.getLng();
  }
}

watch(map, () => {
  let level = map.value.getLevel();
  if (map.value && isKakaoMapApiLoaded.value) {
    kakao.maps.event.addListener(map.value, "dragend", () => {
      if (level <= 10 && level >= 5) {
        getInfo();
        gDoLocation();
      }
      else {
        getInfo();
        gLoction();
      }
    });

    kakao.maps.event.addListener(map.value, "zoom_changed", () => {
      level = map.value.getLevel(); // 변경된 줌 레벨 가져오기
      if (level <= 10 && level >= 5) {
        getInfo();
        gDoLocation();
      } 
      else {
        getInfo();
        gLoction();
      }
      console.log(`지도 줌 레벨이 변경되었습니다: ${level}`);
    });
  }
});

// 동적 html
const dynamicHtml = (info) => {
  if (info.className === "do") return `${info.name || 'Marker'}`
  else return `<div>실험을 해봅시다.</div>`
}

</script>
<template>
  <button @click="getInfo">누르세요</button>
  <KakaoMap
    width="1050px"
    height="550px"
    :lat="37.5642135"
    :lng="127.0016985"
    :level="10"
    @onLoadKakaoMap="onLoadKakaoMap"
  >
  <KakaoMapCustomOverlay
      v-for="(info, index) in corInfo"
      :key="index"
      :lat="info.lat"
      :lng="info.lng"
      :content="`<div class='${info.className}'>${dynamicHtml(info)}</div>`"
    />

</KakaoMap>
  <div>{{corInfo}}</div>
</template>
<style>
.do {
  width: 110px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:  #3ebeee;
  color: white;
  border-radius: 9px;
}

.apt{
  width: 110px;
  height: 30px;
}
</style>
