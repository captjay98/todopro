import { defineStore } from 'pinia'
import axiosInstance from '@/middlewares/axiosInstance.js'

import { useToast } from 'vue-toastification'

const toast = useToast()

export const useUserStore = defineStore('user', {
    /**
     * Returns an object representing the initial state of the component.
     *
     * @return {Object} - The initial state object.
     */
    state: () => ({
        user: null
    }),
    actions: {
        /**
         * Asynchronously sets the user by making a GET request to '/api/user'.
         *
         * @return {Promise<Object>} The user object fetched from the API.
         * @throws {Error} If there is an error during the request.
         */
        async setUser() {
            try {
                const response = await axiosInstance.get('/api/user')
                this.user = response.data.data
                return this.user
            } catch (error) {
                if (error.response.data){
                    if(error.response.data.message){
                        toast.error(error.response.data.message)
                    } else{
                        toast.error(`Coudn't fetch Todos. ${error.response.statusText}`)
                    }
                }else {
                    toast.error('There was a network error. Please try again later.')
                }
                this.user = null
            }
        },
/**
 * Logout function.
 *
 * @return {Promise} Promise that resolves when the logout is successful.
 */
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
                if (error.response.data){
                    if(error.response.data.message){
                        toast.error(error.response.data.message)
                    } else{
                        toast.error(`Coudn't fetch Todos. ${error.response.statusText}`)
                    }
                }else {
                    toast.error('There was a network error. Please try again later.')
                }
            }
        }
    }
})
