<script setup>
import Button from './partials/ButtonComponent.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col justify-center w-full h-full md:hidden">
    <div class="w-full">
      <div class="relative bottom-36 m-auto w-72 h-72 rounded-full bg-blue-700 p-3">
        <h1 class="text-black/70 text-[11rem] rounded-full w-full h-full font-semibold text-center">
          TP
        </h1>
      </div>
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
        <div class="m-auto w-72 h-72 rounded-full bg-blue-700 p-3">
          <h1
            class="text-black/70 text-[11rem] rounded-full w-full h-full font-semibold text-center"
          >
            TP
          </h1>
        </div>
      </div>

      <div class="md:mt-2 w-full tracking-widest text-center text-slate-200">
        <h1 class="py-1 font-bold text-[2rem]">
          Welcome to <span class="text-blue-500">TodoPro</span>
        </h1>
        <h3 class="text-xl font-medium">Manage your todos with ease.</h3>
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
