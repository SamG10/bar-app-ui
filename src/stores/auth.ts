import { defineStore } from 'pinia'
import axiosInstance from '../api/config'

interface User {
  id: number
  email: string
  role: string
}

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    role: (state) => state.user?.role || ''
  },
  actions: {
    async login(email: string, password: string) {
      const response = await axiosInstance.post('/auth/login', { email, password })
      this.token = response.data.token
      this.user = response.data.user
      if(this.token) {
        localStorage.setItem('token', this.token);
      }
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token');
    }
  }
})
