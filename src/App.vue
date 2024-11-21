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
import test from "./views/test.vue";
</script>

<!-- 1920 X 1080 해상도 기준 -->
<template>
  <div id="wrap"></div>
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
