<script setup>
import { reactive, inject, ref, watch, onMounted } from 'vue'
import axios from 'axios'
import Filter from '@/components/Filter.vue'
import CardList from '@/components/CardList.vue'

const { addToCart, removeFromCart, cart } = inject('cart')

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const onChangeSelect = (event) => (filters.sortBy = event.target.value)
const onChangeSearchInput = (event) => (filters.searchQuery = event.target.value)

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
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
      favoriteId: null,
    }))
  } catch (err) {
    console.log(err)
  }
}

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
      const { data } = await axios.post('https://1efab2510c8f6c5d.mokky.dev/favorites', obj)

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

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()

  //для обновления кнопок, которые есть в localstorage
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id),
  }))
})

watch(filters, async () => {
  await fetchItems()
  await fetchFavorites()
})

// сработает при полном очищении корзины
watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false,
  }))
})
</script>

<template>
  <div class="md:flex-wrap flex flex-col md:flex-row md:justify-between md:items-center mb-8">
    <h2 class="mb-7 md:mb-7 text-xl xs:text-2xl sm:text-3xl font-bold">Все кроссовки</h2>

    <Filter :on-change-select="onChangeSelect" :on-change-search-input="onChangeSearchInput" />
  </div>

  <CardList :items="items" @add-to-favorite="addToFavorite" @on-click-add-plus="onClickAddPlus" />
</template>

<style scoped></style>
