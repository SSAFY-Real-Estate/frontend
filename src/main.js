import "./assets/reset.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { quillEditor } from "vue3-quill";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { useKakao } from "vue3-kakao-maps/@utils";

import App from "./App.vue";
import router from "./router";

const appkey = "app key";
useKakao(appkey);

const app = createApp(App);
app.use(quillEditor);
app.use(createPinia());
app.use(router);

app.mount("#app");
