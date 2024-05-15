<script setup lang="ts">
import { useRoute } from 'vue-router'
import axiosInstance from '../api/config'
import { onMounted, ref } from 'vue'

export type Step = 'PREPARATION' | 'ASSEMBLY' | 'DRESSAGE' | 'COMPLETED'

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

    orderDetails.value = response.data
  } catch (error) {
    console.error('Failed to fetch order details:', error)
  }
}

const selectStep = async (cocktailItem: CocktailItem, step: string) => {
  try {
    await axiosInstance.patch(
      `/order/${orderId}/cocktails/${cocktailItem.cocktail.id}`,
      { step },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    cocktailItem.step = step
  } catch (error) {
    console.error('Failed to update cocktail step:', error)
  }
}

onMounted(() => {
  fetchCocktailsOrder()
  fetchOrderDetails()
})
</script>

<template>
  <div>
    <h2>Détails de la commande #{{ orderDetails?.number }}</h2>
    <p>Status: {{ orderDetails?.status }}</p>
    <p>Total: ${{ orderDetails?.total_price }}</p>
    <div v-if="orderCocktails.length > 0">
      <div v-for="cocktailItem in orderCocktails" :key="cocktailItem.id">
        <h3>{{ cocktailItem.cocktail.name }}</h3>
        <img
          :src="cocktailItem.cocktail.image_url"
          :alt="cocktailItem.cocktail.name"
          width="150px"
        />
        <div>
          <button
            v-for="step in ['ASSEMBLY', 'DRESSAGE', 'COMPLETED']"
            :key="step"
            :class="{ selected: cocktailItem.step === step }"
            @click="selectStep(cocktailItem, step)"
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

button.selected {
  background-color: green;
  color: white;
}
</style>
