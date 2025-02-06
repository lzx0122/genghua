<script setup>
import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import { useDataStore } from "../stores/Data";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const toast = useToast();
const DataStore = useDataStore();
const { UserSearchData } = storeToRefs(DataStore);
const { GetUserSearchData } = DataStore;
const account = ref("");
const isLoading = ref(false);
const SearchUserHandle = async () => {
  isLoading.value = true;
  try {
    await GetUserSearchData(account.value);
  } catch (e) {
  } finally {
    isLoading.value = false;
  }
};

const gotoUserStore = (account) => {
  router.push({ path: `/User/Store/${account}` });
};
</script>

<template>
  <label
    class="flex mx-auto mt-[90px] gap-3 items-center p-3 mt-2 w-full text-lg tracking-normal leading-none text-center whitespace-nowrap bg-white rounded-lg border-solid border-[3px] border-zinc-900 max-w-[335px] text-zinc-400 cursor-pointer"
    tabindex="0"
    role="button"
  >
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a1f1b8721d60eb3a48f7d7fc2b4d84c10ae7aff0597407bed1a55ebc8e9c32c?placeholderIfAbsent=true&apiKey=1658e52805814928b66db3bf763c83c5"
      class="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
      alt=""
      @click="SearchUserHandle"
    />
    <input
      type="text"
      class="bg-transparent border-none outline-none w-full text-zinc-900"
      placeholder="電話查詢"
      @keyup.enter="SearchUserHandle"
      v-model="account"
    />
  </label>

  <div
    class="overflow-y-auto flex flex-col h-full items-center mt-[10px] bg-white shadow-lg rounded-lg border p-2 cursor-grab active:cursor-grabbing"
  >
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
      class="flex flex-col items-center w-full max-w-[335px] flex-col text-zinc-800"
    >
      <div
        v-if="UserSearchData"
        class="flex w-full flex-col rounded-none"
        @click="gotoUserStore(UserSearchData.Account)"
      >
        <div
          class="flex w-full flex-col items-start rounded-lg border-4 border-solid border-zinc-800 px-3 py-4"
        >
          <div class="flex gap-6 text-center whitespace-nowrap">
            <div class="my-auto text-2xl">{{ UserSearchData.Name }}</div>
            <div class="basis-auto text-3xl">
              {{ UserSearchData.MonthDay.replace("-", "月") + "日" }}
            </div>
          </div>
          <div
            class="mt-2 ml-3 flex gap-3 rounded-lg border-4 border-solid border-zinc-900 bg-white px-2.5 py-1.5 text-lg leading-none tracking-normal"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/464212ee8e2d4219bb5b2545f310f2cba4d61fcc3b6ac6037a4da565e4968918?placeholderIfAbsent=true&apiKey=1658e52805814928b66db3bf763c83c5"
              class="aspect-square w-6 shrink-0 object-contain"
              alt=""
            />
            <div>電話:</div>
            <div class="basis-auto">{{ UserSearchData.Account }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
