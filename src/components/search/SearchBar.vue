<script setup>
import { ref } from "vue";
const emit = defineEmits(["search"]);
const textSearch = ref("");
const eventSearch = (event) => {
  if (event.key == "Enter") {
    emit("search", textSearch.value);
  } else return;
};
</script>
<template>
  <div class="searchBar">
    <div class="searchBar_img">
      <i class="fa-solid fa-magnifying-glass search_child_img"></i>
      <!-- <img src="../../assets/apartLogo.png" width="30px" height="30px" /> -->
    </div>
    <div class="searchBar_input">
      <input type="text" @keyup="eventSearch" v-model="textSearch" />
    </div>
  </div>
</template>

<style scoped>
input {
  border: none; /* 기본 테두리 제거 */
  outline: none; /* 포커스 시 기본 outline 제거 */
  font-size: 30px;
  width: 1050px;
}
.searchBar {
  display: flex;
  align-items: center;
  width: 1200px;
  height: 70px;
  box-sizing: border-box;
  padding-right: 50px;
  border: 1px solid #ccc;
  border-radius: 9px;
  padding: 20px;
}
.searchBar_img {
  margin-left: 15px;
  font-size: 35px;
}
.searchBar_input {
  margin-left: 40px;
}
</style>
