<script setup>

  import { inject } from 'vue'

  const { closeDrawer } = inject('cart')

</script>

<template>

  <div class="flex items-center gap-4 mb-7">
    <svg @click="closeDrawer" class="rotate-180 opacity-50 hover:opacity-100 hover:-translate-x-1 transition cursor-pointer" width="18" height="16" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7H14.7143" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <h2 class="text-2xl font-bold">Корзина</h2>
  </div>

</template>

<style scoped>

</style>
