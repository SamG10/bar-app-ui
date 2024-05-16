<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { ref } from 'vue'

const cartStore = useCartStore()

const orderSuccess = ref<boolean>(false)
const orderNumber = ref<number | null>(null)
const orderMessage = ref<string>('')

const placeOrder = async () => {
  try {
    const newOrder = await cartStore.placeOrder()
    orderSuccess.value = true
    orderNumber.value = newOrder.number
    orderMessage.value = `Order placed successfully! Your order number is ${newOrder.number}`
  } catch (error) {
    orderSuccess.value = false
    orderMessage.value = 'Failed to place order. Please try again.'
  }
}
</script>

<template>
  <div class="p-2">
    <div class="itemCard">
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
      <div v-if="orderSuccess" class="order-success">{{ orderMessage }}</div>
      <div v-if="!orderMessage" class="message">
        {{ orderMessage }}
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
  color: black;
  font-weight: bold;
  margin-top: 10px;
}
</style>
