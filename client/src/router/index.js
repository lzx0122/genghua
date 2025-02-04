import { createRouter, createWebHistory } from "vue-router";
const routes = [
  { path: "/Admin/AddUser", component: () => import("../views/AddUser.vue") },
  { path: "/Auth", component: () => import("../views/Auth.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
