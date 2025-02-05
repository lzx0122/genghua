<script setup>
import { useAuthStore } from "../stores/Auth";
import { useToast } from "vue-toastification";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";
const toast = useToast();
const router = useRouter();
const store = useAuthStore();
const { fetchUser } = store;
const { User } = storeToRefs(store);

const userData = ref({ account: "", name: "", date: "", email: "", desc: "" });
onMounted(async () => {
  //let res = await fetchUser();

  // if (User.value == null || res?.status == 401) {
  //   return router.push({ path: "/User/Search" });
  // }
});

const addUserHandler = async () => {
  console.log(userData.value);
  if (
    userData.value.name.trim().length <= 0 ||
    !/^09[0-9]{8}$/.test(userData.value.account) ||
    userData.value.date.length == 0
  ) {
    toast.error("請檢查 名稱、電話、生日 是否正確", {
      position: "top-center",
      timeout: 5000,
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
    return;
  }

  try {
    userData.value.date = new Date(userData.value.date).getTime();
    const res = await axios.post(
      "/coffee/admin/user",
      { ...userData.value },
      { withCredentials: true }
    );

    toast.success("新增成功", {
      position: "top-center",
      timeout: 5000,
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
  } catch (err) {
    console.log(err);
    if (err.response?.status === 500) {
      toast.error(err.response.data, {
        position: "top-center",
        timeout: 5000,
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
    }
  }
};
</script>

<template>
  <div
    class="overflow-y-auto mb-[120px] mt-[110px] bg-white shadow-lg rounded-lg border p-2"
  >
    <div class="flex flex-col items-center px-6 mt-7 w-full">
      <div class="self-start text-2xl w-auto text-zinc-900">輸入顧客資料</div>
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
            placeholder="輸入顧客的備註(顧客看不到)"
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
