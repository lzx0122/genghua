import { createRouter, createWebHistory } from "vue-router";
import { storeToRefs } from "pinia";
import { useDataStore } from "../stores/Data";
import { useAuthStore } from "../stores/Auth";

const routes = [
  { path: "/User/Search", component: () => import("../views/UserSearch.vue") },
  { path: "/Admin/AddUser", component: () => import("../views/AddUser.vue") },
  { path: "/Auth", component: () => import("../views/Auth.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const DataStore = useDataStore();
  const { Title } = storeToRefs(DataStore);
  const store = useAuthStore();
  const { fetchUser } = store;
  try {
    if (to.fullPath === "/Admin/AddUser") {
      await fetchUser();

      Title.value = "新增顧客";
    }

    if (to.fullPath === "/Auth") {
      Title.value = "登入";
    }

    if (to.fullPath === "/User/Search") {
      Title.value = "顧客查詢";
    }

    if (to.fullPath === "/Admin/Search") {
      await fetchUser();

      Title.value = "管理查詢顧客";
    }

    next();
  } catch (e) {
    if (e.status === 401) next({ path: "/User/Search" });
  }
});
export default router;
