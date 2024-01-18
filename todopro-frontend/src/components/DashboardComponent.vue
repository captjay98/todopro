<script setup>
import AuthenthicatedLayout from '@/layouts/AuthenticatedLayout.vue'
import TodosComponent from '@/components/todo/TodosComponent.vue'
import CreateTodoComponent from '@/components/todo/CreateTodoComponent.vue'
</script>
<template>
  <AuthenthicatedLayout>
    <div class="flex flex-col justify-center w-full h-full">
      <div class="flex flex-col lg:flex-row lg:py-20">
        <div class="max-sm:pt-20 max-sm:w-[23rem] lg:w-[60%] h-[25rem] m-auto overflow-auto">
          <h1 class="text-2xl font-semibold text-center text-slate-200">Recent Todos</h1>
          <TodosComponent />
        </div>
        <div
          class="m-auto max-sm:mb-16 max-sm:mt-20 max-sm:w-[23rem] h-[25rem] lg:min-w-[20rem] lg:max-w-[25rem]"
        >
          <CreateTodoComponent />
        </div>
      </div>
    </div>
  </AuthenthicatedLayout>
</template>
