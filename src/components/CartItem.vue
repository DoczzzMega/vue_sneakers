<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
})

const emit = defineEmits(['onClickRemove'])
</script>

<template>
  <div class="flex items-center gap-4 border border-slate-200 p-4 rounded-xl">
    <img class="w-16 h-16" :src="imageUrl" alt="Sneaker" />

    <div class="w-[150px]">
      <p class="mb-2">{{ title }}</p>
      <b>{{ price }} руб.</b>
    </div>

    <div class="pt-12">
      <img
        @click="emit('onClickRemove')"
        class="opacity-50 hover:opacity-100 cursor-pointer"
        src="/close.svg"
        alt="Close"
      />
    </div>
  </div>
</template>

<style scoped></style>
