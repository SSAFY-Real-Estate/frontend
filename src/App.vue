<script setup>
import BoardListView from "./views/BoardListView.vue";
import StartView from "./views/StartView.vue";
</script>

<!-- 1920 X 1080 해상도 기준 -->
<template>
  <div id="wrap">
    <!-- <StartView /> -->
    <BoardListView />
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
