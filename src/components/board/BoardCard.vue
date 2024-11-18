<script setup></script>

<template>
  <!-- profile -->
  <div class="BoardCard">
    <div class="profileImg">
      <div><img src="../../assets/houseLogo.png" width="50px" height="50px"/></div> 
    </div>

  <!-- content -->
    <div class="content">
      <div class="content_child">
        <div class="content_child_title"><h4>제목입니다.</h4></div>
        <div class="content_child_content">내용입니다.</div>
        <div class="content_child_date">날짜 입니다.</div>
      </div>
    </div>
  
  <!--like -->
    <div class="like">
      <div class="like_profile">
        <div class="like_profile_picture"></div>
        <div class="like_profile_by">by</div>
        <div class="like_profile_text">ssafy</div>
      </div>

      <div class="like_like">
        <div class="like_like_img"><img src="../../assets/houseLogo.png" width="10px" height="10px"></div>
        <div class="like_like_count">123</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.BoardCard {
  box-sizing: border-box;
  border-radius: 10px;
  width: 272px;
  height: 272px;
  border: 2px solid black;
}
.like{
  padding: 10px;
  box-sizing: border-box;
  height: 15%;
  display: flex;
  justify-content: space-between;

}
.like_like{
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.like_like_img{
  margin-right: 5px;
}
.like_profile{
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.like_profile_by{
  margin: 3px;
}
.like_profile_picture{
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  border: 1px solid black;;
  border-radius: 50%;
}

.content {
  padding: 5px;
  width: 100%;
  height: 40%;
  box-sizing: border-box;
  border-bottom: 2px solid black;
}
.content_child_title {
  box-sizing: border-box;
  width: 100%;
  height: 30px;
}
.content_child_content {
  box-sizing: border-box;
  width: 100%;
  height: 43px;
  font-size: 10px;
}

.content_child_date {
  display: flex;
  align-items: center;
  width: 100%;
  height: 20px;
  font-size: 8px;
}

.profileImg {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-bottom: 2px solid black;
  width: 100%;
  height: 45%;
}
</style>
