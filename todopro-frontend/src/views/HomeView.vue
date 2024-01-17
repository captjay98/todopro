<script setup>
import WelcomeComponent from '@/components/WelcomeComponent.vue'
import DashboardComponent from '@/components/DashboardComponent.vue'
import { useUserStore } from '@/stores/userStore.js'
import { reactive } from 'vue'

const userStore = useUserStore()

const userData = reactive({ user: {} })
const getUser = async () => {
  userData.user = (await userStore.user) ? userStore.user : userStore.setUser()
}
</script>

<template>
  <main class="w-full h-full">
    <template v-if="getUser">
      <DashboardComponent />
    </template>
    <template v-else>
      <WelcomeComponent />
    </template>
  </main>
</template>
