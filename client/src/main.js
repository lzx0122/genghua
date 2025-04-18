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
axios.defaults.baseURL = "https://genghua-coffee-server.vercel.app";
axios.defaults.clientBaseURL = "https://genghua-coffee-app.vercel.app";
//axios.defaults.baseURL = "http://localhost:3000";

axios.defaults.withCredentials = true;
createApp(App)
  .use(Toast)
  .component("Loading", Loading)
  .use(createPinia())
  .use(router)
  .mount("#app");
