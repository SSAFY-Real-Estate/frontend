<script setup>
import Header from "./components/header/Header.vue";
import MainView from "./views/MainView.vue";
import StartView from "./views/StartView.vue";
import BoardListView from "./views/BoardListView.vue";
import Pagination from "./components/pagination/Pagination.vue";
import BoardDetailView from "@/views/BoardDetailView.vue";
import BoardWriteView from "./views/BoardWriteView.vue";
import NoticeView from "./views/NoticeView.vue";
import SearchBar from "./components/search/SearchBar.vue";
import MapView from "./views/MapView.vue";
</script>

<!-- 1920 X 1080 해상도 기준 -->
<template>
  <div id="wrap">
    <!-- <StartView /> -->
    <Header />
    <!-- <MainView /> -->
    <!-- <BoardListView />
    <Pagination :path="'test'" :option="0" :count="30" :totalCount="100" /> -->
    <!-- <BoardDetailView /> -->
    <!-- <NoticeView /> -->
    <!-- <SearchBar /> -->
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
