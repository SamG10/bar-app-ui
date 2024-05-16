<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMenuStore } from '../stores/menu'

export interface Category {
  id: string
  name: string
}

const menuStore = useMenuStore()

const newCategoryName = ref('')
const newCocktail = ref({
  name: '',
  image_url: '',
  ingredients: '',
  price_L: 0,
  price_M: 0,
  price_S: 0,
  categories: []
})
const categories = ref<Category[]>([])

const createCategory = async () => {
  try {
    await menuStore.createCategory({ name: newCategoryName.value })
    newCategoryName.value = ''
  } catch (error) {
    console.error('Failed to create category:', error)
  }
}

const createCocktail = async () => {
  try {
    await menuStore.createCocktail(newCocktail.value)
    newCocktail.value.name = ''
    newCocktail.value.ingredients = ''
    newCocktail.value.image_url = ''
    newCocktail.value.price_L = 0
    newCocktail.value.price_M = 0
    newCocktail.value.price_S = 0
    newCocktail.value.categories = []
  } catch (error) {
    console.error('Failed to create cocktail:', error)
  }
}

const getAllCategories = async () => {
  try {
    await menuStore.fetchCategories()
    categories.value = menuStore.categories
  } catch (error) {
    console.log('Failed to fetch categories')
  }
}

console.log('categories', categories.value)

onMounted(() => {
  getAllCategories()
})
</script>

<template>
  <div class="container">
    <h2>Create category</h2>
    <form @submit.prevent="createCategory">
      <div class="form-group col-md-3">
        <label for="categoryName">Category name:</label>
        <input
          class="form-control"
          type="text"
          id="categoryName"
          v-model="newCategoryName"
          required
        />
        <button type="submit" class="btn btn-primary mt-2">Create</button>
      </div>
    </form>

    <h2>Create cocktail</h2>
    <form @submit.prevent="createCocktail">
      <div class="form-group">
        <label for="cocktailName">Cocktail name:</label>
        <input
          type="text"
          class="form-control"
          id="cocktailName"
          v-model="newCocktail.name"
          required
        />
        <div class="d-flex flex-column">
          <label for="cocktailName">Ingredients:</label>
          <input
            type="text"
            class="form-control"
            id="cocktailIngredients"
            v-model="newCocktail.ingredients"
            required
          />
          <small id="help" class="form-text text-muted mb-3"
            >Separate ingredients with commas</small
          >
        </div>
        <label for="cocktailImageUrl">image url:</label>
        <input
          type="text"
          class="form-control"
          id="imageUrl"
          v-model="newCocktail.image_url"
          required
        />

        <label for="cocktailPriceS">price S:</label>
        <input
          type="number"
          min="1"
          step="0.01"
          class="form-control"
          id="priceS"
          v-model="newCocktail.price_S"
          required
        />

        <label for="cocktailPriceM">price M:</label>
        <input
          type="number"
          min="1"
          step="0.01"
          class="form-control"
          id="priceM"
          v-model="newCocktail.price_M"
          required
        />

        <label for="cocktailPriceL">price L:</label>
        <input
          type="number"
          min="1"
          step="0.01"
          class="form-control"
          id="priceL"
          v-model="newCocktail.price_L"
          required
        />

        <label for="categories">Categories:</label>
        <select id="categories" class="form-control" v-model="newCocktail.categories" multiple>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <small id="help" class="form-text text-muted">You can select multiple categories</small>
      </div>

      <button type="submit" class="btn btn-primary mt-2">Create</button>
    </form>
  </div>
</template>

<style scoped></style>
