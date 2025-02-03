<script setup>
import HelloWorld from "./views/AddUser.vue";
import AddUser from "./views/AddUser.vue";
</script>

<template>
  <div class="flex flex-col mx-auto w-full bg-white max-w-[480px]">
    <div
      class="flex gap-5 justify-between items-start pt-6 pr-2 pb-3 pl-6 w-full text-center whitespace-nowrap bg-white shadow-sm text-zinc-900"
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/926d42507257ea90cd91fb72b17d6a1552c829ce2986fc4d8922969dc06d478d?placeholderIfAbsent=true&apiKey=1658e52805814928b66db3bf763c83c5"
        class="object-contain shrink-0 mt-3.5 w-6 aspect-square"
        alt=""
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

    <AddUser></AddUser>
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
