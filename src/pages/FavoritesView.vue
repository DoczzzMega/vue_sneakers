<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import Filter from '@/components/Filter.vue'
import CardList from '@/components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://1efab2510c8f6c5d.mokky.dev/favorites?_relations=items',
    )

    favorites.value = data.map((obj) => obj.item)
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <div class="md:flex-wrap flex flex-col md:flex-row md:justify-between md:items-center mb-8">
    <h2 class="mb-7 md:mb-7 text-xl xs:text-2xl sm:text-3xl font-bold">Мои закладки</h2>
  </div>

  <CardList :items="favorites" is-added-to-favorites />
</template>

<style scoped></style>
