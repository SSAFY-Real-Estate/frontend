<script setup>
import BoardCard from "@/components/board/BoardCard.vue";
</script>

<template>
  <div class="BoardListView">
    <!-- tool bar -->
    <div class="tools">
      <div class="tools_tranding_latest">
        <div class="tools_trending">
          <div class="tools_trending_child">
            <img
              class="tools_trending_child_img"
              src="../assets/trendingLogo.png"
            />
          </div>
          <div class="tools_trending_child_text">트랜딩</div>
        </div>

        <div class="tools_latest">
          <div class="tools_latest_child">
            <img
              class="tools_latest_child_img"
              src="../assets/timeDescLogo.png"
            />
          </div>
          <div class="tools_latest_child_text">최신</div>
        </div>
      </div>

      <div class="tools_search_write">
        <div class="search">
          <div class="search_child">
            <img class="search_child_img" src="../assets/timeDescLogo.png" />
          </div>
        </div>

        <div class="write">
          <div class="write_child">
            <img class="write_child_img" src="../assets/writeLogo.png" />
          </div>
        </div>
      </div>
    </div>
    <!-- board list -->
    <div class="boardList">
      <BoardCard></BoardCard>
      <BoardCard></BoardCard>
      <BoardCard></BoardCard>
      <BoardCard></BoardCard>
      <BoardCard></BoardCard>
      <BoardCard></BoardCard>
      <BoardCard></BoardCard>
      <BoardCard></BoardCard>
      <BoardCard></BoardCard>
    </div>
    <!-- page bar -->
    <div></div>
  </div>
</template>

<style scoped>
.BoardListView {
  width: 1400px;
}
.boardList {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  flex-direction: row;
}
.tools {
  display: flex;
  justify-content: space-between;
}

.tools_tranding_latest {
  width: 225px;
  display: flex;
  justify-content: space-between;
}

.tools_search_write {
  display: flex;
  justify-content: space-between;
}
/* img 설정 */
.tools_trending_child_img {
  width: 70px;
  height: 40px;
}
.tools_latest_child_img {
  width: 40px;
  height: 40px;
}
.search_child_img {
  margin-right: 20px;
  width: 40px;
  height: 40px;
}
.write_child_img {
  width: 40px;
  height: 40px;
}
.tools_trending_child_text {
  margin-left: 10px;
}
.tools_trending {
  display: flex;
  align-items: center;
}

.tools_latest {
  display: flex;
  align-items: center;
}
.tools_latest_child_text {
  margin-left: 10px;
}

/* 간격 조절 */
</style>
