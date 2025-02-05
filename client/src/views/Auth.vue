<script setup>
import { useToast } from "vue-toastification";
import { onMounted, ref } from "vue";
import { useAuthStore } from "../stores/Auth";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const toast = useToast();
const router = useRouter();
const store = useAuthStore();
const { User } = storeToRefs(store);
const { fetchUser, login } = store;
const adminId = ref("");
const password = ref("");
onMounted(() => {
  if (User.value != null) {
    router.push({ path: "/User/Search" });
  }
});
const loginHandler = async () => {
  if (password.value.length > 8 || adminId.value.length != 10) {
    toast.error("密碼不可大於8 或 員編錯誤", {
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

  if (password.value.length < 8) {
    password.value = password.value.padEnd(8, "0");
  }
  try {
    await login(adminId.value, password.value);
    toast.success(`${User.value?.name} 您好！🫡`, {
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
    router.push({ path: "/User/Search" });
  } catch (e) {
    toast.error(e.message, {
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
    adminId.value = "";
    password.value = "";
  }
};
</script>

<template>
  <div class="overflow-y-auto flex flex-col items-center mb-[120px] mt-[110px]">
    <div
      class="flex flex-col max-w-[335px] px-7 mt-7 w-full text-lg leading-loose text-zinc-900"
    >
      <label for="employeeId" class="self-start">員編</label>
      <input
        type="text"
        id="employeeId"
        name="employeeId"
        v-model="adminId"
        class="flex shrink-0 gap-2.5 py-3 mt-2 h-12 bg-white rounded border-2 border-solid border-zinc-900"
        required
      />

      <label for="password" class="self-start mt-11">密碼</label>
      <input
        type="password"
        id="password"
        name="password"
        v-model="password"
        class="flex shrink-0 gap-2.5 py-3 mt-2 h-12 bg-white rounded border-2 border-solid border-zinc-900"
        required
      />
    </div>
  </div>

  <div
    class="h-[120px] fixed bottom-0 left-0 w-full flex flex-col justify-center px-5 pt-6 pb-12 -mt-11 w-full text-2xl leading-none text-center text-white whitespace-nowrap bg-white shadow-sm"
  >
    <button
      class="overflow-hidden gap-2.5 self-stretch px-6 py-3 rounded-lg border-4 border-solid bg-zinc-900 border-zinc-900"
      @click="loginHandler"
    >
      登入
    </button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
