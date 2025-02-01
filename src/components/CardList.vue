<script setup>
import Card from '@/components/Card.vue'

defineProps({
  items: Array,
  isAddedToFavorites: Boolean,
})

const emit = defineEmits(['addToFavorite', 'onClickAddPlus'])
</script>

<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :title="item.title"
      :image-url="item.imageUrl"
      :price="item.price"
      :is-favorite="item.isFavorite"
      :on-click-favorite="isAddedToFavorites ? null : () => emit('addToFavorite', item)"
      :on-click-add="isAddedToFavorites ? null : () => emit('onClickAddPlus', item)"
      :is-added="item.isAdded"
    />
  </div>
</template>

<style scoped></style>
