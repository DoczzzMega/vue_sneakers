<script setup>

import DrawerHead from '@/components/DrawerHead.vue'
import CartItem from '@/components/CartItem.vue'
import CartItemList from '@/components/CartItemList.vue'

</script>

<template>

  <div class="fixed top-0 left-0 w-full h-full bg-black z-10 opacity-70"></div>

  <div class="fixed top-0 right-0 w-96 h-full bg-white z-20 p-8 flex flex-col">

    <DrawerHead />

    <CartItemList />

    <div class="flex flex-col gap-5 my-6">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed border-gray-400"></div>
        <b>21 498 руб.</b>
      </div>

      <div class="flex gap-2">
        <span>Налог 5%:</span>
        <div class="flex-1 border-b border-dashed border-gray-400"></div>
        <b>1074 руб.</b>
      </div>
    </div>

    <button :disabled="false"
            class="bg-lime-500 w-full py-3 rounded-xl text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 transition"
    >
      Оформить заказ
    </button>

  </div>

</template>

<style scoped>

</style>
