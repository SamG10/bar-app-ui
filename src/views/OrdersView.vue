<script setup lang="ts">
import { useOrderStore } from '@/api/order';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { computed, onMounted } from 'vue';

const isAuthenticated = computed(() => !!localStorage.getItem('token'));
const orderStore = useOrderStore();

onMounted(() => {
  orderStore.fetchOrders();
});

const goToOrderDetails = (orderId: string) => {    
    if (isAuthenticated.value) {
    router.push({ name: 'orderDetails', params: { id: orderId } });
  } else {
    alert("You must have an account to access this resource")
  }
};
</script>

<template>
    <div class="container d-flex flex-column">
        <h2 class="mb-3">Order list</h2>
        <div v-if="orderStore.orders.length === 0">
            <p>No orders found.</p>
        </div>
        <div class="cardOrder d-flex justify-content-start align-items-center m-2" v-else v-for="order in orderStore.orders" :key="order.id" @click="goToOrderDetails(order.id)">
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

p {
    margin: 0;
}
</style>