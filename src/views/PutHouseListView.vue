<script setup>
import { listAllApi, paginationApi } from "@/apis/puthouse/puthouse";
import BoardCard from "@/components/board/BoardCard.vue";
import Pagination from "@/components/pagination/Pagination.vue";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const putHouseInfo = ref([]);

const totalCount = ref(0);

const page = ref(1);
const option = ref(0);

const handleOptionChange = () => {
  prevOption.value = option.value;
  option.value = option.value === 0 ? 1 : 0;
};

const listAll = async() => {
  try {
    const response = await listAllApi(page.value, option.value);
    putHouseInfo.value = response;
  } catch (error) {
    alert('오류가 발생하였습니다. 해당 서비스를 다시 이용해주세요.');
  }
}

watch([page], () => {
  console.log(page.value);
})

watch([option], () => {
  console.log(option.value);
})

watch(
  () => router.currentRoute.value.query.page,
  (newValue) => {
    page.value = router.currentRoute.value.query.page;
    listAll(); 
  },
  { deep: true }
);

watch(
  () => router.currentRoute.value.query.option,
  (newValue) => {
    option.value = router.currentRoute.value.query.option;
    listAll(); 
  },
  { deep: true }
);

const listPagination = async() => {
  try {
    const response = await paginationApi();
    totalCount.value = response;
  } catch (error) {
    console.log(error)
    alert('오류가 발생하였습니다. 해당 서비스를 다시 이용해주세요.');
  }
}

const trendingClick = () => {
  page.value = 1;
  option.value = 1;
  router.push({query : {page: page.value, option: option.value}});
}

const descClick = () => {
  page.value = 1;
  option.value = 0;
  router.push({query : {page: page.value, option: option.value}});
}

onMounted(() => {
    listAll();
    listPagination();
})

</script>

<template>
  <div class="BoardListView">
    <!-- tool bar -->
    <div class="tools">
      <div class="tools_tranding_latest">
        <div class="tools_trending" @click="trendingClick">
          <div class="tools_trending_child">
            <img
              class="tools_trending_child_img"
              src="../assets/trendingLogo.png"
              alt="trendingLogo"
            />
          </div>
          <div class="tools_trending_child_text">트랜딩</div>
        </div>

        <div class="tools_latest" @click="descClick" >
          <div class="tools_latest_child">
            <img
              class="tools_latest_child_img"
              src="../assets/timeDescLogo.png"
              alt="timeDescLogo"
            />
          </div>
          <div class="tools_latest_child_text">최신</div>
        </div>
      </div>

      <div class="tools_search_write">
        <div class="search">
          <!-- <div class="search_child"> -->
            <!-- <img class="search_child_img" src="../assets/timeDescLogo.png" /> -->
            <i class="fa-solid fa-magnifying-glass search_child_img"></i>
          <!-- </div> -->
        </div>

        <div class="write" @click="router.push({name : 'puthousePosts'})">
          <!-- <div class="write_child"> -->
            <img class="write_child_img" src="../assets/writeLogo.png" />
          <!-- </div> -->
        </div>
      </div>
    </div>
    <!-- board list -->
    <div class="boardList">
      <BoardCard 
      v-for="item in putHouseInfo" 
      :key="item.putHouseId" 
      :item="item" 
      @click="router.push({ name: 'puthouseDetail', params: { puthouseid: item.putHouseId, item: item }})"
      />
    </div>
    <Pagination :count=15 :page="page" :option="option" :totalCount="totalCount" :path="'/puthouse'"/>
    <!-- page bar -->
    <div></div>
  </div>
</template>

<style scoped>
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
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
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
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
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
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
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
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
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
.tools_trending:hover { /* 해당 요소에 마우스를 올렸을때 적용할 CSS :hover */
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

/* 간격 조절 */
</style>

