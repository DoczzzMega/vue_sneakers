<script setup>
import Card from '@/components/Card.vue'

defineProps({
  items: Array,
})

const emit = defineEmits(['addToFavorite', 'onClickAddPlus'])
</script>

<template>
  <div class="grid grid-cols-4 gap-6">
    <Card
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :price="item.price"
      :is-favorite="item.isFavorite"
      :on-click-favorite="() => emit('addToFavorite', item)"
      :on-click-add="() => emit('onClickAddPlus', item)"
      :is-added="item.isAdded"
    />
  </div>
</template>

<style scoped></style>
