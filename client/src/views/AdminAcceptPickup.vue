<script setup>
import { useDataStore } from "../stores/Data";
import { ref, onMounted, watch } from "vue";
const DataStore = useDataStore();
const { GetKeepById, AddKeepPickup } = DataStore;
import { useRoute } from "vue-router";
const router = useRoute();
const keepData = ref(null);
const amount = ref(0);
const isLoading = ref(false);
watch(
  () => router,
  async (newRoute) => {
    keepData.value = await GetKeepById(newRoute.params.id);
    amount.value = newRoute.params.amount;
  },
  { immediate: true }
);

const submit = async () => {
  isLoading.value = true;
  let result = await AddKeepPickup(keepData.value.id, amount.value);
  isLoading.value = false;
  if (result) {
    router.push({ path: "/User/Search" });
  }
};
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
    v-if="keepData"
    class="text-lg tracking-normal leading-none rounded-none"
  >
    <section
      class="flex overflow-hidden flex-col items-start max-w-[335px] mx-auto px-7 py-6 bg-white rounded-3xl"
    >
      <p class="text-2xl tracking-wide text-zinc-900">寄放商品領取</p>

      <div
        class="flex flex-col justify-start mt-4 w-full text-lg leading-loose rounded max-w-[335px] text-zinc-900"
      >
        <div>
          <label
            for="itemName"
            class="text-left truncate w-[120px] w-max-[120px]"
            >商品名稱</label
          >
          <!-- 搜尋輸入框 -->
          <div
            class="relative w-60 w-full border border-black rounded p-2 bg-white text-black"
          >
            {{ keepData.Item.Name }}
          </div>
        </div>
        <div>
          <label
            for="itemName"
            class="text-left truncate w-[120px] w-max-[120px]"
            >領取數量</label
          >
          <!-- 搜尋輸入框 -->
          <div
            class="relative w-60 border border-black w-full rounded p-2 bg-white"
          >
            {{ amount }}
          </div>
        </div>
      </div>
      <div
        class="flex gap-5 justify-center mt-14 w-full text-center whitespace-nowrap"
      >
        <div
          class="gap-1.5 self-stretch px-5 py-2 text-white rounded-lg bg-zinc-900"
          @click="submit"
        >
          接受
        </div>
      </div>
    </section>
  </div>
</template>

<style type="text/css"></style>
