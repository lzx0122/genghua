<script setup>
import { useDataStore } from "../stores/Data";
import { ref } from "vue";
const dataStore = useDataStore();
const { AddUser } = dataStore;
const isLoading = ref(false);
const userData = ref({ account: "", name: "", date: "", email: "", desc: "" });

const addUserHandler = async () => {
  userData.value.date = new Date(userData.value.date).getTime();
  isLoading.value = true;
  await AddUser(userData.value);
  isLoading.value = false;
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

  <div
    class="overflow-y-auto mb-[120px] bg-white shadow-lg rounded-lg border p-2"
  >
    <div class="flex flex-col items-center px-6 w-full">
      <div class="self-start text-2xl w-auto text-zinc-900">輸入會員資料</div>
      <form class="flex flex-col mt-3.5 w-auto min-h-[622px]">
        <div
          class="flex justify-between items-start max-w-full text-lg leading-loose whitespace-nowrap text-zinc-900 w-[335px]"
        >
          <div class="flex flex-col rounded min-w-[240px] w-[335px]">
            <label for="nameInput" class="self-start">名稱(可暱稱)*</label>
            <input
              type="text"
              id="nameInput"
              placeholder="輸入名稱"
              class="flex shrink-0 gap-2.5 py-3 mt-2 h-12 bg-white rounded border-2 border-solid border-zinc-900"
              v-model="userData.name"
            />
          </div>
        </div>
        <div
          class="flex flex-col mt-4 w-full text-lg leading-loose rounded max-w-[335px] text-zinc-900"
        >
          <label for="phoneInput" class="self-start">會員 (電話)*</label>
          <input
            type="tel"
            id="phoneInput"
            placeholder="輸入電話"
            class="flex shrink-0 gap-2.5 py-3 mt-2 h-12 bg-white rounded border-2 border-solid border-zinc-900"
            v-model="userData.account"
          />
        </div>
        <div
          class="flex flex-col mt-4 w-full rounded-lg max-w-[335px] text-zinc-900"
        >
          <label
            for="birthdateInput"
            class="self-start text-lg leading-loose text-zinc-900"
            >生日(月日就好 年隨便填)*</label
          >
          <div
            class="flex gap-2 items-start px-3.5 py-3 mt-2 bg-white rounded-lg border-2 border-solid border-zinc-900"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc08cc744d03b4a6c40eab045ccabb44a2df07b744b8b72f5959183723232468?placeholderIfAbsent=true&apiKey=1658e52805814928b66db3bf763c83c5"
              class="object-contain w-6 aspect-square"
              alt="Calendar icon"
            />
            <input
              type="date"
              id="birthdateInput"
              class="w-full"
              v-model="userData.date"
            />
          </div>
        </div>
        <div
          class="flex flex-col mt-4 w-full text-lg leading-loose whitespace-nowrap rounded max-w-[335px] text-zinc-900"
        >
          <label for="emailInput" class="self-start">電子信箱(可不填)</label>
          <input
            type="email"
            id="emailInput"
            placeholder="輸入信箱"
            class="flex shrink-0 gap-2.5 py-3 mt-2 h-12 bg-white rounded border-2 border-solid border-zinc-900"
            v-model="userData.email"
          />
        </div>
        <div
          class="flex flex-col mt-4 w-full text-lg leading-loose whitespace-nowrap rounded max-w-[335px] text-zinc-900"
        >
          <label for="notesInput" class="self-start">備註(可不填)</label>
          <textarea
            id="notesInput"
            placeholder="輸入會員的備註(會員看不到)"
            class="flex shrink-0 gap-2.5 mt-2 bg-white rounded border-2 border-solid border-zinc-900 h-[119px]"
            v-model="userData.desc"
          ></textarea>
        </div>
      </form>
    </div>
  </div>

  <div
    class="h-[120px] fixed bottom-0 left-0 w-full flex flex-col justify-center px-5 pt-6 pb-12 -mt-11 w-full text-2xl leading-none text-center text-white whitespace-nowrap bg-white shadow-sm"
  >
    <button
      @click="addUserHandler"
      class="overflow-hidden gap-2.5 self-stretch px-6 py-3 rounded-lg border-4 border-solid bg-zinc-900 border-zinc-900"
    >
      新增
    </button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
