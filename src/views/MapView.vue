<script setup>
import {
  KakaoMap,
  KakaoMapMarker,
  KakaoMapCustomOverlay,
} from "vue3-kakao-maps";
import { onMounted, ref, watch, onBeforeMount } from "vue";
import { isKakaoMapApiLoaded } from "vue3-kakao-maps/@utils";
import { getLocation, getDoLocation } from "@/apis/map/map";
import { useRouter } from "vue-router";
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
      console("잘들어왔습니다.");
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
    console.log("지도정보를 가져옵니다.");
    const bounds = map.value.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();
    location.value.swLat = swLatLng.getLat();
    location.value.swLng = swLatLng.getLng();
    location.value.neLat = neLatLng.getLat();
    location.value.neLng = neLatLng.getLng();
  }
};

watch(map, () => {
  let level = map.value.getLevel();
  if (map.value && isKakaoMapApiLoaded.value) {
    kakao.maps.event.addListener(map.value, "dragend", () => {
      if (level <= 10 && level >= 5) {
        getInfo();
        gDoLocation();
      } else {
        getInfo();
        gLoction();
      }
    });

    kakao.maps.event.addListener(map.value, "zoom_changed", () => {
      level = map.value.getLevel(); // 변경된 줌 레벨 가져오기
      if (level <= 10 && level >= 5) {
        getInfo();
        gDoLocation();
      } else {
        getInfo();
        gLoction();
      }
      console.log(`지도 줌 레벨이 변경되었습니다: ${level}`);
    });
  }
});

const focusInfo = ref({});

const handleClick = (info) => {
  console.log("Clicked on:", info);
  alert(`Clicked on ${info.name || "an apartment"}`);
  focusInfo.value = info;
};

watch(() => {
  console.log(focusInfo.value);
})

const whatIsClass = (info) => {
  if (info.className === "do") return true;
  return false;
};

const whatIsClass2 = (info) => {
  if (info.className === "apt") return true;
  return false;
};

const whatIsClass3 = (info) => {
  if (info.className === "sido") return true;
  return false;
};

const eventDo = () => {
  if (map.value) {
    const level = map.value.getLevel();
    map.value.setLevel(4);
  }
};

// 

const router = useRouter();

</script>
<template>
  <div id="mapWrap">
    <div class="mapInfo">
      <div class="buttonWrap">
        <div class="mapLogoButton" @click="router.push({name : 'map'})">
          <img src="../assets/OfficetelLogo.png" alt="">
          아파트
        </div>
        <div class="mapLogoButton" @click="router.push({name : 'map'})">
          <img src="../assets/roomLogo.png" alt="">
          원/투 룸
        </div>
        <div class="mapLogoButton" @click="router.push({name : 'map'})">
          <img src="../assets/houseLogo.png" alt="">
          주택
        </div>
        <div class="mapLogoButton" @click="router.push({name : 'map'})">
          <img src="../assets/apartLogo.png" alt="">
          오피스텔
        </div>
        <div class="mapLogoButton" @click="router.push({name : 'map'})">
          <img src="../assets/adoptationLogo.png" alt="adoptationLogo">
          분양
        </div>
      </div>
      <div class="mapInfoDetailWrap">
        <div v-if="focusInfo && focusInfo.aptName" class="focusCurrentInfo">
          <h1 class="aptName">{{ focusInfo.aptName }}</h1>
          <div class="address">{{ focusInfo.sidoName }} {{ focusInfo.gugunName }} {{ focusInfo.dongName }}</div>
          <div class="category">분류 : {{ focusInfo.className == 'apt' ? '아파트' : '' }}</div>
          <h2 class="price">{{ focusInfo.dealAmount }}억 ({{ focusInfo.pyung }}평)</h2>
          <div class="heart"><i class="fa-solid fa-heart"></i></div>
        </div>

        <div v-if="focusInfo.aptName" v-for="item in corInfo" :key="index" class="buildingInfo">
          <h1 class="aptName">{{ item.aptName }}</h1>
          <div class="address">{{ item.sidoName }} {{ item.gugunName }} {{ item.dongName }}</div>
          <div class="category">분류 : {{ item.className == 'apt' ? '아파트' : '' }}</div>
          <h2 class="price">{{ item.dealAmount }}억 ({{ item.pyung }}평)</h2>
          <div class="heart"><i class="fa-solid fa-heart"></i></div>
        </div>
      </div>
    </div>
    <KakaoMap
      width="1200px"
      height="800px"
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
      >
        <template #default>
          <div class="do" v-if="whatIsClass(info)" @click="eventDo">
            {{ info.name }}
          </div>
          <div
            class="apt_main"
            v-if="whatIsClass2(info)"
            @click="handleClick(info)"
          >
            <div class="apt_py">{{ info.pyung }}평</div>
            <div class="apt_price">{{ info.dealAmount }}억</div>
          </div>
          <div v-if="whatIsClass3"></div>
        </template>
      </KakaoMapCustomOverlay>
    </KakaoMap>
  </div>
  <div>{{ corInfo }}</div>
</template>
<style>
#mapWrap {
  display: flex;
  width: 1920px;
  justify-content: center
}

.mapInfo {
  width: 450px;
  display: flex;
  gap: 10px
}



.buttonWrap {
  /* width: 10%; */
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mapLogoButton {
  gap: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  box-shadow: inset;
  width: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 9px;
  border: 1px solid #ddd;
  cursor: pointer;
}
.mapLogoButton:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.mapLogoButton > img {
  width: 50px;
  height: 50px;
}

.mapInfoDetailWrap {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 340px;
  height: 800px;
  overflow: auto; 
  border: 1px solid #ddd;
  border-radius: 9px;
  gap: 5px;
}

.buildingInfo {
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 200px;
  gap: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  box-shadow: inset;
  border: 1px solid #ddd;
  border-radius: 9px;
  cursor: pointer;
}

.buildingInfo:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.focusCurrentInfo {
  position: relative;
  background-color: #eee;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 200px;
  gap: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  box-shadow: inset;
  /* border: 1px solid #ddd; */
  border-radius: 9px;
  cursor: pointer;
}

.heart {
  position: absolute;
  z-index: 999;
  right: 5px;
  bottom: 5px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  box-shadow: inset;
}

.heart:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}


/*  */
.do {
  width: 110px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3ebeee;
  color: white;
  border-radius: 9px;
  cursor: pointer;
}

.apt_main {
  box-sizing: border-box;
  border: 2px solid #3ebeee;
  border-radius: 5px;
  width: 50px;
  height: 50px;
  overflow: hidden;
  cursor: pointer;
}

.apt_py {
  box-sizing: border-box;
  font-size: 11px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3ebeee;
  border-bottom: #3ebeee;
  height: 50%;
}

.apt_price {
  height: 50%;
  box-sizing: border-box;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
