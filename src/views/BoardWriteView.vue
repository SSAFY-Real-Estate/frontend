<script setup>
import Editor from '@/components/editor/Editor.vue';
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { imgRegex } from '@/constants/firebaseRegex';
import { QUILL_MODULES } from '@/constants/quillModules.';
import { quillEditor } from 'vue3-quill';
import { ref as firebaseRef, getDownloadURL, uploadString } from 'firebase/storage';
import { storage } from '@/apis/firebase/firebaseConfig';
import { v4 as uuid } from 'uuid';
import { writeBoardApi } from '@/apis/board/board';
import { usePrincipalStore } from '@/stores/principal';

const principalStore = usePrincipalStore();

const user = computed(() => principalStore.user);

onMounted(() => {
  principalStore.fetchUser();
  console.log(user.value.userId);
})

const boardTitle = ref('');

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
      // boardContent.value = state.value._content;
      // console.log(state.value.content);
}

watch(() => state._content, () => {
  console.log(state._content);
})

const uploadImageToFirebase = async (base64, index) => {
  const storageRef = firebaseRef(storage, `home/board/${uuid()}_${index}`);
  try {
    await uploadString(storage, base64, 'data_url'); // Base64 데이터 업로드
    const downloadURL = await getDownloadURL(storage);
    return downloadURL;
  } catch (error) {
    console.error('Firebase Upload Error:', error);
    return null;
  }
}

const writeBoardClick = async() => {
  if(!boardTitle.value && !state._content) {
    alert('제목과 내용을 입력해주세요.');
  } else if(!boardTitle.value) {
    alert('제목을 입력해주세요.');
    return;
  } else if(!state._content) {
    alert('내용을 입력해주세요.');
    return;
  }

  try {
      const response = await writeBoardApi({
        userId: user.value.userId,
        title: boardTitle.value,
        content: state._content,
      });
      console.log(response);
      alert('게시글 작성 성공!!!')
    
  } catch (error) {
      alert('실패')
  }
}

watch(boardTitle, () => {
  console.log(boardTitle.value)
})

</script>

<template>
  <div class="boardDetail">
    <div class="title">
      <input class="title_input" v-model="boardTitle" type="text" placeholder="제목을 입력하세요" />
    </div>
    <!-- <Editor @update:content="boardContent = $event" /> -->
    <div id="editorWrap">
        <quillEditor class="editorTool"
            v-model:value="state.content"
            :options="state.editorOption"
            :disabled="state.disabled"
            @change="onEditorChange($event)"
        />
    </div>
    <div class="buttonBox">
      <button class="quitButton">나가기</button>
      <button class="writeButton" @click="writeBoardClick">작성하기</button>
    </div>
  </div>
</template>

<style scoped>
.boardDetail {
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
