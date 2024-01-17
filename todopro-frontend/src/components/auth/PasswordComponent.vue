<script setup>
import axiosInstance from '@/middlewares/axiosInstance.js';
import ButtonComponent from '@/components/partials/ButtonComponent.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification';

const router = useRouter()
const toast = useToast();

const form = ref({
    current_password: '',
    password: '',
    password_confirmation: ''
})

const updatePassword = async () => {
    try {
        await axiosInstance.get('sanctum/csrf-cookie')
        const response = await axiosInstance.put('change-password', form.value)
        console.log(response)
        toast.success('Password Updated Successfully')
        router.push('todos')
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
}
</script>

<template>
    <div class=" w-[20rem] m-auto max-sm:my-5 ">
        <h1 class="py-8 text-2xl text-center text-slate-200">PASSWORD UPDATE</h1>
        <form @submit.prevent="updatePassword" class="flex flex-col gap-4 text-slate-200">
            <div class="flex flex-col">
                <label class="px-1 text-left text-[1.0rem]" for="current_password">Current Password</label>
                <input type="password" id="current_password" v-model="form.current_password"
                    class="py-1 px-2 rounded-lg focus:border-blue-700 focus:ring-0 focus:outline-none active:bg-blue-500 text-[1.2rem] bg-slate-600/90 h-[2.3rem] focus:border-[0.2rem]"
                    required />
            </div>
            <div class="flex flex-col">
                <label class="px-1 text-left text-[1.0rem]" for="password">New Password</label>
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
                <ButtonComponent class="w-full">CHANGE PASSWORD</ButtonComponent>
            </div>
        </form>
    </div>
</template>
@/middlewares/axiosInstance
