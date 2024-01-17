<script setup>
import Button from '@/components/partials/ButtonComponent.vue'
import axiosInstance from '@/middlewares/axiosInstance.js'
import { useToast } from 'vue-toastification'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const userStore = useUserStore()
const router = useRouter()
const toast = useToast()
const loading = ref(false)

const message = ref('')
const form = ref({
    email: '',
    password: ''
})

/**
 * Attempts to log in a user using the provided email and password.
 * It obtains a CSRF token, sends the login credentials to /login endpoint,
 * and then handles success and error responses. On success, it stores the token,
 * sets the authorization header, updates user state, and redirects to the 'home' route.
 *  On error, it shows a relevant error message using toast notifications.
 */
const login = async () => {
    message.value = ''
    loading.value = true
    try {
        await axiosInstance.get('/sanctum/csrf-cookie')
        const response = await axiosInstance.post('login', form.value)
        const token = response.data.token ? response.data.token : null
        localStorage.setItem('token', token)
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
            'token'
        )}`
        userStore.setUser()
        router.push({ name: 'home' })
    } catch (error) {
        if (error.response) {
            console.log(error.response)
            toast.clear()
            if (error.response.status === 422) {
                toast.error(error.response.data.message)
            } else if (error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            }
        }
        else {
            toast.error('There was a network error. Please try again later.')
        }
    } finally {
        loading.value = false
    }
    form.value.password = ''
}
</script>
<template>
    <div class="flex justify-end w-full h-full text-2xl tracking-normal text-center text-slate-200">
        <div class="m-auto w-[20rem] h-[30rem]">
            <h1 class="pb-10 text-2xl font-semibold tracking-wider text-center text-slate-300">LOGIN</h1>
            <form @submit.prevent="login" class="flex flex-col gap-4">
                <div class="flex flex-col">
                    <label class="px-1 text-left text-[1.0rem]" for="email">Email</label>
                    <input type="email" id="email" v-model="form.email"
                        class="py-1 px-2 rounded-lg focus:border-blue-700 focus:ring-0 focus:outline-none active:bg-blue-500 text-[1.2rem] bg-slate-600/90 h-[2.3rem] focus:border-[0.2rem]"
                        autocomplete required />
                </div>
                <div class="flex flex-col">
                    <label class="px-1 text-left text-[1.0rem]" for="password">Password</label>
                    <input type="password" id="password" v-model="form.password"
                        class="py-1 px-2 rounded-lg focus:border-blue-700 focus:ring-0 focus:outline-none active:bg-blue-500 text-[1.2rem] bg-slate-600/90 h-[2.3rem] focus:border-[0.2rem]"
                        required />
                </div>

                <div class="mt-4 w-full">
                    <Button :disabled="loading" class="w-full disabled:bg-blue-900/50">SIGN IN</Button>
                </div>
                <div>
                    <p class="text-sm">
                        Already have an account?
                        <RouterLink to="/register"><span class="text-blue-500">Register</span></RouterLink>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>
