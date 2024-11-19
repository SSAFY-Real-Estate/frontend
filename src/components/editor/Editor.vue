<script setup>
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
})

</script>

<template>
    <div>
        <quillEditor
            v-model:value="state.content"
            :options="state.editorOption"
            :disabled="state.disabled"
            @change="onEditorChange($event)"
        />
    </div>
</template>

<style scoped>
    
</style>