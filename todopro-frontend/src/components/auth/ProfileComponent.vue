<script setup>
import AuthenthicatedLayout from '@/layouts/AuthenticatedLayout.vue'
import ButtonComponent from '@/components/partials/ButtonComponent.vue'
import PasswordComponent from '@/components/auth/PasswordComponent.vue'
import { ref, reactive, onMounted } from 'vue'
import axiosInstance from '@/middlewares/axiosInstance.js'
import { useUserStore } from '@/stores/userStore.js'
import { useToast } from 'vue-toastification'
import router from '@/router'

const toast = useToast()
const message = ref('{}')
const userData = reactive({ user: {} })
const userStore = useUserStore()
const user_id = ref('')

const getUserData = async () => {
  const user = await userStore.setUser()
  if (!user) {
    router.push('/login')
  } else {
    userData.user = user
    user_id.value = user.id
  }
}

onMounted(getUserData)

const form = ref({
  name: '',
  email: ''
})

const updateUser = async () => {
  try {
    message.value = {}
    await axiosInstance.put(`/api/profile`, form.value)
    await userStore.setUser()
    toast.success('Profile Updated')
  } catch (error) {
    if (error && error.response.data.message) {
      message.value = error.response.data.message
      toast.error(message.value)
    }
  }
}
</script>
<template>
  <AuthenthicatedLayout>
    <div class="overflow-y-auto xl:pt-28 max-md:pt-48 max-lg:pt-96">
      <div class="md:grid md:grid-cols-2">
        <div class="mx-auto w-[20rem]">
          <h1 class="py-8 text-2xl text-center text-slate-200">PROFILE DETAILS</h1>
          <form @submit.prevent="updateUser" class="flex flex-col gap-4 text-slate-200">
            <div class="flex flex-col">
              <label class="px-1 text-left text-[1.0rem]" for="name">Name</label>
              <input
                :placeholder="userData.user.name"
                type="text"
                id="name"
                v-model="form.name"
                class="py-1 px-2 rounded-lg focus:border-blue-700 focus:ring-0 focus:outline-none active:bg-blue-500 text-[1.2rem] bg-slate-600/90 h-[2.3rem] focus:border-[0.2rem]"
                required
              />
            </div>
            <div class="flex flex-col">
              <label class="px-1 text-left text-[1.0rem]" for="email">Email</label>
              <input
                :placeholder="userData.user.email"
                type="email"
                id="email"
                v-model="form.email"
                class="py-1 px-2 rounded-lg focus:border-blue-700 focus:ring-0 focus:outline-none active:bg-blue-500 text-[1.2rem] bg-slate-600/90 h-[2.3rem] focus:border-[0.2rem]"
                autocomplete
                required
              />
            </div>

            <div class="mt-4 w-full">
              <ButtonComponent class="w-full">UPDATE</ButtonComponent>
            </div>
          </form>
        </div>

        <PasswordComponent />
      </div>
      <div class="right-10 top-16 m-auto my-2 md:absolute h-[10rem] w-[7rem]">
        <ButtonComponent @click="userStore.logout" class="w-full">Logout</ButtonComponent>
      </div>
    </div>
  </AuthenthicatedLayout>
</template>
