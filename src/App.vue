<script setup>
import Header from "./components/header/Header.vue";
import MainView from "./views/MainView.vue";
import StartView from "./views/StartView.vue";
import BoardListView from "./views/BoardListView.vue";
import Pagination from "./components/pagination/Pagination.vue";
import Editor from "./components/editor/Editor.vue";
;
</script>

<!-- 1920 X 1080 해상도 기준 -->
<template>
  <div id="wrap">
    <!-- <StartView /> -->
    <!-- <Header />
    <MainView />-->
    <!-- <BoardListView /> 
    <Pagination :path="'test'" :option="0" :count="30" :totalCount="100" /> -->
    <Editor />
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
