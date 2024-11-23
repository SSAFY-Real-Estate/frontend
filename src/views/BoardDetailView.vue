<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getDetail,
  getComment,
  writeComment,
  delComment,
  writeLike,
  getLike,
  delLike,
  delBookMark,
  writeBookMark,
  getBookMark
} from "@/apis/board/board";
const route = useRoute();
const router = useRouter();
const { boardId } = route.params;

const boardInfo = ref({}); // 게시판 데이터
const commentInfo = ref([]); // 댓글 데이터
const likeInfo = ref([]); // 좋아요 데이터
const bookMarkInfo = ref([])

const initFalg = ref(false);
const isLike = ref(false); // 좋아요 눌렀는지 여부
const isBookMark = ref(false); // 북마크 눌러놨는지 여부
const content = ref("");
const flag = ref(false); // 댓글 작성 성공 여부
const delFlag = ref(false); // 게시판 삭제 성공여부
const likeFlag = ref(false); // 좋아요 등록 성공여부
const delLikeFlag = ref(false); // 좋아요 삭제 성공여부
const bookMarkFlag = ref(false); // 북마크 등록 성공여부
const delBookMarkFlag = ref(false); // 북마크 삭제 성공 여부
const getBookMarkFlag = ref(false); // 북마크 조회 성공 여부

const tmpUserId = ref(1); // userId 임시데이터

//comment parameter
const param = ref({
  boardId: 0,
  userId: 1,
  content: "",
});

// like parameter
const likeParam = ref({
  userId: tmpUserId.value,
});

// bookmark parameter
const bookMarkParam = ref({
  userId: tmpUserId.value
})
// axios
// 북마크 등록
const bookMark = () => {
  writeBookMark(
    boardId,
    bookMarkParam.value,
    ({ data }) => {
      bookMarkFlag.value = data;
    },
    (error) => {
      console.log(error);
    }
  )
}

// 북마크 취소
const dBookMark = () => {
  delBookMark(
    boardId,
    bookMarkParam.value,
    ({ data }) => {
      delBookMarkFlag.value = data;
    },
    (error) => {
      console.log(error);
    }
  )
}

// 북마크 조회
const gBookMark = () => {
  getBookMark(
    boardId,
    ({ data }) => {
      bookMarkInfo.value = data;
      getBookMarkFlag.value = true;
    }
    ,
    (error) => {
      console.log(error);
    }
  )
}
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

// 좋아요 조회
const gLike = () => {
  getLike(
    boardId,
    ({ data }) => {
      likeInfo.value = data;
      initFalg.value = true
    },
    (error) => {
      console.log(error);
    }
  );
};
// 좋아요 삭제
const dLike = () => {
  delLike(
    boardId,
    likeParam.value,
    ({ data }) => {
      delLikeFlag.value = data;
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
const eventLike = () => {
  if (isLike.value === false) {
    isLike.value = !isLike.value;
    // 좋아요 등록
    likeFlag.value = like();
  }
  else {
    // 좋아요 취소
    isLike.value = !isLike.value;
    delLikeFlag.value = dLike();
  }
}
watch(delLikeFlag, () => {
  if (delLikeFlag.value === true) gLike();
  delLikeFlag.value = false;
})

watch(likeFlag, () => {
  if (likeFlag.value === true) gLike();
  likeFlag.value = false;
}
);
const eventBookMark = () => {
  if (isBookMark.value === false)
  {
    isBookMark.value = !isBookMark.value;
    bookMark();
  }
  else {
    isBookMark.value = !isBookMark.value;
    dBookMark();
  }
}

// 처음에 현재 유저가 좋아요 눌렀는지 안눌렀는지 확인
const initLike = () => {
  for (let item of likeInfo.value) {
    if (tmpUserId.value == item.userId) {
        isLike.value = true;
        break;
      }
  }
}
const initBookMark = () => {
  console.log(bookMarkInfo.value.length)
  for (let item of bookMarkInfo.value) {
    if (tmpUserId.value === item.userId) {
      isBookMark.value = true;
      break;
    }
  }
}

onMounted(() => {
  detail();
  comment();
  gLike();
  gBookMark();
});
watch(initFalg, () => {
  if(initFalg.value === true) initLike();
})
watch(getBookMarkFlag, () => {
  if (getBookMarkFlag.value === true) initBookMark();
})
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
      <div class="sideBarHeart" :class="{ 'sideBarHeart':!isLike,'sideBarHeart_like':isLike }" @click="eventLike">
        <div><i class="fa-solid fa-heart"></i></div>
        <div class="sideBarHeartCount">{{likeInfo.length }}</div>
      </div>

      <div class="sideBarComment">
        <div><i class="fa-solid fa-comment"></i></div>
        <div class="sideBarCount">{{ commentInfo.length }}</div>
      </div>
      <div class="sideBarBookMark" :class="{'sideBarBookMark': !isBookMark, 'sideBarBookMark_on':isBookMark}" @click="eventBookMark">
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
.sideBarHeart_like{
  color :red;
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
.sideBarBookMark_on{
  color: red;
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
