<script setup>
import TodoComponent from '@/components/todo/TodoComponent.vue'
import { computed, reactive, onMounted } from 'vue'
import { useTodoApi } from '@/composables/todoApi.js'
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
import SideBar from '@/components/partials/SideBarComponent.vue'

const route = useRoute()
const toast = useToast()

const { getTodos } = useTodoApi()
const todosData = reactive({ todos: {}, currentPage: 0, totalPages: 1, totalItems: 1 })

const handleTodoDeleted = async (deletedTodoId) => {
  await getTodos(todosData.currentPage, todosData)
}

const goToPreviousPage = async () => {
  if (todosData.currentPage > 1) {
    getTodos(todosData.currentPage - 1, todosData)
    todosData.currentPage--
  }
}

const goToNextPage = async () => {
  if (todosData.currentPage < todosData.totalPages) {
    getTodos(todosData.currentPage + 1, todosData)
    todosData.currentPage++
  }
}

onMounted(async () => {
  try {
    await getTodos(todosData.currentPage, todosData)
  } catch (error) {
    toast.error('Failed to Fetch Todos on Mount')
  }
})

const todosArray = computed(() => Object.values(todosData.todos))
</script>

<template>
  <SideBar :getTodos="getTodos" :todosData="todosData" :currentPage="todosData.currentPage" />
  <div class="w-full">
    <div v-if="route.path !== '/dashboard'" class="flex justify-center items-center space-x-2 my-4">
      <button
        @click="goToPreviousPage"
        :disabled="todosData.currentPage <= 1"
        class="p-1 px-3 border rounded text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      <span class="text-white">Page {{ todosData.currentPage }} of {{ todosData.totalPages }}</span>
      <button
        @click="goToNextPage"
        :disabled="todosData.currentPage >= todosData.totalPages"
        class="p-1 px-3 border rounded text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
    <div
      class="overflow-y-auto gap-2 p-2 m-auto w-full md:grid md:grid-cols-2 min-h-[25rem] max-h-[70rem]"
    >
      <div v-for="todo in todosArray" :key="todo.id">
        <TodoComponent :todo="todo" @todoDeleted="handleTodoDeleted" />
      </div>
    </div>
  </div>
</template>
