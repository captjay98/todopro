import { defineStore } from 'pinia'
import axiosInstance from '@/middlewares/axiosInstance.js'

import { useToast } from 'vue-toastification'

const toast = useToast()

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    async setUser() {
      try {
        const response = await axiosInstance.get('/api/user')
        this.user = response.data.data
        return this.user
      } catch (error) {
        if (error.response?.status !== 401) {
          toast.error('An error occurred')
          console.log(error)
        }
        this.user = null
        return null
      }
    },
    async logout() {
      try {
        const response = await axiosInstance.post('logout')
        if (response.data.success === true) {
          localStorage.removeItem('token')
          this.user = null
          location.reload()
          toast.success('You have been Logged Out!')
        }
      } catch (error) {
        console.log(error)
      }
      return null
    }
  }
})
