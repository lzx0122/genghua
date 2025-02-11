<script setup>
defineProps(["userlogs"]);
</script>

<template>
  <div
    class="flex flex-col overflow-y-auto min-h-[500px] max-h-[500px] items-center px-6 mt-5 w-full text-base tracking-wide rounded-md"
    role="list"
    aria-label="Transaction History"
  >
    <div
      v-for="log in userlogs"
      class="flex gap-5 justify-between py-3 w-full bg-white border-b-2 border-solid border-b-zinc-900"
      role="listitem"
    >
      <div class="flex gap-2.5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/1658e52805814928b66db3bf763c83c5/bc52c0ecbf45ac0162e7ce0956322c4d1472b0c8c12760836c29f7e52726f959?apiKey=1658e52805814928b66db3bf763c83c5&"
          class="object-contain shrink-0 w-12 aspect-square fill-zinc-100"
          alt="Latte Transaction Icon"
        />
        <div class="flex flex-col">
          <div class="self-start text-zinc-900">{{ log.title }}</div>
          <div class="mt-1 text-stone-500">{{ log.datetime }}</div>
        </div>
      </div>
      <div class="self-start text-zinc-900">
        編號{{ log.index + 1 }} {{ log.desc }}
      </div>
    </div>
  </div>
</template>