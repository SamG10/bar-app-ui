import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/MenuView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/OrdersView.vue')
    },
    {
      path: '/order/:id',
      name: 'orderDetails',
      component: () => import('../views/OrderDetailsView.vue')
    },
    {
      path: '/createMenu',
      name: 'createMenu',
      component: () => import('../views/CreateMenuView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  const userRole = authStore.role

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next({ name: 'login' })
    } else if (to.meta.role && to.meta.role !== userRole) {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
