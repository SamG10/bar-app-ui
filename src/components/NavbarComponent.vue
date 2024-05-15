<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'

const authStore = useAuthStore()
const cartStore = useCartStore()
const isAuthenticated = computed(() => !!localStorage.getItem('token'))

const logout = () => {
  authStore.logout()
}
</script>

<template>
  <nav>
    <div class="d-flex justify-content-space-between">
      <img src="../assets/logo.png" alt="bar'app logo" width="30px" />
      <a href="/">Le Bar'App</a>
    </div>
    <div class="href d-flex align-items-center justify-content-around">
      <a href="/menu">Menu</a>
      <a href="/orders">Orders</a>
    </div>
    <div class="d-flex">
      <div class="me-4 d-flex align-items-center">
        <a href="/cart">
          <div class="d-flex align-items-center">
            <img src="../assets/cart-shop.png" alt="cart-shop" width="30px" class="me-2" />
            <div class="itemCount">{{ cartStore.itemCount === 0 ? ' ' : cartStore.itemCount }}</div>
          </div>
        </a>
      </div>
      <div class="d-flex align-items-center" v-if="!isAuthenticated">
        <a href="/authentication">Connexion</a>
      </div>
      <div class="d-flex align-items-center" v-if="isAuthenticated">
        <a href="/" @click="logout">Logout</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  width: 100%;
  font-family: 'Shrikhand', serif;
  font-weight: 400;
  font-style: normal;
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
}

.itemCount {
  width: 30px;
}

a {
  margin: 0;
  color: #0d2c3e;
  text-decoration: none;
  font-size: 2rem;
}

.href {
  width: 400px;
}
</style>
