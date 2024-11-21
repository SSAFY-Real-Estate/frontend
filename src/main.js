import "./assets/reset.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { quillEditor } from "vue3-quill";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { useKakao } from "vue3-kakao-maps/@utils";

import App from "./App.vue";
import router from "./router";

const appkey = import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY;
useKakao(appkey, ["clusterer", "services", "drawing"]);

const app = createApp(App);
app.use(quillEditor);
app.use(createPinia());
app.use(router);

app.mount("#app");
