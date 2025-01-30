<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'

import Header from '@/components/Header.vue'
import CardList from '@/components/CardList.vue'
import Drawer from '@/components/Drawer.vue'
import Filter from '@/components/Filter.vue'

const items = ref([])

const sortBy = ref('')
const searchQuery = ref('')

const onChangeSelect = event => sortBy.value = event.target.value
const onSearch = event => searchQuery.value = event.target.value

onMounted(async () => {
  try {
    const { data } = await axios.get('https://1efab2510c8f6c5d.mokky.dev/items')
    items.value = data
  } catch (err) {
    console.log(err)
  }
})

watch(sortBy, async () => {
  try {
    const { data } = await axios.get('https://1efab2510c8f6c5d.mokky.dev/items?sortBy=' + sortBy.value)
    items.value = data
  } catch (err) {
    console.log(err)
    }
  })

watch(searchQuery, async () => {
  try {
    const { data } = await axios.get('https://1efab2510c8f6c5d.mokky.dev/items?title=*' + searchQuery.value + '*')
    items.value = data
    console.log(items)
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <!--  <Drawer />-->

  <div class="w-4/5 mx-auto mt-14 bg-white rounded-xl shadow-xl">
    <Header />

    <div class="p-14">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold">Все кроссовки</h2>

        <Filter :on-change-select="onChangeSelect" :on-search="onSearch" />
      </div>

      <CardList :items="items" />
    </div>
  </div>
</template>

<style scoped></style>
