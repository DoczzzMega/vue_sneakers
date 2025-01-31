<script setup>
defineProps({
  totalPrice: Number,
})

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header
    class="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-300 px-6 xs:px-10 py-8"
  >
    <div class="flex items-center gap-4 mb-4 md:mb-0">
      <img src="/logo.png" alt="Logo" class="w-10" />
      <div>
        <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
        <p class="text-slate-400">Магазин лучших кроссовок</p>
      </div>
    </div>

    <ul class="flex flex-col xs:flex-row items-center gap-8 xl:gap-8 mr-14 text-gray-500">
      <li
        @click="emit('openDrawer')"
        class="flex items-center cursor-pointer gap-5 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} руб.</b>
      </li>

      <li class="flex items-center cursor-pointer gap-5 hover:text-black">
        <img class="" src="/heart.svg" alt="Heart" />
        <span class="xs:hidden lg:block">Закладки</span>
      </li>

      <li class="flex items-center cursor-pointer gap-5 hover:text-black">
        <img src="/profile.svg" alt="Profile" />
        <span class="xs:hidden lg:block">Профиль</span>
      </li>
    </ul>
  </header>
</template>

<style scoped></style>
