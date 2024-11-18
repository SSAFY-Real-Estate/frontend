<script setup></script>

<template>
  <div class="BoardCard">
    <div class="profileImg">
      <!-- <div><img src="../../assets/houseLogo.png" /></div> -->
    </div>
    <div class="content">
      <div class="content_child">
        <div class="content_child_title"></div>
        <div class="content_child_content"></div>
        <div class="content_child_date"></div>
      </div>
      <div>제목</div>
      <div>내용</div>
      <div>날짜 + 댓글 수</div>
    </div>
    <div></div>
  </div>
</template>

<style scoped>
.BoardCard {
  box-sizing: border-box;
  border-radius: 15px;
  width: 272px;
  height: 272px;
  border: 1px solid black;
}

.content {
  padding: 10px;
  width: 100%;
  height: 40%;
  background-color: green;
  box-sizing: border-box;
  border-bottom: 1px solid black;
}
/* .content_child {
  margin: 3px;
  background-color: green;
  width: 100%;
  height: 100%;
} */
/* .content_child_title {
  width: 100%;
  height: 40%;
  background-color: aqua;
}
.content_child_content {
  width: 100%;
  height: 40%;
  background-color: blueviolet;
}

.content_child_date {
  width: 100%;
  height: 20%;
  background-color: blue;
} */

.profileImg {
  box-sizing: border-box;
  border-bottom: 1px solid black;
  width: 100%;
  height: 45%;
}
</style>
