<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { usePrincipalStore } from '@/stores/principal';
import { QUILL_MODULES } from '@/constants/quillModules';
import { useRouter } from 'vue-router/dist/vue-router';
import { quillEditor } from 'vue3-quill';
import { writeNotice } from '@/apis/notice/notice';

const principalStore = usePrincipalStore();

const user = computed(() => principalStore.user);

const router = useRouter();

onMounted(() => {
    principalStore.fetchUser();
    console.log(user.value)
})

const noticeTitle = ref('');

const state = reactive({
    content: '',
    _content: '',
    editorOption: {
        placeholder: '',
        modules: QUILL_MODULES,
    },
    disabled: false
})

const onEditorChange = ({ quill, html, text }) => {
      console.log('editor change!', html)
      state._content = html
}

watch(() => state._content, () => {
  console.log(state._content);
})

const writeNoticeClick = async() => {
  if(!noticeTitle.value && !state._content) {
    alert('제목과 내용을 입력해주세요.');
  } else if(!noticeTitle.value) {
    alert('제목을 입력해주세요.');
    return;
  } else if(!state._content) {
    alert('내용을 입력해주세요.');
    return;
  }

  try {
      const response = await writeNotice({
        userId: user.value.userId,
        title: noticeTitle.value,
        content: state._content,
      });
      console.log(response);
      alert('공지사항이 성공적으로 작성되었습니다.');
      router.push({name : 'noticeList'})
    
  } catch (error) {
      alert('실패')
  }
}

</script>

<template>
    <div class="noticeWriteWrap">
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
        <button class="quitButton" @click="router.push({name : 'noticeList'})">나가기</button>
        <button class="writeButton" @click="writeNoticeClick">작성하기</button>
    </div>
    </div>
</template>

<style scoped>
    .noticeWriteWrap {
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