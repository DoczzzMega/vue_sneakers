<script setup>
import { computed, provide, ref, watch } from 'vue'
import axios from 'axios'

import Header from '@/components/Header.vue'
import Drawer from '@/components/Drawer.vue'
import HomeView from '@/pages/HomeView.vue'

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

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true },
)

provide('cart', {
  cart,
  closeDrawer,
  addToCart,
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
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
