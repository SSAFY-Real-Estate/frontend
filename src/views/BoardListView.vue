<script setup>
import BoardCard from "@/components/board/BoardCard.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  getListAll,
  getTotalPage,
  getSearch,
  getSearchTotalPage,
} from "@/apis/board/board";
import Pagination2 from "@/components/pagination/Pagination2.vue";
import SearchBar from "@/components/search/SearchBar.vue";
const router = useRouter(); // 라우터 객체 생성
const boardInfo = ref([]); // 받아온 데이터
const currentPage = ref(1); // 현재 페이지
const currentOption = ref(0); // 현재 옵션
const totalPageCount = ref(0); // 데이터 총 개수
const onePageCout = ref(15); // 받아올 페이지
const word = ref(""); // 검색이 된 상태인지 아닌지.

const searchButton = ref(false);

const param = ref({
  page: currentPage.value,
  option: currentOption.value,
});

const searchParm = ref({
  page: 1,
  option: 0,
  word: "",
});

const listAll = () => {
  getListAll(
    param.value,
    ({ data }) => {
      console.log(data);
      boardInfo.value = data;
    },

    (error) => {
      console.log("Error Status:", error.response.status); // 401
      console.log("Error Data:", error.response.data); // 에러 메시지 확인
      console.log("Error Message:", error.message);
    }
  );
};

const searchListAll = () => {
  getSearch(
    searchParm.value,
    ({ data }) => {
      boardInfo.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

const totalPage = () => {
  getTotalPage(
    ({ data }) => {
      totalPageCount.value = data;
    },

    (error) => {
      console.log(error);
    }
  );
};

const searchTotalPage = () => {
  getSearchTotalPage(
    searchParm.value,
    ({ data }) => {
      console.log(data);
      totalPageCount.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

const trending = () => {
  if (currentOption.value === 0) currentOption.value = 1;
  else currentOption.value = 0;
  currentPage.value = 1;
  param.value.option = currentOption.value;
  param.value.page = 1;
  listAll();
};

const onPageChange = (val) => {
  if (word.value === "") {
    currentPage.value = val;
    param.value.page = val;
    param.value.option = currentOption.value;
    word.value = "";
    listAll();
  } else {
    currentPage.value = val;
    searchParm.value.page = val;
    searchParm.value.word = word;
    searchListAll();
  }
};

const moveDetail = (val) => {
  router.push({
    name: "detail",
    params: {
      boardId: val,
    },
  });
};

const eventSearch = (eventWord) => {
  word.value = eventWord;
  searchParm.value.word = word.value;
  searchTotalPage();
  onPageChange(1);
};

onMounted(() => {
  totalPage();
  listAll();
  // console.log(boardInfo);
});
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
              alt="trendingLogo"
            />
          </div>
          <div :class="param.option == 1 ? 'textActive' : ''" class="tools_trending_child_text" @click="trending()">
            트랜딩
          </div>
        </div>

        <div class="tools_latest">
          <div class="tools_latest_child">
            <img
              class="tools_latest_child_img"
              src="../assets/timeDescLogo.png"
              alt="timeDescLogo"
            />
          </div>
          <div :class="param.option == 0 ? 'textActive' : ''" class="tools_latest_child_text" @click="trending()">최신</div>
        </div>
      </div>

      <div class="tools_search_write">
        <div class="search" @click="searchButton = !searchButton">
          <!-- <div class="search_child"> -->
          <!-- <img class="search_child_img" src="../assets/timeDescLogo.png" /> -->
          <i class="fa-solid fa-magnifying-glass search_child_img"></i>
          <!-- </div> -->
        </div>

        <div class="write" @click="router.push({name : 'boardWrite'})">
          <!-- <div class="write_child"> -->
          <img class="write_child_img" src="../assets/writeLogo.png" />
          <!-- </div> -->
        </div>
      </div>
    </div>
    <!--search bar-->
    <div v-if="searchButton">
      <div class="searchBar">
      <SearchBar @search="eventSearch" />
      </div>
      <div class="searchBar_number">
        총 {{ totalPageCount }}개의 포스트를 찾았습니다.
      </div>
    </div>
    
    <!-- board list -->
    <div class="boardList">
      <BoardCard
        v-for="item in boardInfo"
        :key="item.boardId"
        :item="item"
        @click="moveDetail(item.boardId)"
      >
      </BoardCard>
    </div>
    <!-- page bar -->
    <div>
      <Pagination2
        :option="currentOption"
        :count="onePageCout"
        :totalCount="totalPageCount"
        :currentPage="currentPage"
        @pageChange="onPageChange"
      />
    </div>
  </div>
</template>

<style scoped>
.searchBar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.searchBar_number {
  margin-left: 100px;
  font-size: 30px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.BoardListView {
  /* header 적용시 너무 붙어 있어서 띄우기 */
  /* padding-top: 20px; */
  width: 1400px;
}
.boardList {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  flex-direction: row;
  padding-top: 10px;
}
.tools {
  display: flex;
  justify-content: space-between;
}

.tools_tranding_latest {
  width: 300px;
  display: flex;
  justify-content: space-between;
}

.tools_search_write {
  display: flex;
  justify-content: space-between;
}
.search {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: inset;
  width: 50px;
  border: 1px solid #ddd;
  border-radius: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
}
.search:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
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
  width: 40px;
  height: 40px;
  /* color: #3EBEEE; */
}
.write {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: inset;
  transition: all 0.3s;
  width: 50px;
  border: 1px solid #ddd;
  border-radius: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.write:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.write_child_img {
  width: 40px;
  height: 40px;
}
.tools_trending_child_text {
  margin-left: 10px;
  font-size: 30px;
}
.tools_trending {
  transition: all 0.3s; /* 해당 요소에 애니메이션을 줄때 적용되는 시간(변화하는 시간 세팅) */
  display: flex;
  align-items: center;
  cursor: pointer; /* 해당 요소에 마우스 커서를 올리면 선택 커서로 바뀌는 CSS */
}
.tools_trending:hover {
  /* 해당 요소에 마우스를 올렸을때 적용할 CSS :hover */
  opacity: 0.5; /* 해당 요소에 마우스를 올리면 투명도가 0.5 로 변함 */
}
.tools_latest {
  transition: all 0.3s;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.tools_latest:hover {
  opacity: 0.5;
}
.tools_latest_child_text {
  margin-left: 10px;
  font-size: 30px;
}

.textActive {
  color: #3EBEEE;
}

/* 간격 조절 */
</style>
