<script setup>
import { usePrincipalStore } from '@/stores/principal';
import { useRoute, useRouter } from 'vue-router/dist/vue-router';
import { computed, onMounted, ref, watch } from 'vue';
import Pagination2 from '@/components/pagination/Pagination2.vue';
import { getNoticeCountSearch, getNoticeList, getNoticeListCount, getNoticeListSearch } from '@/apis/notice/notice';
import { getTotalPage } from '@/apis/board/board';
import SearchBar from "@/components/search/SearchBar.vue";

const router = useRouter();

const principalStore = usePrincipalStore();
const user = computed(() => principalStore.user);

const noticeInfo = ref([]);
const currentPage = ref(1);
const totalPageCount = ref(0);
const onePageCount = ref(15);

const word = ref('')

const searchButton = ref(false);

const listAll = async() => {
    try {
        const response = await getNoticeList(currentPage.value);
        noticeInfo.value = response;
    } catch (error) {
        console.log(error);
    }
}

const totalPage = async() => {
    try {
        const response = await getNoticeListCount();
        totalPageCount.value = response;
    } catch (error) {
        console.log(error);
    }
}

const searchListAll = async() => {
    try {
        const response = await getNoticeListSearch(word.value, currentPage.value);
        noticeInfo.value = response;
    } catch (error) {
        console.log(error);
    }
}

const searchTotalPage = async() => {
    try {
        const response = await getNoticeCountSearch(word.value);
        totalPageCount.value = response;
    } catch (error) {
        console.log(error);
    }
}

const onPageChange = (val) => {
    if(!searchButton.value) {
        currentPage.value = val;
        listAll();
    }else {
        currentPage.value = val;
        searchListAll();
    }
}

const moveDetail = (val) => {
    router.push({
        name: 'noticeDetail',
        params: {
            noticeId: val
        }
    })
}

const eventSearch = async(eventWord) => {
    word.value = eventWord;
    await searchTotalPage();
    onPageChange(1);
}

const formattedUpdateDateComment = (date) => {
  return (
    date.substring(0, 4) +
      '년 ' +
    date.substring(5, 7) +
      '월 ' +
    date.substring(8, 10) +
      '일'
  )
}


onMounted(async() => {
    await principalStore.fetchUser();
    totalPage();
    listAll();
    console.log(user.value)
})


</script>

<template>
    <div id="noticeWrap">
        <div class="noticeBar">
            <h1><i class="fa-solid fa-bullhorn megaphone"></i> 공지사항</h1>
            <div class="rightIcons">
                <div class="searchButton" @click="searchButton = !searchButton">
                    <i class="fa-solid fa-magnifying-glass search_child_img"></i>
                </div>
                <div class="writeButton" @click="router.push({name : 'noticeWrite'})" v-if="user?.authorities[0].authority != 'ADMIN'">
                    <img src="../assets/writeLogo.png" alt="writeLogo">
                </div>
            </div>
        </div>
        <div v-if="searchButton">
            <div class="searchBar">
                <SearchBar @search="eventSearch" />
            </div>
            <div class="searchBar_number">
                    총 {{ totalPageCount }}개의 포스트를 찾았습니다.
            </div>
        </div>
        
        <div class="noticeList">
            <div class="noticeItem" v-for="(item, index) in noticeInfo" :key="item.noticeId" @click="moveDetail(item.noticeId)">
                <div class="no">{{ index + 1 }}</div>
                <div class="title">{{ item.title }}</div>
                <div class="time">{{ formattedUpdateDateComment(item.updateDate) }}</div>
            </div>
        </div>
        <div>
            <Pagination2 
                :count="onePageCount"
                :totalCount="totalPageCount"
                :currentPage="currentPage"
                @pageChange="onPageChange"
            />
        </div>
    </div>
</template>

<style scoped>
    #noticeWrap {
        width: 1400px;
    }
    .noticeBar {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .rightIcons {
        display: flex;
        gap: 10px;
    }

    .searchButton, .writeButton {
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
        height: 50px;
        font-size: 40px;
        box-sizing: border-box;
    }

    .searchButton:hover, .writeButton:hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }

    .writeButton > img {
        width: 40px;
        height: 40px;
    }

    .noticeList {
        width: 100%;
        max-height: 900px;
        border: 1px solid #ccc;
        border-radius: 9px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    .noticeItem {
        transition: all 0.3s;
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        border: 1px solid #ccc;
        cursor: pointer;
        
    }

    .noticeItem:hover {
        background-color: #eee;
    }

    .no {
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #ccc;
    }
    .title {
        padding: 0 50px;
        width: 60%;
        display: flex;
        align-items: center;
    }
    .time {
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        border-left: 1px solid #ccc;
    }

    .searchBar {
        display: flex;
        justify-content: center;
        margin: 20px 0;
        /* flex-direction: column; */
    }
    .searchBar_number {
  margin-left: 100px;
  font-size: 30px;
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>