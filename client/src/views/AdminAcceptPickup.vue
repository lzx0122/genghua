<script setup>
import { useDataStore } from "../stores/Data";
import { ref, onMounted, watch } from "vue";
const DataStore = useDataStore();
const { GetKeepById } = DataStore;
import { useRoute } from "vue-router";
const router = useRoute();
const keepData = ref(null);
const amount = ref(0);

watch(
  () => router,
  async (newRoute) => {
    keepData.value = await GetKeepById(newRoute.params.id);
    amount.value = newRoute.params.amount;
  },
  { immediate: true }
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
    v-if="keepData"
    class="text-lg tracking-normal leading-none rounded-none"
  >
    <section
      class="flex overflow-hidden flex-col items-start px-7 py-6 w-full bg-white rounded-3xl border-solid border-[3px] border-[color:var(--black,#1B1B1B)]"
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
            >商品數量</label
          >
          <!-- 搜尋輸入框 -->
          <div
            class="relative w-60 border border-black w-full rounded p-2 bg-white"
          >
            {{ amount }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style type="text/css"></style>
