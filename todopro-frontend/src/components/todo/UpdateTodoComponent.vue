<script setup>
import Button from '@/components/partials/ButtonComponent.vue'
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTodoStore } from '@/stores/todoStore'
import { useToast } from 'vue-toastification'

const todoStore = useTodoStore()
const toast = useToast()
const route = useRoute()
const id = route.params.id

const emit = defineEmits(['todoDeleted'])

const form = ref({
  id: '',
  title: '',
  description: '',
  completed: ''
})

onMounted(async () => {
  try {
    const todo = await todoStore.getTodo(id)
    form.value = todo
  } catch (error) {
    toast.error('Failed to Fetch Todo on Mount')
  }
})

const deleteTodo = async () => {
  todoStore.deleteTodo(form.value, emit)
}
const updateTodo = async () => {
  todoStore.updateTodo(form.value)
}
</script>

<template>
  <div class="w-full">
    <form
      data-test="form"
      @submit.prevent="updateTodo"
      class="flex flex-col gap-4 pb-5 m-auto text-slate-200"
    >
      <h1 class="text-2xl font-semibold text-center text-slate-200">Edit Todo</h1>
      <div class="flex flex-col">
        <label for="title" class="px-1 text-left text-[1.0rem]">Title:</label>
        <input
          data-test="title"
          type="text"
          v-model="form.title"
          id="title"
          class="py-1 px-2 rounded-lg focus:border-blue-700 focus:ring-0 focus:outline-none active:bg-blue-500 text-[1.2rem] bg-slate-600/90 h-[2.3rem] focus:border-[0.2rem]"
        />
      </div>

      <div class="flex flex-col">
        <label for="description" class="px-1 text-left text-[1.0rem]">Description:</label>
        <textarea
          data-test="description"
          v-model="form.description"
          id="description"
          rows="5"
          class="overflow-y-auto p-2 tracking-wide leading-4 rounded-lg focus:border-blue-700 focus:ring-0 focus:outline-none active:bg-blue-500 text-[0.8rem] bg-slate-600/90 min-h-[6rem] max-h-[20.0rem] focus:border-[0.2rem]"
        ></textarea>
      </div>

      <div class="flex gap-2 justify-between w-full">
        <div class="flex">
          <label for="completed" class="px-1 my-1 text-left text-[1.0rem]">Completed:</label>
          <input
            data-test="completed"
            type="checkbox"
            v-model="form.completed"
            id="completed"
            class="w-10 h-10 text-indigo-600 rounded-md border-2 border-blue-500 transition duration-150 ease-in-out appearance-none checked:bg-blue-700 checked:border-0 bg-slate-600/90"
          />
        </div>
        <div class="flex items-center pr-3">
          <p data-test="delete" class="text-xl font-bold" @click="deleteTodo()">X</p>
        </div>
      </div>
      <div class="w-full">
        <Button type="submit" class="py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600">
          Update Todo
        </Button>
      </div>
    </form>
  </div>
</template>
