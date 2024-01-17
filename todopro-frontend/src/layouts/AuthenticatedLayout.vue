<script setup>
import NavBar from '@/components/partials/NavBarComponent.vue'
</script>
<template>
  <div class="pt-10 m-auto w-full h-full md:pt-2">
    <NavBar />
    <div class="overflow-y-auto px-3 w-full h-full">
      <slot />
    </div>
  </div>
</template>
