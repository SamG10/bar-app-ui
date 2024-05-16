<script setup lang="ts">
import { useRoute } from 'vue-router'
import axiosInstance from '../api/config'
import { onMounted, ref, watch, watchEffect } from 'vue'

export type Step = 'ASSEMBLY' | 'DRESSAGE' | 'COMPLETED'

export interface CocktailItem {
  id: string
  cocktail: Cocktail
  price: number
  step: string
}

export interface Cocktail {
  id: string
  name: string
  image_url: string
  ingredients: string
  price_L: number
  price_M: number
  price_S: number
}

export interface OrderDetails {
  id: string
  number: number
  total_price: number
  status: string
}

const route = useRoute()
const orderId = route.params.id
const orderCocktails = ref<CocktailItem[]>([])
const orderDetails = ref<OrderDetails>({
  id: '',
  number: 0,
  total_price: 0,
  status: ''
})

const token = localStorage.getItem('token')

const fetchCocktailsOrder = async () => {
  try {
    const response = await axiosInstance.get(`/order/${orderId}/cocktails`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    orderCocktails.value = response.data
  } catch (error) {
    console.error('Failed to fetch order details:', error)
  }
}

const fetchOrderDetails = async () => {
  try {
    const response = await axiosInstance.get(`/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    console.log(response.data)

    orderDetails.value = response.data
  } catch (error) {
    console.error('Failed to fetch order details:', error)
  }
}

const selectStep = async (cocktailItem: CocktailItem, step: string) => {
  try {
    await axiosInstance.patch(
      `/order/${orderId}/cocktails/${cocktailItem.id}`,
      { step },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    cocktailItem.step = step
    triggerWatch.value = !triggerWatch.value
  } catch (error) {
    console.error('Failed to update cocktail step:', error)
  }
}

const triggerWatch = ref(false)

const updateOrderStatus = async (cocktailItem: CocktailItem, step: string) => {
  await selectStep(cocktailItem, step)
}

watch(
  triggerWatch,
  async () => {
    try {
      await fetchOrderDetails()
    } catch (error) {
      console.error('Failed to fetch order details:', error)
    }
  },
  { immediate: true } // Déclencher immédiatement le watch lors de la création du composant
)

onMounted(() => {
  fetchCocktailsOrder()
  fetchOrderDetails()
})
</script>

<template>
  <div class="p-2">
    <h2>Order number : {{ orderDetails?.number }}</h2>
    <p>Status: {{ orderDetails?.status }}</p>
    <p>Total: ${{ orderDetails?.total_price }}</p>
    <div v-if="orderCocktails.length > 0">
      <div
        v-for="cocktailItem in orderCocktails"
        :key="cocktailItem.id"
        class="cardCocktail d-flex align-items-center mb-3"
      >
        <img
          :src="cocktailItem.cocktail.image_url"
          :alt="cocktailItem.cocktail.name"
          width="150px"
          class="me-3"
        />
        <h3 class="me-3 w-50">{{ cocktailItem.cocktail.name }}</h3>
        <div>
          <button
            class="btn btn-outline-dark"
            v-for="step in ['ASSEMBLY', 'DRESSAGE', 'COMPLETED']"
            :key="step"
            :class="{ selected: cocktailItem.step === step }"
            @click="updateOrderStatus(cocktailItem, step)"
          >
            {{ step }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  margin-right: 10px;
}
.cardCocktail {
  background-color: white;
  padding: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
button.selected {
  background-color: green;
  color: white;
}
</style>
