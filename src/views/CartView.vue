<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { ref } from 'vue';

const cartStore = useCartStore();

const errorMessage = ref<string | null>(null);
const orderSuccess = ref<boolean>(false);

const placeOrder = async () => {
  try {
    await cartStore.placeOrder();
    orderSuccess.value = true;
    errorMessage.value = null;
  } catch (error) {
    errorMessage.value = 'Failed to place order. Please try again.';
    orderSuccess.value = false;
  }
};
</script>

<template>
    <div>
      <h2>Panier</h2>
      <div v-if="cartStore.items.length === 0">
        <p>Votre panier est vide</p>
      </div>
      <div v-else>
        <div v-for="(item, index) in cartStore.items" :key="index" class="cart-item">
          <div>{{ item.name }} ({{ item.size }}) - ${{ item.price }}</div>
          <button @click="cartStore.removeItem(index)">Remove</button>
        </div>
        <div>
          <strong>Total: ${{ cartStore.totalPrice }}</strong>
        </div>
        <button @click="placeOrder">Commander</button>
        <div v-if="orderSuccess" class="order-success">
          Commande passée avec succès!
        </div>
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

.order-success {
  color: green;
  margin-top: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>