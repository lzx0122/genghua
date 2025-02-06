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
  try {
    let res = await login(adminId.value, password.value);
    if (res) router.push({ path: "/User/Search" });
  } catch (e) {
    adminId.value = "";
  }
};
</script>

<template>
  <div class="overflow-y-auto flex flex-col items-center mb-[120px] mt-[90px]">
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
        @keyup.enter="loginHandler"
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
