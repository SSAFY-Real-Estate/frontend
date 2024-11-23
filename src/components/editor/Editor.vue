<script setup>
import { imgRegex } from '@/constants/firebaseRegex';
import { QUILL_MODULES } from '@/constants/quillModules.';
import { reactive, watch } from 'vue';
import { quillEditor } from 'vue3-quill';

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

watch(() => state._content, (newContent) => {
    console.log(newContent);
    const result = newContent.match(imgRegex); // 모든 매칭 결과 배열로 반환
    // console.log(result.length);
    console.log(typeof(state._content))
    console.log(state._content.match(imgRegex))
    
})

</script>

<template>
    <div id="editorWrap">
        <quillEditor class="editorTool"
            v-model:value="state.content"
            :options="state.editorOption"
            :disabled="state.disabled"
            @change="onEditorChange($event)"
        />
    </div>
</template>

<style scoped>
    #editorWrap {
        width: 1200px;
    }
    .editorTool {
        min-height: 600px
    }
    
</style>