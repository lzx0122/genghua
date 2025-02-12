<script setup>
import { useDataStore } from "../stores/Data";
import { onMounted, ref, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import UserStoreHome from "../components/UserStoreHome.vue";
import UserStoreLogs from "../components/UserStoreLogs.vue";
import dayjs from "dayjs";

const DataStore = useDataStore();
const { UserSearchData } = storeToRefs(DataStore);
const { GetUserSearchData } = DataStore;
const router = useRoute();
const isLoading = ref(false);
const userlogs = ref([]);
const tabs = [
  {
    id: 0,
    title: "庫存",
    component: UserStoreHome,
  },
  {
    id: 1,
    title: "紀錄",
    component: UserStoreLogs,
  },
];
const tabindex = ref(0);
const logsHandler = () => {
  for (const [index, keep] of UserSearchData.value.Keeps.entries()) {
    let remainingAmountTemp = UserSearchData.value.Keeps[index].Amount;
    userlogs.value.push({
      index: index,
      title: `${keep.Item.Name} +${keep.Amount}`,
      datetime: dayjs(keep.DateTime.seconds * 1000).format(
        "YYYY MM月DD日 HH:mm"
      ),
      timestamp: keep.DateTime.seconds,
      desc: "寄放",
    });

    let picktemp = keep.Pickup.map((e) => {
      remainingAmountTemp -= e.Amount;
      return {
        index: index,
        title: `${keep.Item.Name} -${e.Amount}`,
        datetime: dayjs(e.DateTime.seconds * 1000).format(
          "YYYY MM月DD日 HH:mm"
        ),
        timestamp: e.DateTime.seconds,
        desc: "領取",
      };
    });
    UserSearchData.value.Keeps[index].RemainingAmount = remainingAmountTemp;
    userlogs.value.push(...picktemp);
  }
  userlogs.value.sort((a, b) => b.timestamp - a.timestamp);
};

const activeTabsHandler = (index) => {
  tabindex.value = index;
};

const activeTabsComponent = computed(() => {
  return tabs[tabindex.value].component;
});
const getProps = computed(() => {
  if (tabindex.value == 1) return { userlogs: userlogs.value };
  return {};
});
onMounted(async () => {
  await GetUserSearchData(router.params.account);
  logsHandler();
});

watch(
  () => router.params.account,
  async (newAccount) => {
    await GetUserSearchData(newAccount);
    logsHandler();
  }
);
</script>

<template>
  <Loading
    :active.sync="isLoading"
    :is-full-page="true"
    :can-cancel="true"
    :color="'oklch(0.21 0.006 285.885)'"
    :background-color="'rgb(255, 255, 255)'"
    :height="128"
    :width="128"
    :loader="'Bars'"
  />
  <div class="min-h-[76px]"></div>
  <div
    class="text-sm font-medium text-center text-black border-b border-gray-300 bg-white"
  >
    <ul class="flex flex-wrap -mb-px">
      <li v-for="tab in tabs" :key="tab.id" class="me-2">
        <a
          href="#"
          :class="{
            'inline-block p-4 text-black border-b-2 border-black rounded-t-lg activek':
              tab.id == tabindex,
            'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-black hover:border-gray-400':
              tab.id != tabindex,
          }"
          @click="activeTabsHandler(tab.id)"
          >{{ tab.title }}</a
        >
      </li>
    </ul>
  </div>

  <div
    v-if="UserSearchData"
    class="flex overflow-y-auto flex-col pb-10 mx-auto w-full bg-white"
    role="main"
    aria-label="Member Warehouse Section"
  >
    <component :is="activeTabsComponent" v-bind="getProps"></component>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

/* Only include if not using Tailwind */
nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 5rem;
  padding-left: 1.25rem;
  width: 100%;
  z-index: 10;
}

nav ul {
  display: flex;
  gap: 1.25rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

nav button {
  background: none;
  border: none;
  color: rgb(24, 24, 27);
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s;
}

nav button:hover {
  color: rgb(63, 63, 70);
}

.active-indicator {
  display: flex;
  flex-shrink: 0;
  margin-top: 0.375rem;
  margin-left: 5rem;
  border-radius: 0.5rem;
  background-color: rgb(24, 24, 27);
  height: 3px;
  width: 55px;
}
</style>
