<script setup>
import { getNoticeDetail } from '@/apis/notice/notice';
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

onMounted(async() => {
    await principalStore.fetchUser();
    userInfo.value = user.value;
    getNoticeInfo();
})
</script>

<template>
    <div>
        <div class="title">{{ noticeInfo.title }}</div>
        <div class="date">{{ noticeInfo.updateDate }}</div>
        <div v-if="noticeId?.userId == userInfo?.userId">
            <button>수정</button>
            <button>삭제</button>
        </div>
        <div class="content"></div>
        <!-- v-html로 quill -->
    </div>
</template>

<style scoped>
    
</style>