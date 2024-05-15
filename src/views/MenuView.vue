<script setup lang="ts">
import { fetchCocktailsByCategory } from '@/api/menu';
import { useCartStore } from '@/stores/cart';
import { onMounted, ref } from 'vue';

interface Cocktail {
  id: string;
  name: string;
  image_url: string;
  ingredients: string;
  price_L: number;
  price_M: number;
  price_S: number;
}

interface CocktailsByCategory {
  [key: string]: Cocktail[];
}
const colors = ['#91C2C5', '#F4A261', '#E76F51', '#2A9D8F', '#E9C46A'];
const cocktailsByCategory = ref<CocktailsByCategory>({});
const cartStore = useCartStore();


const addToCart = (cocktail: Cocktail, size: 'S' | 'M' | 'L') => {    
  let price = 0;
  switch (size) {
    case 'S':
      price = cocktail.price_S;
      break;
    case 'M':
      price = cocktail.price_M;
      break;
    case 'L':
      price = cocktail.price_L;
      break;
  }
  cartStore.addItem({
    id: cocktail.id,
    name: cocktail.name,
    ingredients: cocktail.ingredients,
    size,
    price
  });

  console.log(cartStore.$state);
};

const loadCocktails = async () => {
  try {
    cocktailsByCategory.value = await fetchCocktailsByCategory();
  } catch (error) {
    console.error('Failed to load cocktails:', error);
  }
};

onMounted(() => {
  loadCocktails();
});
</script>

<template>
    <div class="container">
    <div class="d-flex flex-column justify-content-center">
    <div class="cocktailCards" v-for="(cocktails, category, index) in cocktailsByCategory" :key="category">
        <h2 class="mb-2">{{ category }}</h2>
        <div class="cocktailCard p-4 m-2" v-for="cocktail in cocktails" :key="cocktail.id" :style="{ backgroundColor: !cocktails.length ? 'white' : colors[index % colors.length] }">
            <div class="d-flex align-items-center">
                <div class="me-4">
                    <img :src="cocktail.image_url" :alt="cocktail.name" width="150px" />
                </div>
                <div class="d-flex justify-content-between w-100">
                    <div class="d-flex flex-column">
                        <h3>{{ cocktail.name }}</h3>
                        <span>{{ cocktail.ingredients }}</span>
                    </div>
                    <div class="d-flex flex-column">
                        <button @click="addToCart(cocktail, 'L')" type="button" class="btn btn-info m-1">Large: {{ cocktail.price_L }} €</button>
                        <button @click="addToCart(cocktail, 'M')" type="button" class="btn btn-warning m-1">Medium: {{ cocktail.price_M }} €</button>
                        <button @click="addToCart(cocktail, 'S')" type="button" class="btn btn-success m-1">Small: {{ cocktail.price_S }} €</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
}
.cocktailCards {
    width: 1000px;
    background-color: white;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.cocktailCard {
    background-color: #fff;
}

p {
    font-weight: bold;
}
</style>