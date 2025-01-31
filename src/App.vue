<script setup>
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
import axios from 'axios'

import Header from '@/components/Header.vue'
import CardList from '@/components/CardList.vue'
import Drawer from '@/components/Drawer.vue'
import Filter from '@/components/Filter.vue'

const items = ref([])

const cart = ref([])

const isCreatingOrder = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const vatPrice = computed(() => Math.round(totalPrice.value * 5) / 100)

const cartIsEmpty = computed(() => cart.value.length === 0)
const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://1efab2510c8f6c5d.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value,
    })

    cart.value = []

    return data
  } catch (e) {
    console.log(e)
  } finally {
    isCreatingOrder.value = false
  }
}

const drawerIsOpened = ref(false)

const openDrawer = () => {
  drawerIsOpened.value = true
}

const closeDrawer = () => {
  drawerIsOpened.value = false
}

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

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

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true },
)

provide('cart', {
  cart,
  openDrawer,
  closeDrawer,
  removeFromCart,
})
</script>

<template>
  <Drawer
    v-if="drawerIsOpened"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    @create-order="createOrder"
    :cart-button-disabled="cartButtonDisabled"
    :is-creating-order="isCreatingOrder"
  />

  <div class="w-4/5 mx-auto mt-14 bg-white rounded-xl shadow-xl">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-6 xs:p-14">
      <div class="md:flex-wrap flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <h2 class="mb-7 md:mb-7 text-xl xs:text-2xl sm:text-3xl font-bold">Все кроссовки</h2>

        <Filter :on-change-select="onChangeSelect" :on-change-search-input="onChangeSearchInput" />
      </div>

      <CardList
        :items="items"
        @add-to-favorite="addToFavorite"
        @on-click-add-plus="onClickAddPlus"
      />
    </div>
  </div>
</template>

<style scoped></style>
