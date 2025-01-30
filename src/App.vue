<script setup>
import { onMounted, provide, reactive, ref, watch } from 'vue'
import axios from 'axios'

import Header from '@/components/Header.vue'
import CardList from '@/components/CardList.vue'
import Drawer from '@/components/Drawer.vue'
import Filter from '@/components/Filter.vue'

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const onChangeSelect = (event) => (filters.sortBy = event.target.value)
const onChangeSearchInput = (event) => (filters.searchQuery = event.target.value)

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://1efab2510c8f6c5d.mokky.dev/favorites')

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.productId === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const addToFavorite = async (item) => {
   try {
     if (!item.isFavorite) {
       const obj = {
         productId: item.id,
       }

       item.isFavorite = true
       const { data } =  await axios.post('https://1efab2510c8f6c5d.mokky.dev/favorites', obj)

       item.favoriteId = data.id

     } else {
       item.isFavorite = false
       await axios.delete(`https://1efab2510c8f6c5d.mokky.dev/favorites/${item.favoriteId}`)

       item.favoriteId = null
     }

   } catch (e) {
      console.log(e)
   }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get('https://1efab2510c8f6c5d.mokky.dev/items', {
      // params: {q:1, b:2}
      params,
    })

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false,
      favoriteId: null
    }))
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
})

watch(filters, async () => {
  await fetchItems()
  await fetchFavorites()
})



</script>

<template>
    <Drawer v-if="false" />

  <div class="w-4/5 mx-auto mt-14 bg-white rounded-xl shadow-xl">
    <Header />

    <div class="p-14">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold">Все кроссовки</h2>

        <Filter :on-change-select="onChangeSelect" :on-change-search-input="onChangeSearchInput" />
      </div>

      <CardList :items="items" @addToFavorite="addToFavorite"/>
    </div>
  </div>
</template>

<style scoped></style>
