import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export const QUILL_OPTIONS = {
  components: {
    QuillEditor
  },
  data() {
    return { 
      options: {
        debug: 'info',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],
             
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
          ]
        },
        theme: 'snow'
      }
    }
  },
};