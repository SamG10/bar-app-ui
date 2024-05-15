import { defineStore } from 'pinia';
import axiosInstance from '../api/config';

interface CartItem {
  id: string;
  name: string;
  ingredients: string;
  size: 'S' | 'M' | 'L';
  price: number;
}

interface CartState {
  items: CartItem[];
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
  }),
  persist: true,
  getters: {
    itemCount: (state) => state.items.length,
    totalPrice: (state) => state.items.reduce((total, item) => total + item.price, 0),
  },
  actions: {
    addItem(item: CartItem) {
      this.items.push(item);
    },
    removeItem(index: number) {
      this.items.splice(index, 1);
    },
    clearCart() {
      this.items = [];
    },
    async placeOrder() {
        const order = {
          number: 1,
          total_price: this.totalPrice,
          status: 'IN_PROGRESS',
          cocktails: this.items.map(item => ({
            id: item.id,
            price: item.price,
          })),
        };
        
        try {
          const response = await axiosInstance.post('/order', order);
          // Vider le panier après la commande
          this.items = [];
          return response.data;
        } catch (error) {
          console.error('Failed to place order:', error);
          throw error;
        }
      },
  }
});