<script setup>
import {
  KakaoMap,
  KakaoMapMarker,
  KakaoMapCustomOverlay,
} from "vue3-kakao-maps";
import { onMounted, ref, watch, onBeforeMount, computed } from "vue";
import { isKakaoMapApiLoaded } from "vue3-kakao-maps/@utils";
import {
  getLocation,
  getDoLocation,
  getSigungu,
  getDong,
  getSearch,
} from "@/apis/map/map";
import { useRouter } from "vue-router";
import { usePrincipalStore } from "@/stores/principal";
import { deleteZzimApi, getZzims, postZzim } from "@/apis/zzim/zzim";
import { getHomes } from "@/apis/ai/ai";
import "animate.css";
import SearchBar from "@/components/search/SearchBar.vue";
const corInfo = ref([]); // 좌표 data
const map = ref();
const pre = ref();
const word = ref("");
const searchInfo = ref([]);
const location = ref({
  // getLocation parameter
  swLat: 28.814718216888917,
  swLng: 119.87472617492291,
  neLat: 37.66096638568398,
  neLng: 133.95703806681934,
});
const isDataOn = ref(false);
// axios
//검색
const gSearch = () => {
  getSearch(
    word.value,
    ({ data }) => {
      searchInfo.value = data;
      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
};
// 시군구 좌표
const gSigunguLocation = () => {
  getSigungu(
    location.value,
    ({ data }) => {
      corInfo.value = data;
      console.log(corInfo.value);
    },
    (error) => {
      console.log(error);
    }
  );
};
// 모든 아파트
const gLoction = () => {
  getLocation(
    location.value,
    ({ data }) => {
      // 좌표 객체들을 position 배열로 묶어서 넣기
      // 받아온 데이터에 isCheck: false 추가
      corInfo.value = data.map((item) => ({
        ...item, // 기존 속성들 유지
        isCheck: false, // 새로운 속성 추가
      }));
      console.log(corInfo.value);
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
    },
    (error) => {
      console.log(error);
    }
  );
};

const gDong = () => {
  getDong(
    location.value,
    ({ data }) => {
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
    console.log("지도정보를 가져옵니다.");
    const bounds = map.value.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();
    location.value.swLat = swLatLng.getLat();
    location.value.swLng = swLatLng.getLng();
    location.value.neLat = neLatLng.getLat();
    location.value.neLng = neLatLng.getLng();
    isDataOn.value = true;
  }
};

watch(map, () => {
  let level = map.value.getLevel();
  if (map.value && isKakaoMapApiLoaded.value) {
    kakao.maps.event.addListener(map.value, "dragend", () => {
      if (level <= 9 && level >= 8) {
        getInfo();
        gDoLocation();
      } else if (level >= 6 && level <= 7) {
        getInfo();
        gSigunguLocation();
        console.log("sigungu_level");
      } else if (level >= 3 && level <= 5) {
        getInfo();
        gDong();
        console.log("dong_level");
      } else {
        getInfo();
        gLoction();
      }
    });

    kakao.maps.event.addListener(map.value, "zoom_changed", () => {
      level = map.value.getLevel(); // 변경된 줌 레벨 가져오기
      if (level <= 9 && level >= 8) {
        getInfo();
        gDoLocation();
      } else if (level >= 6 && level <= 7) {
        getInfo();
        gSigunguLocation();
        console.log("sigungu_level");
      } else if (level >= 3 && level <= 5) {
        getInfo();
        gDong();
        console.log("dong_level");
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
  focusInfo.value = info;
  info.isCheck = true;
  if (pre.value) {
    pre.value.isCheck = false;
  }
  pre.value = info;
};

watch(() => {
  console.log(focusInfo.value);
});

const whatIsClass = (info) => {
  if (info.className === "do") return true;
  return false;
};

const whatIsClass2 = (info) => {
  if (info.className === "apt") return true;
  return false;
};

const whatIsClass3 = (info) => {
  if (info.className === "sigungu") return true;
  return false;
};

const whatIsClass4 = (info) => {
  if (info.className === "dong") return true;
};

const eventDo = () => {
  if (map.value) {
    const level = map.value.getLevel();
    map.value.setLevel(7);
    map.value.setCenter(new kakao.maps.LatLng(37.5642135, 127.0016985));
  }
};

const eventDong = () => {
  if (map.value) {
    const level = map.value.getLevel();
    map.value.setLevel(2);
    map.value.setCenter(new kakao.maps.LatLng(info.lat, info.lng));
  }
};
const eventSigungu = (info) => {
  if (map.value) {
    const level = map.value.getLevel();
    map.value.setLevel(5);
    map.value.setCenter(new kakao.maps.LatLng(info.lat, info.lng));
  }
};

const LevelGuard = () => {
  if (map.value) {
    const level = map.value.getLevel();
    if (level >= 3) return false;
    return true;
  }
};
const eventBuildingInfo = (info) => {
  if (map.value) {
    map.value.panTo(new kakao.maps.LatLng(info.lat, info.lng));
    info.isCheck = true;
    if (pre.value) {
      pre.value.isCheck = false;
    }
    pre.value = info;
  }
};

const router = useRouter();

// 도경록
const principalStore = usePrincipalStore();
const user = computed(() => principalStore.user);
const zzimInfos = ref([]);

const getZzimData = async () => {
  try {
    const response = await getZzims(user.value.userId);
    console.log(response);
    zzimInfos.value = response;
  } catch (error) {}
};

const zzimTargetInfo = ref(null);

const postZzimClick = async (item) => {
  if (!user.value.userId) {
    alert("로그인 후 사용가능한 서비스입니다. 로그인해주세요");
    console.log(user);
    return;
  }
  try {
    const response = await postZzim({
      userId: user.value.userId,
      lat: item.lat,
      lng: item.lng,
      className: item.className,
      excluUseAr: item.excluUseAr,
      dealAmount: item.dealAmount,
      sidoName: item.sidoName,
      gugunName: item.gugunName,
      dongName: item.dongName,
      aptName: item.aptName,
      pyung: item.pyung,
    });
    console.log(response);
    getZzimData();
  } catch (error) {
    console.log(error);
  }
};

const deleteZzim = async (item) => {
  try {
    const response = await deleteZzimApi(item.lat, item.lng, user.value.userId);
    alert("삭제완료");
    getZzimData();
  } catch (error) {}
};

const aiButton = ref(false);
const aiAnswer = ref({});

const aiRecommend = async () => {
  try {
    const response = await getHomes(corInfo.value);
    aiAnswer.value = response.apart;
    aiButton.value = true;
  } catch (error) {}
};
watch(aiAnswer, () => {
  if (aiAnswer.value != null) {
    focusInfo.value = aiAnswer.value;
    console.log(focusInfo.value);
    if (map.value) {
      map.value.panTo(
        new kakao.maps.LatLng(aiAnswer.value.lat, aiAnswer.value.lng)
      );
      for (let info of corInfo.value) {
        if (
          info.lat === aiAnswer.value.lat &&
          info.lng === aiAnswer.value.lng
        ) {
          info.isCheck = true;
          if (pre.value) {
            pre.value.isCheck = false;
          }
          pre.value = info;
        }
      }
    }
  }
});
const eventSearch = (event) => {
  if (event.key == "Enter") {
    if (searchInfo.value != null) searchInfo.value = null;
    gSearch();
  }
};

const eventSearchInfo = (info) => {
  if (map.value) {
    map.value.setLevel(2);
    map.value.panTo(new kakao.maps.LatLng(info.lat, info.lng));
    info.isCheck = true;
    if (pre.value) {
      pre.value.isCheck = false;
    }
    pre.value = info;
  }
};
onMounted(async () => {
  getInfo();
  gDoLocation();
  principalStore.fetchUser();
  console.log(user.value);
  await getZzimData(user.value.userId);
});
const searchButton = ref(false);
// 도경록
</script>
<template>
  <div id="mapWrap">
    <div class="mapInfo">
      <div class="buttonWrap">
        <div class="search_map" @click="searchButton = !searchButton">
          <i class="fa-solid fa-magnifying-glass search_child_img"></i>
        </div>
        <div class="aiButton" @click="aiRecommend">
          <i class="fa-solid fa-robot"></i>
        </div>
        <div class="mapLogoButton" @click="router.push({ name: 'map' })">
          <img src="../assets/OfficetelLogo.png" alt="" />
          아파트
        </div>
        <div class="mapLogoButton" @click="router.push({ name: 'map' })">
          <img src="../assets/roomLogo.png" alt="" />
          원/투 룸
        </div>
        <div class="mapLogoButton" @click="router.push({ name: 'map' })">
          <img src="../assets/houseLogo.png" alt="" />
          주택
        </div>
        <div class="mapLogoButton" @click="router.push({ name: 'map' })">
          <img src="../assets/apartLogo.png" alt="" />
          오피스텔
        </div>
        <div class="mapLogoButton" @click="router.push({ name: 'map' })">
          <img src="../assets/adoptationLogo.png" alt="adoptationLogo" />
          분양
        </div>
      </div>
      <div class="searchInfoDetailWrap" v-if="searchButton">
        <div class="searchBar">
          <div class="searchBar_img">
            <i class="fa-solid fa-magnifying-glass search_child_img"></i>
            <!-- <img src="../../assets/apartLogo.png" width="30px" height="30px" /> -->
          </div>
          <div class="searchBar_input">
            <input type="text" @keyup="eventSearch" v-model="word" />
          </div>
        </div>
        <!-- search list -->
        <div
          v-for="item in searchInfo"
          :key="index"
          class="buildingInfo"
          @click="eventSearchInfo(item)"
        >
          <h1 class="aptName">{{ item.aptName }}</h1>
          <div class="address">
            {{ item.sidoName }} {{ item.gugunName }} {{ item.dongName }}
          </div>
          <div class="category">
            분류 : {{ item.className == "apt" ? "아파트" : "" }}
          </div>
          <h2 class="price">{{ item.dealAmount }}억 ({{ item.pyung }}평)</h2>
          <div
            :class="
              zzimInfos.some(
                (data) => data.lat == item.lat && data.lng == item.lng
              )
                ? 'correct'
                : ''
            "
            class="heart"
            @click="postZzimClick(item)"
          >
            <i class="fa-solid fa-heart"></i>
          </div>
        </div>
        <!-- search list -->
      </div>
      <div class="mapInfoDetailWrap" v-if="!searchButton">
        <div v-if="focusInfo && focusInfo.aptName" class="focusCurrentInfo">
          <h1 class="aptName">{{ focusInfo.aptName }}</h1>
          <div class="address">
            {{ focusInfo.sidoName }} {{ focusInfo.gugunName }}
            {{ focusInfo.dongName }}
          </div>
          <div class="category">
            분류 : {{ focusInfo.className == "apt" ? "아파트" : "" }}
          </div>
          <h2 class="price">
            {{ focusInfo.dealAmount }}억 ({{ focusInfo.pyung }}평)
          </h2>
          <div
            :class="
              zzimInfos.some(
                (data) => data.lat == focusInfo.lat && data.lng == focusInfo.lng
              )
                ? 'correct'
                : ''
            "
            @click="
              zzimInfos.some(
                (data) => data.lat == focusInfo.lat && data.lng == focusInfo.lng
              )
                ? deleteZzim(focusInfo)
                : postZzimClick(focusInfo)
            "
            class="heart"
          >
            <i class="fa-solid fa-heart"></i>
          </div>
        </div>
        <div
          v-if="LevelGuard()"
          v-for="item in corInfo"
          :key="index"
          class="buildingInfo"
          @click="eventBuildingInfo(item)"
        >
          <h1 class="aptName">{{ item.aptName }}</h1>
          <div class="address">
            {{ item.sidoName }} {{ item.gugunName }} {{ item.dongName }}
          </div>
          <div class="category">
            분류 : {{ item.className == "apt" ? "아파트" : "" }}
          </div>
          <h2 class="price">{{ item.dealAmount }}억 ({{ item.pyung }}평)</h2>
          <div
            :class="
              zzimInfos.some(
                (data) => data.lat == item.lat && data.lng == item.lng
              )
                ? 'correct'
                : ''
            "
            class="heart"
            @click="postZzimClick(item)"
          >
            <i class="fa-solid fa-heart"></i>
          </div>
        </div>
      </div>
    </div>
    <KakaoMap
      width="1200px"
      height="800px"
      :lat="37.5642135"
      :lng="127.0016985"
      :level="9"
      @onLoadKakaoMap="onLoadKakaoMap"
    >
      <KakaoMapCustomOverlay
        v-for="(info, index) in searchInfo"
        v-if="searchButton"
        :key="index"
        :lat="info.lat"
        :lng="info.lng"
      >
        <template #default>
          <div
            :class="info.isCheck ? 'apt_main_click' : 'apt_main'"
            @click="handleClick(info)"
          >
            <div
              :class="info.isCheck ? 'apt_py_click ' : 'apt_py'"
              @click="eventApt(info)"
            >
              {{ info.pyung }}평
            </div>
            <div class="apt_price">{{ info.dealAmount }}억</div>
          </div>
        </template>
      </KakaoMapCustomOverlay>
      <KakaoMapCustomOverlay
        v-for="(info, index) in corInfo"
        v-if="!searchButton"
        :key="index"
        :lat="info.lat"
        :lng="info.lng"
      >
        <template #default>
          <div class="do" v-if="whatIsClass(info)" @click="eventDo">
            {{ info.name }}
          </div>
          <div
            :class="info.isCheck ? 'apt_main_click' : 'apt_main'"
            v-if="whatIsClass2(info)"
            @click="handleClick(info)"
          >
            <div
              :class="info.isCheck ? 'apt_py_click ' : 'apt_py'"
              @click="eventApt(info)"
            >
              {{ info.pyung }}평
            </div>
            <div class="apt_price">{{ info.dealAmount }}억</div>
          </div>
          <div
            class="sigungu_main"
            v-if="whatIsClass3(info)"
            @click="eventSigungu(info)"
          >
            <div class="sigungu_name">{{ info.sigunguName }}</div>
            <div class="sigungu_avg">{{ info.average }}억</div>
          </div>

          <div
            class="sigungu_main"
            v-if="whatIsClass4(info)"
            @click="eventDong(info)"
          >
            <div class="sigungu_name">{{ info.dongName }}</div>
            <div class="sigungu_avg">{{ info.average }}억</div>
          </div>
        </template>
      </KakaoMapCustomOverlay>
    </KakaoMap>

    <div v-if="aiAnswer && aiButton" class="showAiAnswerModal">
      <div class="aiInfoDetail">
        <h1 class="aiAptName">{{ aiAnswer?.aptName }}</h1>
        <div class="aiAddress">
          {{ aiAnswer?.sidoName }} {{ aiAnswer?.gugunName }}
          {{ aiAnswer?.dongName }}
        </div>
        <div class="aiCategory">
          분류 : {{ aiAnswer?.className == "apt" ? "아파트" : "" }}
        </div>
        <h2 class="aiPrice">
          {{ aiAnswer?.dealAmount }}억 ({{ aiAnswer?.pyung }}평)
        </h2>
        <h3 class="aiReason">{{ aiAnswer?.reason }}</h3>
      </div>
      <button @click="aiAnswer = null" class="aiButtonAnswer">
        <i class="fa-solid fa-x"></i>
      </button>
    </div>
  </div>
</template>
<style scoped>
#mapWrap {
  position: relative;
  display: flex;
  width: 1920px;
  justify-content: center;
}

input {
  border: none; /* 기본 테두리 제거 */
  outline: none; /* 포커스 시 기본 outline 제거 */
  font-size: 20px;
  width: 200px;
}
.searchBar {
  display: flex;
  align-items: center;
  width: 320px;
  height: 25px;
  box-sizing: border-box;
  padding-right: 50px;
  border: 1px solid #ccc;
  border-radius: 9px;
  padding: 20px;
}
.searchBar_img {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.searchBar_input {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}
.mapInfo {
  width: 450px;
  display: flex;
  gap: 10px;
}

.buttonWrap {
  /* width: 10%; */
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mapLogoButton {
  gap: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
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
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.mapLogoButton > img {
  width: 50px;
  height: 50px;
}
.searchInfoDetailWrap {
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: inset;
  border: 1px solid #ddd;
  border-radius: 9px;
  cursor: pointer;
}

.buildingInfo:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: inset;
}

.heart:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.correct {
  color: #3ebeee;
}

/* 오버레이 css  */
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

.apt_main_click {
  box-sizing: border-box;
  border: 2px solid #3ebeee;
  border-radius: 5px;
  width: 50px;
  height: 50px;
  overflow: hidden;
  cursor: pointer;
  animation: swing; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 0.8s; /* don't forget to set a duration! */
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
.apt_py_click {
  box-sizing: border-box;
  font-size: 11px;
  color: #3ebeee;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-bottom: #3ebeee;
  height: 50%;
}

.apt_price {
  height: 50%;
  background-color: white;
  box-sizing: border-box;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sigungu_main {
  background-color: white;
  padding: 5px;
  box-sizing: border-box;
  border: 2px solid #3ebeee;
  border-radius: 5px;
  height: 50px;
  overflow: hidden;
  cursor: pointer;
}

.sigungu_name {
  height: 50%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sigungu_avg {
  height: 50%;
  font-size: 11px;
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search_map {
  width: 100px;
  height: 100px;
  cursor: pointer;
  color: #3ebeee;
  font-size: 50px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
  box-sizing: border-box;
  border-radius: 50%;
}
.aiButton {
  width: 100px;
  height: 100px;
  cursor: pointer;
  color: #3ebeee;
  font-size: 50px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
  box-sizing: border-box;
  border-radius: 50%;
}
.aiButton:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.showAiAnswerModal {
  position: absolute;
  padding: 20px;
  box-sizing: border-box;
  display: flex;

  align-items: center;

  width: 600px;
  height: 300px;
  background-color: #eee;
  top: 20%;
  left: 50%;
  z-index: 999;
  margin-left: -80px;
  border-radius: 9px;
}

.aiInfoDetail {
  position: relative;
  display: flex;
  flex-direction: column;
}

.aiReason {
  margin-top: 10px;
}

.aiButtonAnswer {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid #ddd;
  width: 50px;
  height: 50px;
  background-color: #3ebeee;
  font-size: 25px;
  color: white;
  border-radius: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.aiButtonAnswer:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>
