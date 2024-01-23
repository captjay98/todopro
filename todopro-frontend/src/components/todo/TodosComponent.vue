<script setup>
import TodoComponent from '@/components/todo/TodoComponent.vue'
import SideBarComponent from '@/components/partials/SideBarComponent.vue'
import { computed, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'

const todoStore = useTodoStore()
const toast = useToast()
const route = useRoute()

const goToPreviousPage = () => {
    if (todoStore.todos.currentPage > 1) {
        todoStore.todos.currentPage--
        todoStore.getTodos(todoStore.todos.currentPage)
    }
}


const goToNextPage = () => {
    if (todoStore.todos.currentPage < todoStore.todos.totalPages) {
        todoStore.todos.currentPage++
        todoStore.getTodos(todoStore.todos.currentPage)
    }
}


onMounted(async () => {
    try {
        await todoStore.getTodos(todoStore.todos.currentPage)
    } catch (error) {
        toast.error('Failed to Fetch Todos on Mount')
    }
})


const todosArray = computed(() => Object.values(todoStore.todos.items))
</script>

<template>
    <SideBarComponent />
    <div class="w-full">
        <div v-if="route.path !== '/dashboard'" class="flex justify-center items-center space-x-2 my-4">
            <button aria-label="Previous Page" @click="goToPreviousPage"
                class="p-1 px-3 border rounded text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                Prev
            </button>
            <span class="text-white">Page {{ todoStore.todos.currentPage }} of {{ todoStore.todos.totalPages }}</span>
            <button aria-label="Next Page" @click="goToNextPage"
                :disabled="todoStore.todos.currentPage >= todoStore.todos.totalPages"
                class="p-1 px-3 border rounded text-sm bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
            </button>
        </div>
        <div class="overflow-y-auto gap-2 p-2 m-auto w-full md:grid md:grid-cols-2 min-h-[25rem] max-h-[70rem]">
            <div v-for="todo in todosArray" :key="todo.id">
                <TodoComponent :todo="todo" />
            </div>
        </div>
    </div>
</template>
