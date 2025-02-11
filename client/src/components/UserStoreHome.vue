<script setup>
import { useDataStore } from "../stores/Data";
import { computed } from "vue";
const DataStore = useDataStore();
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
const { UserSearchData } = storeToRefs(DataStore);
const sortKeeps = computed(() =>
  [...UserSearchData.value.Keeps].sort(
    (a, b) => b.DateTime.seconds - a.DateTime.seconds
  )
);
</script>

<template>
  <div class="flex flex-col px-4 mt-3.5 w-full">
    <div
      class="flex flex-col items-start self-center px-4 py-4 w-full rounded-lg border-4 border-solid border-zinc-800 max-w-[335px] text-zinc-800"
    >
      <div class="flex gap-6 text-center whitespace-nowrap">
        <div class="my-auto text-2xl">{{ UserSearchData.Name }}</div>
        <div class="text-3xl basis-auto">
          {{ UserSearchData.MonthDay.replace("-", "月") + "日" }}
        </div>
      </div>
      <div
        class="flex gap-3 px-2.5 py-1.5 mt-2 ml-3 text-lg tracking-normal leading-none bg-white rounded-lg border-4 border-solid border-zinc-900"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/1658e52805814928b66db3bf763c83c5/8ed27068e2b86736d3b2f1dbf63e952cbc1b693363b7f29857093d7b8572e8cb?apiKey=1658e52805814928b66db3bf763c83c5&"
          class="object-contain shrink-0 w-6 aspect-square"
          alt="Phone Icon"
        />
        <div>電話:</div>
        <div class="basis-auto">{{ UserSearchData.Account }}</div>
      </div>
    </div>
    <div
      class="self-start mt-4 text-2xl leading-none text-center text-zinc-900"
      role="heading"
      aria-level="2"
    >
      您的庫存
    </div>
    <div class="overflow-x-auto w-full">
      <div class="flex gap-4 items-start mt-5 whitespace-nowrap">
        <div
          v-for="(keep, index) in sortKeeps"
          :key="keep.id"
          class="flex flex-col w-[150px] shrink-0"
          tabindex="0"
          role="article"
          aria-label="Large Latte Stock"
        >
          <div
            class="flex overflow-hidden flex-col justify-center items-center px-4 py-10 w-full border-2 border-solid bg-zinc-100 border-zinc-900 rounded-t-lg"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/1658e52805814928b66db3bf763c83c5/3f99a80673c020e4d1b4351e57d0eeb35b539a3ade9906fe51e6f0466dfa7d6b?apiKey=1658e52805814928b66db3bf763c83c5&"
              class="object-contain w-6 aspect-square"
              alt="Coffee Cup Icon"
            />
          </div>
          <div
            class="flex flex-col px-3 py-4 w-full bg-white rounded-none border-2 border-solid border-zinc-900 text-zinc-900"
          >
            <div class="text-sm tracking-wide">
              {{ index + 1 }}
            </div>
            <div class="text-lg tracking-normal leading-none">
              {{ keep.Item.Name }}
            </div>
            <div class="mt-1 text-xs tracking-wide">
              剩餘數量: {{ keep.Amount }}
            </div>
            <div class="text-xs tracking-wide">
              {{
                dayjs(keep.DateTime.seconds * 1000).format(
                  "YYYY MM月DD日 HH:mm"
                )
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>