<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getDetail,
  getComment,
  writeComment,
  delComment,
  writeLike,
} from "@/apis/board/board";
const route = useRoute();
const router = useRouter();
const { boardId } = route.params;
const boardInfo = ref({});
const commentInfo = ref([]);
const content = ref("");
const flag = ref(false); // 댓글 작성 성공 여부
const delFlag = ref(false); // 게시판 삭제 성공여부
const likeFlag = ref(false); // 좋아요 등록 성공여부
const likeInfo = ref([]); // 좋아요 데이터
const tmpUserId = ref(3); // userId 임시데이터
const param = ref({
  boardId: 0,
  userId: 1,
  content: "",
});
const likeParam = ref({
  userId: tmpUserId,
});
// axios
// 좋아요 등록
const like = () => {
  writeLike(
    boardId,
    likeParam.value,
    ({ data }) => {
      likeFlag.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};
const detail = () => {
  getDetail(
    boardId,
    ({ data }) => {
      boardInfo.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

const comment = () => {
  getComment(
    boardId,
    ({ data }) => {
      commentInfo.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

const wComment = () => {
  writeComment(
    boardId,
    param.value,
    ({ data }) => {
      flag.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

const dComment = () => {
  delComment(
    boardId,
    ({ data }) => {
      delFlag.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

const eventCommentHandle = (event) => {
  if (event.key == "Enter") eventComment();
};
const eventComment = () => {
  if (content.value !== "") {
    param.value.content = content.value;
    param.value.userId = 1; // 나중에 여기 실제 userId 넣어 줘야함
    param.value.boardId = boardId;
    content.value = "";
    console.log(param.value);
    wComment();
  } else {
    alert("내용을 입력하세요.");
    return;
  }
};
const eventDelete = () => {
  const result = confirm("정말 삭제하시겠습니까?");
  if (result) {
    dComment();
    alert("삭제 완료");
    router.push({
      name: "board",
    });
  } else {
    // 사용자가 "Cancel"을 클릭한 경우
    console.log("삭제 취소");
  }
};
onMounted(() => {
  detail();
  comment();
  console.log(boardId);
});

watch(flag, () => {
  if (flag.value === true) comment();
  flag.value = false;
});
</script>
<template>
  <div class="boardSearch">
    <div class="title">{{ boardInfo.title }}</div>

    <div class="updateAndDate">
      <div class="updateAndDate_date">
        {{ boardInfo.createDate }} + {{ boardInfo.Id }}
      </div>

      <div class="updatgeAndDte_update">
        <button class="updatgeAndDte_update_update">수정</button>
        <button class="updatgeAndDte_update_delete" @click="eventDelete">
          삭제
        </button>
      </div>
    </div>

    <div class="content">
      {{ boardInfo.content }}
    </div>

    <div class="commentCount">{{ commentInfo.length }} 개의 댓글</div>

    <div v-for="item in commentInfo" :key="item.commentId" class="comment">
      <div class="comment_pni">
        <div class="comment_profile"></div>
        <div class="comment_ni">
          <div class="comment_name">{{ item.nickname }}</div>
          <div class="comment_idAndDate">{{ item.createDate }}</div>
        </div>
      </div>
      <div class="comment_content">{{ item.content }}</div>
    </div>

    <div class="commentWrite">
      <div class="commentWrite_input">
        <input
          type="text"
          placeholder="댓글을 작성하세요."
          v-model="content"
          @keyup="eventCommentHandle"
        />
      </div>
      <div class="commentWrite_button">
        <button class="commentWrite_button_button" @click="eventComment">
          댓글작성
        </button>
      </div>
    </div>

    <div class="sideBar">
      <div class="sideBarHeart">
        <div><i class="fa-solid fa-heart"></i></div>
        <div class="sideBarHeartCount">{{ boardInfo.likeCount }}</div>
      </div>

      <div class="sideBarComment">
        <div><i class="fa-solid fa-comment"></i></div>
        <div class="sideBarCount">{{ boardInfo.commentCount }}</div>
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
  margin-bottom: 10px;
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
