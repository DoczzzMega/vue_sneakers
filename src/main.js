import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from './App.vue'

import HomeView from './pages/HomeView.vue'
import FavoritesView from './pages/FavoritesView.vue'

// createApp(App).use(autoAnimatePlugin).mount('#app')

const app = createApp(App)

const routes = [
  { path: '/', component: HomeView },
  { path: '/favorites', component: FavoritesView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
