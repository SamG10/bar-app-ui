<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { ref } from 'vue'

const cartStore = useCartStore()

const errorMessage = ref<string | null>(null)
const orderSuccess = ref<boolean>(false)

const placeOrder = async () => {
  try {
    await cartStore.placeOrder()
    orderSuccess.value = true
    errorMessage.value = null
  } catch (error) {
    errorMessage.value = 'Failed to place order. Please try again.'
    orderSuccess.value = false
  }
}
</script>

<template>
  <div class="p-2">
    <div v-if="cartStore.items.length === 0">
      <p>Your cart is empty</p>
    </div>
    <div class="itemCard" v-else>
      <div v-for="(item, index) in cartStore.items" :key="index" class="cart-item">
        <div class="d-flex flex-row align-items-center">
          <img :src="item.image_url" alt="cocktail_image" width="100px" class="me-4" />
          <h6>{{ item.name }} ({{ item.size }}) - ${{ item.price }}</h6>
        </div>
        <button class="btn btn-danger" @click="cartStore.removeItem(index)">Remove</button>
      </div>
      <div>
        <h4>Total: {{ cartStore.totalPrice }} €</h4>
      </div>
      <button class="btn btn-info" @click="placeOrder">Ordered</button>
      <div v-if="orderSuccess" class="order-success">Order placed successfully!</div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}
.itemCard {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 10px;
}

.order-success {
  color: green;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
