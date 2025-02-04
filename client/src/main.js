import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import { createPinia } from "pinia";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
axios.defaults.baseURL = "http://localhost:3000";

createApp(App)
  .use(Toast)
  .component("Loading", Loading)
  .use(createPinia())
  .use(router)
  .mount("#app");
