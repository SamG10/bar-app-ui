<script setup lang="ts">
import { useOrderStore } from '@/stores/order'
import router from '@/router'
import { computed, onMounted, onUnmounted, ref } from 'vue'

const isAuthenticated = computed(() => !!localStorage.getItem('token'))
const orderStore = useOrderStore()

onMounted(() => {
  orderStore.fetchOrders()
  startPolling()
})

const goToOrderDetails = (orderId: string) => {
  if (isAuthenticated.value) {
    router.push({ name: 'orderDetails', params: { id: orderId } })
  } else {
    alert('You must have an account to access this resource')
  }
}

onUnmounted(() => {
  stopPolling()
})

const pollingInterval = ref<number | null>(null)

const startPolling = () => {
  if (!pollingInterval.value) {
    pollingInterval.value = setInterval(async () => {
      await orderStore.fetchOrders()
    }, 10000) // Check for updates every 5 seconds
  }
}

const stopPolling = () => {
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value)
    pollingInterval.value = null
  }
}
</script>

<template>
  <div class="container d-flex flex-column">
    <div v-if="orderStore.orders.length === 0">
      <p>No orders found.</p>
    </div>
    <div
      class="cardOrder d-flex justify-content-start align-items-center m-2"
      :class="{
        completed: order.status === 'COMPLETED',
        inProgress: order.status === 'IN_PROGRESS'
      }"
      v-else
      v-for="order in orderStore.orders"
      :key="order.id"
      @click="goToOrderDetails(order.id)"
    >
      <h3 class="me-5 mb-0">Order : {{ order.number }}</h3>
      <p>Status: {{ order.status }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 1200px;
  min-height: 600px;
}

.cardOrder {
  background-color: #fff;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.cardOrder.completed {
  background-color: #e3f6b9;
}

.cardOrder.inProgress {
  background-color: #fff;
}

p {
  margin: 0;
}
</style>
