import AddUser from "../views/AddUser.vue";
import { createRouter, createWebHistory } from "vue-router";
const routes = [{ path: "/Admin/AddUser", component: AddUser }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
