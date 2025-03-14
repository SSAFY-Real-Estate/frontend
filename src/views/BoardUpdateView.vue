<script setup>
import { getBoardInfo, getDetail, updateBoard } from "@/apis/board/board";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { QUILL_MODULES } from '@/constants/quillModules';
import { quillEditor } from 'vue3-quill';
import { usePrincipalStore } from "@/stores/principal";

const route = useRoute();
const router = useRouter();

const { boardId } = route.params;

const principalStore = usePrincipalStore();
const user = computed(() => principalStore.user);
const userInfo = ref({});

const boardInfo = ref({});

const boardTitle = ref('');
const boardContent = ref('');

const state = reactive({
    content: '',
    _content: '',
    editorOption: {
        placeholder: '',
        modules: QUILL_MODULES,
    },
    disabled: false,
})

const detail = async() => {
  try {
    const response = await getBoardInfo(boardId);
    boardInfo.value = response;
  } catch (error) {
    console.error('Error fetching notice details:', error);
  }
}

// const detail = async() => {
//   getDetail(
//     boardId,
//     ({ data }) => {
//       boardInfo.value = data;
//       boardTitle.value = data.title;
//       boardContent.value = data.content;
//       state._content = data.content;
//     //   state.content = data.content;
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
// };

watch(boardInfo, () => {
  if(boardInfo.value) {
    boardTitle.value = boardInfo.value.title || '';
    boardContent.value = boardInfo.value.content || '';
    state.content = boardInfo.value.content || '';
  }
})


onMounted(async() => {
    await principalStore.fetchUser();
    userInfo.value = user.value;
    await detail();
    const quillInstance = document.querySelector('.editorTool .ql-editor');
    if (quillInstance) {
        quillInstance.innerHTML = state.content || '';
    }
})

const update = () => {
   if(window.confirm('해당 게시물을 변경하시겠습니까?')) {
      try {
        const response = updateBoard(boardId, {
          userId: user.value.userId,
          title: boardTitle.value,
          content: state._content
        })
        alert('해당 게시물 내용을 변경하였습니다.');
        router.push({
          name: 'detail',
          params: {
            boardId: boardId,
          },
        })
      } catch (error) {
        
      }
   }
}

const onEditorChange = ({ html }) => {
      console.log('editor change!', html)
      state._content = html
}


</script>

<template>
    <div class="boardUpdate">
        <div class="title">
            <input class="title_input" v-model="boardTitle" type="text" placeholder="제목을 입력하세요" />
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
.boardUpdate {
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