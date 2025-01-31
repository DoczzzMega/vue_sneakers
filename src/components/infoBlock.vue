<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String,
})
</script>

<template>
  <div class="flex flex-col items-center text-center max-w-[250px] mx-auto">
    <img height="100" width="100" class="" :src="imageUrl" alt="Info image" />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-400">{{ description }}</p>
  </div>
</template>

<style scoped></style>
