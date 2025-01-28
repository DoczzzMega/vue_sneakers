<script setup>

  defineProps({
    isAdded: Boolean,
  })

  import {ref} from 'vue';

  const count = ref(0);

  const inc = () => count.value++;

  const updateCount = (event) => count.value = Number(event.target.value);

</script>


<template>

  <p>{{ isAdded }}</p>

  <h1 class="text text-slate-500">{{ count }}</h1>
  <button @click="inc">+</button>
  <input type="text" @input="updateCount" />

  <input type="text" v-model="count" placeholder="v-model" />

</template>


<style scoped>

.text {
  font-size: 40px;
}

</style>
