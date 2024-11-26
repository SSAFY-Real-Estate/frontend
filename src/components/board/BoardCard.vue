<script setup>
import { imgRegex } from '@/constants/firebaseRegex';
import { onMounted, ref, watch } from 'vue';

defineProps({ item: Object });

const regex = /^data:image\/.*$/;


</script>

<template>
  <!-- profile -->
  <div class="BoardCard">
    <div class="profileImg">
      <div>
        <img src="../../assets/houseLogo.png" width="50px" height="50px" />
      </div>
    </div>

    <!-- content -->
    <div class="content">
      <div class="content_child">
        <div class="content_child_title">
          <h4>{{ item.title }}</h4>
        </div>
        <!-- <div class="content_child_content">{{ item.content }}</div> -->
        <div class="content_child_date">
          <span>{{ item.updateDate.substring(0, 4) + '년 ' + item.updateDate.substring(5, 7) + '월 ' + item.updateDate.substring(8, 10) + '일'}} </span>
          <span>{{ item.commentCount == 0 ? '' : item.commentCount + '개의 댓글' }}</span>
        </div>
      </div>
    </div>

    <!--like -->
    <div class="like">
      <div class="like_profile">
        <div class="like_profile_picture">
          <img v-if="item.profileImgUrl" :src="item.profileImgUrl" alt="">
        </div>
        <div class="like_profile_by">by</div>
        <div class="like_profile_text">{{ item.id }}</div>
      </div>

      <div class="like_like">
        <div class="like_like_img">
          <i class="fa-solid fa-heart"></i>
        </div>
        <div class="like_like_count">{{ item.likeCount }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.BoardCard {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: inset;
  border: 1px solid #ddd;
  box-sizing: border-box;
  border-radius: 9px;
  width: 272px;
  height: 272px;
  cursor: pointer;
}
.BoardCard:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.like_profile_picture > img  {
  width: 100%;
  height: 100%;
}

.like {
  padding: 10px;
  box-sizing: border-box;
  height: 15%;
  display: flex;
  justify-content: space-between;
}
.like_like {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.like_like_img {
  color: #3ebeee;
  padding-top: 3px;
  margin-right: 10px;
}
.like_profile {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.like_profile_by {
  margin: 0px 5px;
}
.like_profile_text {
  color: #3ebeee;
}
.like_profile_picture {
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 50%;
}

.content {
  /* padding: 5px; */
  width: 100%;
  height: 40%;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
}
.content_child_title {
  padding: 5px 10px;
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  font-size: 20px;
}
.content_child_content {
  padding: 5px 10px;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 16px;
}

.content_child_date {
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 5px 10px;
  width: 100%;
  height: 10px;
  font-size: 12px;
}

.profileImg {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  width: 100%;
  height: 45%;
}

.commenCount {
  margin-left: 80px;
}
</style>