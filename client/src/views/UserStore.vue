<script setup>
import { useDataStore } from "../stores/Data";
import { useToast } from "vue-toastification";
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import axios from "axios";

const DataStore = useDataStore();
const { UserSearchData } = storeToRefs(DataStore);
const { GetUserSearchData } = DataStore;
const toast = useToast();
const router = useRoute();
const isLoading = ref(false);
const userlogs = ref([]);

const logsHandler = () => {
  for (const keep of UserSearchData.value.Keeps) {
    let picktemp = keep.Pickup.map(() => {
      return {
        title: `${keep.Item.Name}` + "-1",
        datetime: "2025 02月06日 21:12",
        desc: "領取",
      };
    });
    userlogs.value.push(...picktemp);
  }
};
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
  <div
    v-if="UserSearchData"
    class="flex overflow-hidden flex-col pb-16 mx-auto w-full bg-white mt-[90px]"
    role="main"
    aria-label="Member Warehouse Section"
  >
    <div class="flex flex-col pl-4 mt-3.5 w-full">
      <div
        class="flex flex-col items-start self-center px-4 py-4 w-full rounded-lg border-4 border-solid border-zinc-800 max-w-[335px] text-zinc-800"
      >
        <div class="flex gap-6 text-center whitespace-nowrap">
          <div class="my-auto text-2xl">{{ UserSearchData.Name }}</div>
          <div class="text-3xl basis-auto">
            {{ UserSearchData.MonthDay.replace("-", "月") + "日" }}
          </div>
        </div>
        <div
          class="flex gap-3 px-2.5 py-1.5 mt-2 ml-3 text-lg tracking-normal leading-none bg-white rounded-lg border-4 border-solid border-zinc-900"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/1658e52805814928b66db3bf763c83c5/8ed27068e2b86736d3b2f1dbf63e952cbc1b693363b7f29857093d7b8572e8cb?apiKey=1658e52805814928b66db3bf763c83c5&"
            class="object-contain shrink-0 w-6 aspect-square"
            alt="Phone Icon"
          />
          <div>電話:</div>
          <div class="basis-auto">{{ UserSearchData.Account }}</div>
        </div>
      </div>
      <div
        class="self-start mt-4 text-2xl leading-none text-center text-zinc-900"
        role="heading"
        aria-level="2"
      >
        您的庫存
      </div>
      <div class="overflow-x-auto w-full">
        <div class="flex gap-4 items-start mt-5 whitespace-nowrap">
          <div
            v-for="keep in UserSearchData.Keeps"
            :key="keep.id"
            class="flex flex-col w-[150px] shrink-0"
            tabindex="0"
            role="article"
            aria-label="Large Latte Stock"
          >
            <div
              class="flex overflow-hidden flex-col justify-center items-center px-4 py-10 w-full border-2 border-solid bg-zinc-100 border-zinc-900 rounded-t-lg"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/1658e52805814928b66db3bf763c83c5/3f99a80673c020e4d1b4351e57d0eeb35b539a3ade9906fe51e6f0466dfa7d6b?apiKey=1658e52805814928b66db3bf763c83c5&"
                class="object-contain w-6 aspect-square"
                alt="Coffee Cup Icon"
              />
            </div>
            <div
              class="flex flex-col px-3 py-4 w-full bg-white rounded-none border-2 border-solid border-zinc-900 text-zinc-900"
            >
              <div class="text-lg tracking-normal leading-none">
                {{ keep.Item.Name }}
              </div>
              <div class="mt-1 text-xs tracking-wide">
                剩餘數量: {{ keep.Amount - keep.Pickup.length }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col overflow-y-auto max-h-[400px] items-center p-6 mt-11 w-full text-base tracking-wide rounded-md"
      role="list"
      aria-label="Transaction History"
    >
      <div
        v-for="log in userlogs"
        class="flex gap-5 justify-between py-3 w-full bg-white border-b-2 border-solid border-b-zinc-900"
        role="listitem"
      >
        <div class="flex gap-2.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/1658e52805814928b66db3bf763c83c5/bc52c0ecbf45ac0162e7ce0956322c4d1472b0c8c12760836c29f7e52726f959?apiKey=1658e52805814928b66db3bf763c83c5&"
            class="object-contain shrink-0 w-12 aspect-square fill-zinc-100"
            alt="Latte Transaction Icon"
          />
          <div class="flex flex-col">
            <div class="self-start text-zinc-900">{{ log.title }}</div>
            <div class="mt-1 text-stone-500">{{ log.datetime }}</div>
          </div>
        </div>
        <div class="self-start text-zinc-900">{{ log.desc }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
