<script setup>
import { deleteNotice, getNoticeDetail } from '@/apis/notice/notice';
import { usePrincipalStore } from '@/stores/principal';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const { noticeId } = route.params;

const principalStore = usePrincipalStore();
const user = computed(() => principalStore.user);
const userInfo = ref({});
const noticeInfo = ref({});

watch(noticeInfo, () => {
    noticeInfo.value.updateDate = formattedUpdateDateComment(noticeInfo.value.updateDate);
})

const getNoticeInfo = async() => {
    try {
        const response = await getNoticeDetail(noticeId);
        noticeInfo.value = response;
    } catch (error) { 

    }
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

const deleteClick = async() => {
  if(window.confirm('해당 공지사항을 삭제하시겠습니까?')) {
    try {
      const response = await deleteNotice(noticeId);
      alert('성공적으로 해당 공지사항을 삭제했습니다.');
      router.push({name : 'noticeList'});
    } catch (error) {
      alert('오류가 발생하였습니다. 해당 서비스를 다시 이용해주세요.');
    }
  }
}

const goToUpdate = () => {
  router.push({
    name: 'noticeUpdate',
    params: {
      noticeId: noticeId
    }
  })
}

onMounted(async() => {
    await principalStore.fetchUser();
    userInfo.value = user.value;
    getNoticeInfo();
})
</script>

<template>
    <div class="noticeDetail">
        <div class="title">{{ noticeInfo.title }}</div>

        <div class="updateAndDate">
          <div class="updateAndDate_date">
            <span>{{ noticeInfo.updateDate }}</span>
            <span class="writerNickname">{{ noticeInfo.nickname }}</span>
          </div>

          <div class="updatgeAndDte_update">
            <button class="updatgeAndDte_update_update" @click="goToUpdate">수정</button>
            <button class="updatgeAndDte_update_delete" @click="deleteClick">삭제</button>
          </div>
        </div>
        <!-- v-html로 quill -->
        <div class="content" v-html="noticeInfo.content"></div>
    </div>
</template>

<style scoped>
  .noticeDetail {
    width: 1200px;
  }
  .title {
    box-sizing: border-box;
    width: 100%;
    font-size: 50px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  .updateAndDate {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .updateAndDate_date {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 30px;
  }
  .updatgeAndDte_update {
    margin-left: 20px;
    width: 215px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
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
</style>