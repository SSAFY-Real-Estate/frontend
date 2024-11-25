<script setup>
import { mainNoticeList } from '@/apis/notice/notice';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const noticeList = ref({});

const getList = async() => {
    const response =  await mainNoticeList();
    noticeList.value = response;
    console.log(response)
}

const router = useRouter();

onMounted(() => {
    getList();
})

const moveDetail = (val) => {
  router.push({
    name: "noticeDetail",
    params: {
      noticeId: val,
    },
  });
};

</script>
<template>
    <div id="noticeWrap">
        <div class="noticeTitle">
            <div>
                <i class="fa-solid fa-bullhorn megaphone"></i>
                공지사항
            </div>
            <span class="more" @click="router.push({name : 'noticeList'})">더보기</span>
        </div>
        <div class="noticeBody">
            <div v-for="item in noticeList" :key="item.noticeId" class="noticeData" @click=moveDetail(item.noticeId) >
                <div>{{ item.title }}</div>
                <div>{{ item.updateDate.substring(0, 4) }}년 {{ item.updateDate.substring(5, 7)}}월 {{ item.updateDate.substring(8, 10) }}일</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .noticeTitle {
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #3ebeee;
        border-top-left-radius: 9px;
        border-top-right-radius: 9px;
        padding: 20px;
        box-sizing: border-box;
        font-size: 30px;
    }
    .megaphone {
        margin-right: 20px;
        font-size: 30px;
    }
    .more {
        transition: all 0.3s;
        cursor: pointer;
    }
    .more:hover {
        opacity: 0.5;
        text-decoration: underline
    }
    .noticeBody {
        box-sizing: border-box;
        width: 100%;
        height: 240px;
        border-right: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        border-bottom-left-radius: 9px;
        border-bottom-right-radius: 9px;
    }
    .noticeData {
        transition: all 0.3s;
        box-sizing: border-box;
        padding: 20px;
        font-size: 25px;
        height: 80px;
        border-top: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }
    .noticeData:hover {
        opacity: 0.5;
    }
</style>
