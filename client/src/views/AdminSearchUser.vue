<script setup>
import { useToast } from "vue-toastification";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useDataStore } from "../stores/Data";
const DataStore = useDataStore();
const { AdminSearchUsersData } = storeToRefs(DataStore);
const { GetAdminSearchUserDataByAccount, GetAdminSearchUserDataByDate } =
  DataStore;
const toast = useToast();
const date = ref("");
const account = ref("");
const isLoading = ref(false);
import { useRouter } from "vue-router";
const router = useRouter();
onMounted(() => {});

const AdminSearchUserHandleByAccount = async () => {
  isLoading.value = true;

  try {
    await GetAdminSearchUserDataByAccount(account.value);
  } catch (e) {
    toast.error(e, {
      position: "top-center",
      timeout: 3000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false,
    });
  } finally {
    isLoading.value = false;
  }
};

const AdminSearchUserHandleByDate = async () => {
  isLoading.value = true;
  await GetAdminSearchUserDataByDate(new Date(date.value).getTime());
  isLoading.value = false;
};

const gotoUser = (account) => {
  router.push({ path: `/Admin/ManageUser/${account}` });
};
</script>

<template>
  <div
    class="flex mx-auto px-[10px] mt-[90px] gap-7 mt-2 w-full text-lg tracking-normal leading-none whitespace-nowrap max-w-[500px] text-zinc-400"
  >
    <label
      class="flex overflow-hidden flex-1 gap-3 items-center p-3 text-center bg-white rounded-lg border-solid border-[3px] border-zinc-900 cursor-pointer"
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/1658e52805814928b66db3bf763c83c5/55f6ece7f2a1af2643a593c435207e1235a21e760605fe4f3b940a72fbfefe5b?apiKey=1658e52805814928b66db3bf763c83c5&"
        class="object-contain shrink-0 w-6 aspect-square"
        alt=""
        @click="AdminSearchUserHandleByDate"
      />
      <input
        type="date"
        class="bg-transparent border-none outline-none w-full text-zinc-900"
        placeholder="生日查詢"
        @keyup.enter="AdminSearchUserHandleByDate"
        v-model="date"
      />
    </label>

    <label
      class="flex overflow-hidden flex-1 gap-3 items-center p-3 text-center bg-white rounded-lg border-solid border-[3px] border-zinc-900 cursor-pointer"
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/1658e52805814928b66db3bf763c83c5/3ed7c2a3c49f9448604e513463c9685534bd1c6ed702ffecbdeafc509ca62c99?apiKey=1658e52805814928b66db3bf763c83c5&"
        class="object-contain shrink-0 w-6 aspect-square"
        alt=""
        @click="AdminSearchUserHandleByAccount"
      />
      <input
        type="text"
        class="bg-transparent border-none outline-none w-full text-zinc-900"
        placeholder="電話查詢"
        @keyup.enter="AdminSearchUserHandleByAccount"
        v-model="account"
      />
    </label>
  </div>

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
    class="overflow-y-auto flex flex-col h-full items-center mt-[10px] bg-white shadow-lg rounded-lg border p-2 cursor-grab active:cursor-grabbing"
  >
    <div
      class="flex flex-col items-center w-full max-w-[335px] flex-col text-zinc-800"
    >
      <div
        v-for="user in AdminSearchUsersData"
        :key="user.Account"
        class="flex w-full mt-[10px] flex-col rounded-none"
        @click="gotoUser(user.Account)"
      >
        <div
          class="flex w-full flex-col items-start rounded-lg border-4 border-solid border-zinc-800 px-3 py-4"
        >
          <div class="flex gap-6 text-center whitespace-nowrap">
            <div class="my-auto text-2xl">{{ user.Name }}</div>
            <div class="basis-auto text-3xl">
              {{ user.MonthDay.replace("-", "月") + "日" }}
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
            <div class="basis-auto">{{ user.Account }}</div>
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
