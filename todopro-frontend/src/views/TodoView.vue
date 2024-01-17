<script setup>
import UpdateTodoComponent from '@/components/todo/UpdateTodoComponent.vue'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
</script>
<template>
  <AuthenticatedLayout>
    <div class="flex flex-col justify-center p-4 m-auto h-full w-[22rem]">
      <UpdateTodoComponent />
    </div>
  </AuthenticatedLayout>
</template>
