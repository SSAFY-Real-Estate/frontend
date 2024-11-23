<script setup>
import Header from "./components/header/Header.vue";
import MainView from "./views/MainView.vue";
import StartView from "./views/StartView.vue";
import BoardListView from "./views/BoardListView.vue";
import Pagination from "./components/pagination/Pagination.vue";
import Editor from "./components/editor/Editor.vue";
import BoardDetailView from "@/views/BoardDetailView.vue";
import BoardWriteView from "./views/BoardWriteView.vue";
import NoticeView from "./views/NoticeView.vue";
import SearchBar from "./components/search/SearchBar.vue";
import MapView from "./views/MapView.vue";
import { useRouter } from "vue-router";
import test from "./views/test.vue";
import { computed, onMounted } from "vue";
import { jwtDecode } from "jwt-decode";

const route = useRouter();

onMounted(() => {
  const token = localStorage.getItem("AccessToken");
  // 로그인을 한 상태로 웹브라우저 종료시 토큰이 만료하기 전까지는 로그인 상태 유지
  // if(jwtDecode(token)) route.push({name : 'main'});
});
</script>

<!-- 1920 X 1080 해상도 기준 -->
<template>
  <div id="wrap">
    <Header v-if="route.currentRoute.value.path !== '/'" />
    <!-- <RouterView /> -->
    <MapView />
  </div>
</template>

<style>
#wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
