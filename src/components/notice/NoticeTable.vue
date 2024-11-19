<script setup></script>

<template>
  <!-- header -->
  <div class="noticeTable">
    <div class="tableHeader">
      <div class="tableHeader_number">글번호</div>
      <div class="tableHeader_title">제목</div>
      <div class="tableHeader_content">내용</div>
      <div></div>
    </div>

    <!-- content -->
    <div class="tableContent">
      <div class="tableContent_number">1</div>
      <div class="tableContent_title">제목 test</div>
      <div class="tableContent_content">내용 test</div>
    </div>
  </div>
</template>

<style scoped>
.noticeTable {
  width: 100%;
}
.tableContent {
  width: 100%;
  font-size: 20px;
  display: flex;
  align-items: center;
  padding-left: 50px;
  height: 50px;
  box-sizing: border-box;
}
.tableContent_number {
  width: 30%;
}
.tableContent_title {
  width: 40%;
}
.tableContent_content {
  width: 30%;
}

.tableHeader {
  width: 100%;
  padding-left: 50px;
  box-sizing: border-box;
  background-color: #3ebeee;
  display: flex;
  border-radius: 10px;
  align-items: center;
  height: 50px;
  font-size: 20px;
}

.tableHeader_number {
  width: 30%;
}
.tableHeader_title {
  width: 40%;
}
.tableHeader_content {
  width: 30%;
}
</style>
