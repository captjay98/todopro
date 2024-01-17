<script setup>
import Button from '@/components/partials//ButtonComponent.vue'
import { useRouter, RouterLink } from 'vue-router'
import { ref } from 'vue'
import axiosInstance from '@/middlewares/axiosInstance.js'
import { useToast } from 'vue-toastification';

const router = useRouter()
const toast = useToast();

const loading = ref(false)
const message = ref('{}')
const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

const register = async () => {
    message.value = {}
    loading.value = true
    try {
        await axiosInstance.get('sanctum/csrf-cookie')
        const response = await axiosInstance.post('register', form.value)
        localStorage.setItem('token', response.data.token)
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
            'token'
        )}`

        router.push({ name: 'home' })
    } catch (error) {
        message.value = error.response.data.errors
        toast.error(error.response.data.message)
    }
    finally { loading.value = false }
    form.value.password = ''
    form.value.password_confirmation = ''
}
</script>
<template>
    <div class="flex justify-end w-full h-full text-2xl tracking-normal text-center text-slate-200">
        <div class="m-auto w-[20rem] h-[30rem]">
            <h1 class="pb-10 text-2xl font-semibold tracking-wider text-center text-slate-300">
                CREATE ACCOUNT
            </h1>
            <form @submit.prevent="register" class="flex flex-col gap-4">
                <div class="flex flex-col">
                    <label class="px-1 text-left text-[1.0rem]" for="name">Name</label>
                    <input type="text" id="name" v-model="form.name"
                        class="py-1 px-2 rounded-lg focus:border-blue-700 focus:ring-0 focus:outline-none active:bg-blue-500 text-[1.2rem] bg-slate-600/90 h-[2.3rem] focus:border-[0.2rem]"
                        required />
                </div>
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
                <div class="flex flex-col">
                    <label class="px-1 text-left text-[1.0rem]" for="password_confirmation">Confirm Password</label>
                    <input type="password" id="password_confirmation" v-model="form.password_confirmation"
                        class="py-1 px-2 rounded-lg focus:border-blue-700 focus:ring-0 focus:outline-none active:bg-blue-500 text-[1.2rem] bg-slate-600/90 h-[2.3rem] focus:border-[0.2rem]"
                        required />
                </div>

                <div class="mt-4 w-full">
                    <Button :disabled='loading' class="w-full">SIGN UP </Button>
                </div>
                <div>

                    <p class="text-sm">Already have an account?
                        <RouterLink to="/login"><span class="text-blue-500">Login</span></RouterLink>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>
