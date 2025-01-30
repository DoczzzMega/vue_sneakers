<script setup>

  import Card from '@/components/Card.vue'

  defineProps({
    items: Array
  })

</script>

<template>

  <div class="grid grid-cols-4 gap-6">


    <Card v-for="item in items"
          :key="item.id"
          :title="item.title"
          :image-url="item.imageUrl"
          :price="item.price"
    />


  </div>

</template>

<style scoped>

</style>
