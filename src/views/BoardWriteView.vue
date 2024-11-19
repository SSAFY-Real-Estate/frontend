<script setup></script>

<template>
  <div class="boardDetail">
    <div class="title">
      <input class="title_input" type="text" placeholder="제목을 입력하세요" />
    </div>
    <div class="content"></div>
    <div class="func"></div>
  </div>
</template>

<style scoped>
.boardDetail {
  width: 1200px;
}
.title {
  width: 100%;
  box-sizing: border-box;
  border-bottom: 2px solid black;
}
input {
  border: none; /* 기본 테두리 제거 */
  outline: none; /* 포커스 시 기본 outline 제거 */
  font-size: 50px;
}
</style>
