<script setup>
import CreateTodoComponent from '@/components/todo/CreateTodoComponent.vue'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
</script>

<template>
  <AuthenticatedLayout>
    <div class="grid place-items-center m-auto h-screen w-[22rem]">
      <CreateTodoComponent />
    </div>
  </AuthenticatedLayout>
</template>
