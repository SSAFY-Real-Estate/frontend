<script setup>
import { ref } from "vue";
// const router =
// const boardId = ref(router.params.);
// const boardInfo = ref({});
</script>

<template>
  <div class="boardSearch">
    <div class="title">차니핑 투자 법으로 부동산 재벌된 썰 푼다.</div>

    <div class="updateAndDate">
      <div class="updateAndDate_date">2024년 11월 19일 + 닉네임</div>

      <div class="updatgeAndDte_update">
        <button class="updatgeAndDte_update_update">수정</button>
        <button class="updatgeAndDte_update_delete">삭제</button>
      </div>
    </div>

    <div class="content">
      여기서부터 시작하는 텍스트는 의미 없는 한글입니다. 이것은 아무 뜻 없는
      텍스트입니다. 아무리 읽어도 의미가 없습니다. 사랑과 행복이 가득한 세상에
      살고 있지만, 이 문장은 그저 아무 의미 없어요. 주어진 글자는 그냥 무의미한
      글자들일 뿐, 깊은 의미는 없어요. ㅋㅋㅋㅋㅋㅋ, 이 글자는 그냥 텍스트일
      뿐이에요.
    </div>

    <div class="commentCount">9개의 댓글</div>
    <div class="comment">
      <div class="comment_pni">
        <div class="comment_profile"></div>
        <div class="comment_ni">
          <div class="comment_name">riwoo</div>
          <div class="comment_idAndDate">2024년 11월 19일</div>
        </div>
      </div>
      <div class="comment_content">난 시러핑인데 시러핑 투자법은 없나츄?</div>
    </div>

    <div class="commentWrite">
      <div class="commentWrite_input">
        <input type="text" placeholder="댓글을 작성하세요." />
      </div>
      <div class="commentWrite_button">
        <button class="commentWrite_button_button">댓글작성</button>
      </div>
    </div>
    <div class="sideBar">
      <div class="sideBarHeart">
        <div><i class="fa-solid fa-heart"></i></div>
        <div class="sideBarHeartCount">123</div>
      </div>
      <div class="sideBarComment">
        <div><i class="fa-solid fa-comment"></i></div>
        <div class="sideBarCount">123</div>
      </div>
      <div class="sideBarBookMark">
        <div><i class="fa-solid fa-bookmark"></i></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  border: none; /* 기본 테두리 제거 */
  outline: none; /* 포커스 시 기본 outline 제거 */
}
.boardSearch {
  position: relative;
  padding-top: 50px;
  width: 1200px;
  height: 100%;
}
.title {
  box-sizing: border-box;
  width: 100%;
  font-size: 50px;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
}
.commentWrite {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.commentWrite_input {
  font-size: 25px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 30px;
  width: 1050px;
  height: 75px;
  box-sizing: border-box;
  border: 1px solid black;
}
.commentWrite_button_button {
  margin-bottom: 20px;
  background-color: #3ebeee;
  width: 125px;
  height: 75px;
  font-size: 25px;
  border-radius: 10%;
  border: none;
}

.commentCount {
  margin-bottom: 20px;
  font-size: 20px;
}
.comment {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.comment_pni {
  display: flex;
  align-items: center;
}

.comment_profile {
  border: 1px solid black;
  width: 50px;
  height: 50px;
  border-radius: 50px;
}
.comment_ni {
  margin-left: 10px;
}
.comment_name {
  font-size: 20px;
}
.comment_content {
  width: 900px;
  font-size: 19px;
}

.updateAndDate {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.updateAndDate_date {
  font-size: 30px;
}

.updatgeAndDte_update {
  width: 215px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.updatgeAndDte_update_update {
  background-color: #3ebeee;
  border: none; /* 기본 테두리 제거 */
  font-size: 30px;
  width: 100px;
  height: 50px;
  border-radius: 9px;
  box-sizing: border-box;
  padding-top: 5px;
  cursor: pointer;
  transition: all 0.3s;
}
.updatgeAndDte_update_update:hover {
  opacity: 0.8;
}
.updatgeAndDte_update_delete {
  background-color: #3ebeee;
  border: none; /* 기본 테두리 제거 */
  font-size: 30px;
  width: 100px;
  height: 50px;
  border-radius: 9px;
  box-sizing: border-box;
  padding-top: 5px;
  cursor: pointer;
  transition: all 0.3s;
}
.updatgeAndDte_update_delete:hover {
  opacity: 0.8;
}
.content {
  box-sizing: border-box;
  padding-top: 30px;
  font-size: 20px;
  min-height: 500px;
}

.sideBar {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  box-shadow: inset;
  position: fixed;
  top: 30%;
  left: 10%;
  width: 80px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #ddd;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  gap: 10px;
}

.sideBarHeart {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: inset;
  box-sizing: border-box;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 24px;
  cursor: pointer;
}

.sideBarHeartCount {
  font-size: 12px;
}

.sideBarComment {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: inset;
  box-sizing: border-box;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 24px;
  cursor: pointer;
}

.sideBarCount {
  font-size: 12px;
}

.sideBarBookMark {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: inset;
  box-sizing: border-box;
  padding-top: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 24px;
  cursor: pointer;
}

.sideBarHeart:hover,
.sideBarComment:hover,
.sideBarBookMark:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>
