<script setup></script>

<template>
  <div class="searchBar">
    <div class="searchBar_img">
      <img src="../../assets/apartLogo.png" width="30px" height="30px" />
    </div>
    <div class="searchBar_input"><input type="text" /></div>
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
  border: 2px solid black;
  padding: 20px;
}
.searchBar_img {
  margin-left: 15px;
}
.searchBar_input {
  margin-left: 40px;
}
</style>
