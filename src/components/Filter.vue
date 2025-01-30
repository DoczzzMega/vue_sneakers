<script setup>

defineProps({
  onChangeSelect: Function,
  onChangeSearchInput: Function,
})

</script>

<template>

  <div class="flex gap-5">
    <select @change="onChangeSelect" class="border px-3 py-2 rounded-md outline-none focus:border-gray-400 ">
      <option value="title">По названию</option>
      <option value="price">По цене (дешевые)</option>
      <option value="-price">По цене (дорогие)</option>
    </select>

    <div class="relative">
      <img class="absolute top-3 left-4" src="/search.svg" alt="Search">
      <input @input="onChangeSearchInput" class="border rounded-md pl-11 pr-4 py-2 outline-none focus:border-gray-400"
             type="text"
             placeholder="Поиск..."
      >
    </div>
  </div>

</template>

<style scoped>

</style>
