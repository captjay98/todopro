<script setup>
import { RouterLink } from 'vue-router'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import TodosComponent from '@/components/todo/TodosComponent.vue'
import Button from '@/components/partials/ButtonComponent.vue'
</script>
<template>
  <AuthenticatedLayout>
    <div class="flex justify-between mb-20">
      <!-- <SideBar /> -->
      <div class="lg:ml-[10%] w-[90%] max-sm:m-auto">
        <div class="p-4 w-[90%] lg:w-[75%] m-auto flex items-center justify-between">
          <h1 class="text-3xl text-left text-blue-700 lg:pl-12">Your Todos</h1>
          <div class="lg:mr-16 w-[8rem]">
            <RouterLink to="/create-todo">
              <Button> Add Todo </Button>
            </RouterLink>
          </div>
        </div>
        <TodosComponent />
      </div>
    </div>
  </AuthenticatedLayout>
</template>
