import { defineStore } from 'pinia'
import axiosInstance from '../api/config'

export interface CategoryData {
  name: string
}

export interface CocktailData {
  name: string
  image_url: string
  ingredients: string
  price_L: number
  price_M: number
  price_S: number
  categories: string[]
}

const token = localStorage.getItem('token')

export const useMenuStore = defineStore('menu', {
  state: () => ({
    categories: []
  }),
  actions: {
    async fetchCategories() {
      try {
        const response = await axiosInstance.get('/category')
        this.categories = response.data
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    },
    async createCategory(categoryData: CategoryData) {
      try {
        const response = await axiosInstance.post('/category', categoryData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.categories = response.data
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      }
    },
    async createCocktail(cocktailData: CocktailData) {
      try {
        await axiosInstance.post('/cocktails', cocktailData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      } catch (error) {
        console.error('Erreur lors de la création du cocktail:', error)
        throw error
      }
    }
  }
})
