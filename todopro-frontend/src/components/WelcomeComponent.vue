<script setup>
import Button from './partials/ButtonComponent.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col justify-center w-full h-full md:hidden">
    <div class="w-full">
      <h1 class="relative bottom-36 m-auto w-72 h-72 bg-blue-500 rounded-full">Image</h1>
    </div>

    <div class="relative bottom-28 w-full text-center text-slate-200">
      <h1 class="py-1 font-bold text-[2rem]">
        Welcome to <span class="text-blue-500">TodoPro</span>
      </h1>
      <h3 class="text-xl font-medium">Manage your todos with ease.</h3>
    </div>

    <div class="flex relative top-28 flex-col mx-auto w-[22rem]">
      <RouterLink to="/register"
        ><Button class="bg-blue-700 text-white text-[1.3rem] w-[80%] py-2 m-auto"
          >Get Started</Button
        >
        Get Started
      </RouterLink>

      <RouterLink to="/login"
        ><Button class="bg-blue-700 text-white text-[1.3rem] w-[80%] py-2 m-auto">Login</Button>
      </RouterLink>
    </div>
  </div>
  <div class="grid grid-cols-2 place-items-center w-screen h-screen max-sm:hidden">
    <div>
      <div class="w-full">
        <h1 class="m-auto w-72 h-72 rounded-full bg-blue-700/50">Image</h1>
      </div>

      <div class="w-full tracking-wider text-center text-slate-200">
        <h1 class="py-1 font-semibold text-[2rem]">Welcome to TodoPro</h1>
        <h3 class="text-xl font-normal">Manage your todos with ease.</h3>
      </div>
    </div>
    <div class="flex flex-col gap-3 w-[25rem]">
      <RouterLink to="/register"
        ><Button class="bg-blue-700 text-white text-[1.3rem] w-[80%] py-2 rounded-3xl m-auto"
          >Get Started</Button
        >
        Get Started
      </RouterLink>

      <RouterLink to="/login"
        ><Button class="bg-blue-700 text-white text-[1.3rem] w-[80%] py-2 rounded-3xl m-auto"
          >Login</Button
        >
      </RouterLink>
    </div>
  </div>
</template>
