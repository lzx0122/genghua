<script setup>
import { ref } from "vue";
const toggleMenu = ref(false);

const toggleMenuHandler = () => {
  toggleMenu.value = !toggleMenu.value;
};
</script>

<template>
  <div class="w-screen h-screen flex flex-col mx-auto w-full bg-white">
    <div
      id="nav"
      class="fixed top-0 left-0 w-full flex flex-col z-10 gap-5 justify-between items-start pt-6 pr-2 pb-3 pl-6 w-full text-center whitespace-nowrap bg-white shadow-sm text-zinc-900 transition-all duration-300 ease-out"
    >
      <div
        class="flex gap-5 justify-between items-start pt-6 pr-2 pb-3 pl-6 w-full text-center"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/926d42507257ea90cd91fb72b17d6a1552c829ce2986fc4d8922969dc06d478d?placeholderIfAbsent=true&apiKey=1658e52805814928b66db3bf763c83c5"
          class="cursor-pointer object-contain shrink-0 mt-3.5 w-6 aspect-square"
          alt=""
          @click="toggleMenuHandler"
        />
        <div class="mt-4 text-2xl leading-none">新增顧客</div>
        <div class="flex flex-col text-sm tracking-wide leading-none">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/27277a8596d4744ec4110b3d027c5c95bfd926359dabe4cc3a34fb01b3b7c10f?placeholderIfAbsent=true&apiKey=1658e52805814928b66db3bf763c83c5"
            class="object-contain self-center w-6 aspect-square"
            alt="User avatar"
          />
          <div>廖子翔</div>
        </div>
      </div>

      <div v-if="toggleMenu" class="w-full text-left" id="navbar-hamburger">
        <ul class="flex ml-[10px] flex-col font-medium mt-4 rounded-lg">
          <li>
            <div>查詢寄放商品</div>
          </li>
          <hr />
          <li>
            <div class="text-xl font-semibold">管理</div>
            <ul class="flex ml-[10px] flex-col font-medium mt-1 rounded-lg">
              <li>
                <router-link to="/Admin/AddUser">新增客戶</router-link>
              </li>
              <li>
                <div>查詢寄放商品</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="overflow-y-auto mb-[120px] mt-[110px] bg-white shadow-lg rounded-lg border p-2 cursor-grab active:cursor-grabbing"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
