import { defineStore } from 'pinia';
import axiosInstance from '../api/config';

interface Order {
  id: string;
  number: number;
  total_price: number;
  status: string;
  cocktails: {
    id: string;
    price: number;
  }[];
}

interface OrderState {
  orders: Order[];
}

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    orders: [],
  }),
  actions: {
    async fetchOrders() {
      try {
        const response = await axiosInstance.get('/order');
        this.orders = response.data;
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    },
  },
});