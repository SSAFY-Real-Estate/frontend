<script setup>
import { usePrincipalStore } from '@/stores/principal';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { getNoticeDetail, updateNotice } from '@/apis/notice/notice';
import { QUILL_MODULES } from '@/constants/quillModules';
import { quillEditor } from 'vue3-quill';

const route = useRoute();
const router = useRouter();

const { noticeId } = route.params;

const principalStore = usePrincipalStore();
const user = computed(() => principalStore.user);
const userInfo = ref({});
const noticeInfo = ref({});

const noticeTitle = ref('');
const noticeContent = ref('');

const state = reactive({
    content: '',
    _content: '',
    editorOption: {
        placeholder: '내용을 입력하세요',
        modules: QUILL_MODULES,
    },
    disabled: false,
});

const getNoticeInfo = async () => {
    try {
        const response = await getNoticeDetail(noticeId);
        noticeInfo.value = response;
    } catch (error) {
        console.error('Error fetching notice details:', error);
    }
};

watch(noticeInfo, () => {
    if (noticeInfo.value) {
        noticeTitle.value = noticeInfo.value.title || '';
        noticeContent.value = noticeInfo.value.content || '';
        state.content = noticeInfo.value.content || '';
    }
});

const onEditorChange = ({ html }) => {
    console.log('Editor changed:', html);
    state._content = html;
};

const update = async() => {
    if (window.confirm('해당 공지사항을 변경하시겠습니까?')) {
        try {
            const response = await updateNotice(noticeId, {
                userId: user.value.userId,
                title: noticeTitle.value,
                content: state._content
            })
            alert('해당 공지사항 내용을 변경하였습니다.');
            router.push({
            name: 'noticeDetail',
            params: {
                noticeId: noticeId,
            },
        });
        } catch (error) {
            
        }


        
    }
};

onMounted(async () => {
    await principalStore.fetchUser();
    userInfo.value = user.value;
    await getNoticeInfo();

    const quillInstance = document.querySelector('.editorTool .ql-editor');
    if (quillInstance) {
        quillInstance.innerHTML = state.content || '';
    }
});
</script>


<template>
    <div class="noticeUpdate">
        <div class="title">
            <input class="title_input" v-model="noticeTitle" type="text" placeholder="제목을 입력하세요" />
        </div>
        <div id="editorWrap">
        <quillEditor class="editorTool"
            v-model:value="state.content"
            :options="state.editorOption"
            :disabled="state.disabled"
            @change="onEditorChange($event)"
        />
        </div>
        <div class="buttonBox">
            <button class="quitButton" @click="router.push({name : 'board'})">나가기</button>
            <button class="writeButton" @click="update">수정하기</button>
        </div>
    </div>
</template>

<style scoped>
    .noticeUpdate {
        width: 1200px;
    }
    .title {
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}
.title_input {
  border: none; /* 기본 테두리 제거 */
  outline: none; /* 포커스 시 기본 outline 제거 */
  font-size: 50px;
}
/*  */
#editorWrap {
  width: 1200px;
}
.editorTool {
  min-height: 600px;
  font-size: 35px;
}

.buttonBox {
  margin-top: 10px;
  width: 1200px;
  display: flex;
  gap: 10px;
  justify-content: right;
  align-items: center;
}
button {
  transition: all 0.3s;
  background-color: #3EBEEE;
  border: none;
  border-radius: 9px;
  height: 50px;
  width: 130px;
  font-size: 24px;
  cursor: pointer;
}
button:hover {
  opacity: 0.8;
}
</style>