import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/catalog?category=:category&name=:searchName?',
      name: 'catalog',
      props:true,
      component: () => import('../views/CatalogView.vue')
    }
  ]
})

export default router
