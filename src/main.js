import "./assets/reset.css";
import "@fortawesome/fontawesome-free/js/all.js";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { useKakao } from "vue3-kakao-maps/@utils";

const appkey = "app key";
useKakao(appkey);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
