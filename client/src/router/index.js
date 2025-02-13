import { createRouter, createWebHistory } from "vue-router";
import { storeToRefs } from "pinia";
import { useDataStore } from "../stores/Data";
import { useAuthStore } from "../stores/Auth";

const routes = [
  { path: "/User/Search", component: () => import("../views/UserSearch.vue") },
  { path: "/Admin/AddUser", component: () => import("../views/AddUser.vue") },
  {
    path: "/Admin/AcceptPickup/:id/:amount",
    component: () => import("../views/AdminAcceptPickup.vue"),
  },
  { path: "/Auth", component: () => import("../views/Auth.vue") },
  {
    path: "/Admin/SearchUser",
    component: () => import("../views/AdminSearchUser.vue"),
  },
  {
    path: "/User/Store/:account",
    component: () => import("../views/UserStore.vue"),
  },
  {
    path: "/Admin/ManageUser/:account",
    component: () => import("../views/ManageUser.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const DataStore = useDataStore();
  const { Title, ToggleMenu, UserSearchData } = storeToRefs(DataStore);
  const store = useAuthStore();
  const { fetchUser } = store;
  try {
    if (to.fullPath === "/Auth") {
      Title.value = "登入";
    }

    if (to.fullPath === "/User/Search") {
      Title.value = "會員查詢";
      UserSearchData.value = null;
    }

    if (to.fullPath === "/Admin/SearchUser") {
      await fetchUser();
      Title.value = "會員查詢頁面(管理)";
    }

    if (to.fullPath === "/Admin/Search") {
      await fetchUser();
      Title.value = "管理查詢會員";
    }
    if (to.fullPath === "/Admin/AcceptPickup") {
      await fetchUser();
      Title.value = "領取商品";
    }
    if (to.fullPath === "/Admin/AddUser") {
      await fetchUser();
      Title.value = "新增會員";
    }

    if (to.matched.some((record) => record.path.startsWith("/User/Store/"))) {
      if (!to.params.account) {
        next({ path: "/User/Search" });
      }
      Title.value = "會員倉庫";
    }

    if (
      to.matched.some((record) => record.path.startsWith("/Admin/ManageUser/"))
    ) {
      await fetchUser();

      if (!to.params.account) {
        next({ path: "/User/Search" });
      }
      Title.value = "管理會員";
    }
    next();
  } catch (e) {
    if (e.status === 401) next({ path: "/User/Search" });
  } finally {
    ToggleMenu.value = false;
  }
});
export default router;
