<script setup>
import DrawerHead from '@/components/DrawerHead.vue'
import CartItemList from '@/components/CartItemList.vue'
import { inject, defineEmits } from 'vue'
import InfoBlock from '@/components/infoBlock.vue'

defineProps({
  totalPrice: Number,
  vatPrice: Number,
  cartButtonDisabled: Boolean,
  isCreatingOrder: Boolean,
})

const emit = defineEmits(['createOrder'])

const { closeDrawer } = inject('cart')
</script>

<template>
  <div
    @click="closeDrawer"
    class="my-cart-modal fixed top-0 left-0 w-full h-full bg-black z-10 opacity-70"
  ></div>

  <div class="fixed top-0 right-0 w-96 h-full bg-white z-20 p-8 flex flex-col overflow-y-auto">
    <DrawerHead />

    <div v-if="!totalPrice" class="flex h-full items-center">
      <InfoBlock
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        image-url="/package-icon.png"
      />
    </div>

    <CartItemList v-if="totalPrice" />

    <div class="flex flex-col gap-5 my-6">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed border-gray-400"></div>
        <b>{{ totalPrice }} руб.</b>
      </div>

      <div class="flex gap-2">
        <span>Налог 5%:</span>
        <div class="flex-1 border-b border-dashed border-gray-400"></div>
        <b>{{ vatPrice }} руб.</b>
      </div>
    </div>

    <button
      :disabled="cartButtonDisabled"
      @click="emit('createOrder')"
      class="bg-lime-500 w-full py-3 rounded-xl text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 transition"
    >
      {{ isCreatingOrder ? 'Создание заказа' : 'Оформить заказ' }}
    </button>
  </div>
</template>

<style scoped></style>
