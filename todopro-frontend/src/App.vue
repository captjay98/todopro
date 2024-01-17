<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <div class="w-screen h-screen bg-black overflow-clip">
        <div class="w-full h-full bg-blue-900/20">
            <router-view />
        </div>
    </div>
</template>
