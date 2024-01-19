<script setup>
import { RouterLink, RouterView } from 'vue-router'
const navStyle = `hover:text-blue-700 hover:underline underline-offset-4 hover:shadow-blue-500 shadow-2xl`
</script>

<template>
  <div class="pt-2 mb-4 w-full tracking-wide text-white text-[1.2rem] max-sm:hidden">
    <nav class="flex gap-8 justify-center">
      <RouterLink :class="navStyle" to="/dashboard">Home</RouterLink>
      <RouterLink :class="navStyle" to="/todos">Todos</RouterLink>
      <RouterLink :class="navStyle" to="/profile"> Profile</RouterLink>
    </nav>
  </div>

  <div
    class="absolute bottom-0 pb-3 w-full bg-blue-700 rounded-t-xl md:hidden text-slate-300 h-[4rem]"
  >
    <nav class="flex gap-16 justify-center items-center px-8 h-full">
      <RouterLink to="/dashboard">Home</RouterLink>
      <RouterLink to="/todos">Todos</RouterLink>
      <RouterLink to="/profile">Profile</RouterLink>
    </nav>
  </div>

  <RouterView />
</template>
