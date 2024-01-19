<script setup>
import WelcomeComponent from '@/components/WelcomeComponent.vue'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'
import { onMounted, onBeforeMount } from 'vue'

const userStore = useUserStore()

onBeforeMount(async () => {
  const user = await userStore.setUser()
  if (user) {
    router.push('/dashboard')
  } else {
    return
  }
})
</script>

<template>
  <main class="w-full h-full">
    <WelcomeComponent />
  </main>
</template>
