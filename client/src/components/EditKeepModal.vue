<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useDataStore } from "../stores/Data";
const DataStore = useDataStore();
const { AddKeepPickup } = DataStore;

const { selectKeepsData } = defineProps(["selectKeepsData", "show"]);
const isLoading = ref(false);

const amount = ref(1);

const checkAmount = () => {
  if (amount.value < 1) amount.value = 1;
  if (amount.value > selectKeepsData.RemainingAmount)
    amount.value = selectKeepsData.RemainingAmount;
};

const submit = () => {
  console.log(selectKeepsData, amount);
  AddKeepPickup(selectKeepsData.id, amount.value);
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
    v-if="show"
    class="modal-mask text-lg tracking-normal leading-none rounded-none"
  >
    <section
      class="modal-container flex overflow-hidden flex-col items-start px-7 py-6 w-full bg-white rounded-3xl border-solid border-[3px] border-[color:var(--black,#1B1B1B)]"
    >
      <p class="text-2xl tracking-wide text-zinc-900">寄放商品領取</p>

      <div
        class="flex flex-col justify-start mt-4 w-full text-lg leading-loose rounded max-w-[335px] text-zinc-900"
      >
        <div>
          <label
            for="itemName"
            class="text-left truncate w-[120px] w-max-[120px]"
            >商品名稱</label
          >
          <!-- 搜尋輸入框 -->
          <div
            class="relative w-60 w-full border border-black rounded p-2 bg-white text-black"
          >
            {{ selectKeepsData?.Item.Name }}
          </div>
        </div>
        <div>
          <label
            for="itemName"
            class="text-left truncate w-[120px] w-max-[120px]"
            >商品數量</label
          >
          <!-- 搜尋輸入框 -->
          <div
            class="relative w-60 border border-black w-full rounded p-2 bg-white"
          >
            {{ selectKeepsData?.Amount }}
          </div>
        </div>
        <div>
          <label
            for="itemName"
            class="text-left truncate w-[120px] w-max-[120px]"
            >商品剩餘</label
          >
          <!-- 搜尋輸入框 -->
          <div
            class="relative w-60 border border-black w-full rounded p-2 bg-white"
          >
            {{ selectKeepsData?.RemainingAmount }}
          </div>
        </div>
      </div>
      <div
        class="flex flex-col mt-4 w-full text-lg leading-loose rounded max-w-[335px] text-zinc-900"
      >
        <label for="amount" class="self-start">領取數量</label>
        <div class="flex items-center">
          <input
            type="number"
            id="amount"
            placeholder="領取數量"
            min="1"
            v-model="amount"
            @blur="checkAmount"
            @keyup.enter="checkAmount"
            class="flex text-center max-w-[100px] gap-2.5 mr-2 py-3 h-12 bg-white rounded border-2 border-solid border-zinc-900 appearance-auto"
          />
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
            class="mr-2"
            @click="amount <= 1 ? 1 : amount--"
          >
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
              sketch:type="MSPage"
            >
              <g
                id="Icon-Set"
                sketch:type="MSLayerGroup"
                transform="translate(-152.000000, -1035.000000)"
                fill="#000000"
              >
                <path
                  d="M174,1050 L162,1050 C161.448,1050 161,1050.45 161,1051 C161,1051.55 161.448,1052 162,1052 L174,1052 C174.552,1052 175,1051.55 175,1051 C175,1050.45 174.552,1050 174,1050 L174,1050 Z M182,1063 C182,1064.1 181.104,1065 180,1065 L156,1065 C154.896,1065 154,1064.1 154,1063 L154,1039 C154,1037.9 154.896,1037 156,1037 L180,1037 C181.104,1037 182,1037.9 182,1039 L182,1063 L182,1063 Z M180,1035 L156,1035 C153.791,1035 152,1036.79 152,1039 L152,1063 C152,1065.21 153.791,1067 156,1067 L180,1067 C182.209,1067 184,1065.21 184,1063 L184,1039 C184,1036.79 182.209,1035 180,1035 L180,1035 Z"
                  id="minus-square"
                  sketch:type="MSShapeGroup"
                ></path>
              </g>
            </g>
          </svg>
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
            @click="
              amount >= selectKeepsData.RemainingAmount
                ? (amount = selectKeepsData.RemainingAmount)
                : amount++
            "
          >
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
              sketch:type="MSPage"
            >
              <g
                id="Icon-Set-Filled"
                sketch:type="MSLayerGroup"
                transform="translate(-102.000000, -1037.000000)"
                fill="#000000"
              >
                <path
                  d="M124,1054 L119,1054 L119,1059 C119,1059.55 118.552,1060 118,1060 C117.448,1060 117,1059.55 117,1059 L117,1054 L112,1054 C111.448,1054 111,1053.55 111,1053 C111,1052.45 111.448,1052 112,1052 L117,1052 L117,1047 C117,1046.45 117.448,1046 118,1046 C118.552,1046 119,1046.45 119,1047 L119,1052 L124,1052 C124.552,1052 125,1052.45 125,1053 C125,1053.55 124.552,1054 124,1054 L124,1054 Z M130,1037 L106,1037 C103.791,1037 102,1038.79 102,1041 L102,1065 C102,1067.21 103.791,1069 106,1069 L130,1069 C132.209,1069 134,1067.21 134,1065 L134,1041 C134,1038.79 132.209,1037 130,1037 L130,1037 Z"
                  id="plus-square"
                  sketch:type="MSShapeGroup"
                ></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <footer
        class="flex gap-5 justify-between mt-14 w-full text-center whitespace-nowrap"
      >
        <div
          class="gap-1.5 self-stretch px-5 py-2 text-black rounded-lg border border-solid border-zinc-400"
          @click="$emit('close')"
        >
          關閉
        </div>
        <div
          class="gap-1.5 self-stretch px-5 py-2 text-white rounded-lg bg-zinc-900"
          @click="submit"
        >
          領取
        </div>
      </footer>
    </section>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

input[type="checkbox"]:checked + label div svg {
  display: block;
}
</style>
