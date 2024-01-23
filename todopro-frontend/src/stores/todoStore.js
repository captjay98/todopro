import axiosInstance from '@/middlewares/axiosInstance.js'
import { reactive } from 'vue'
import { useToast } from 'vue-toastification'
import { defineStore } from 'pinia'
import router from '@/router'

export const useTodoStore = defineStore('items', () => {
  const toast = useToast()
  const todos = reactive({
    items: [],
    currentPage: 1,
    totalPages: 1,
    currentFilter: 'all',
    cache:{}
  })

  const getTodos = async (page) => {
    const cacheKey = `page_${page}-filter${todos.currentFilter}`
    if (todos.cache[cacheKey]) {
      todos.items = todos.cache[cacheKey].items
      todos.currentPage = todos.cache[cacheKey].currentPage
      todos.totalPages = todos.cache[cacheKey].totalPages
      toast.success('Todos loaded from cache', { timeout: 1000 })
      return
    }
    toast.info('Fetching Todos...', { timeout: 2000 })
    try {
      const params = { page }
      params.filter = todos.currentFilter
      const response = await axiosInstance.get('/api/todos', { params })
      todos.items = response.data.data
      todos.currentPage = response.data.meta.current_page
      todos.totalPages = response.data.meta.last_page

      todos.cache[cacheKey] = {
        items: response.data.data,
        currentPage: response.data.meta.current_page,
        totalPages: response.data.meta.last_page
      }
    } catch (error) {
      handleErrors(error)
    }
  }

  const clearCache = () => {
    todos.cache = {}
  }


  const getTodo = async (id) => {
    try {
      const todo = todos.items.find((todo) => todo.id == id)
      return todo
    } catch (error) {
      handleErrors(error)
    }
  }


  const createTodo = async (form, emit) => {
    toast.info('Creating Todo...', { timeout: 2000 })
    try {
      const response = await axiosInstance.post('/api/todos', form)
      const todo = response.data
      todos.items.push(todo)
      toast.clear()
      clearCache()
      emit('todoCreated', todo.id)
      toast.success('Todo Created')
    } catch (error) {
      handleErrors(error)
    }
  }


  const updateTodo = async (form) => {
    console.log
    toast.info('Updating Todo...', { timeout: 2000 })
    try {
      const response = await axiosInstance.put(`/api/todos/${form.id}`, form)
      const index = todos.items.findIndex((todo) => todo.id == form.id)
      todos.items[index] = response.data
      toast.clear()
      toast.success('Your todo has been updated!')
    } catch (error) {
      handleErrors(error)
    }
  }


  const deleteTodo = async (todo, emit) => {
    try {
      toast.info('Deleting Todo', { timeout: 2000 })
      await axiosInstance.delete(`/api/todos/${todo.id}`)
      clearCache()
      emit('todoDeleted', todo.id)
      if (router.currentRoute.value.path !== '/dashboard'){
      router.push('/todos')
      }
      getTodos(todos.currentPage)
      toast.clear()
      toast.success('Todo Deleted', { timeout: 2000 })
    } catch (error) {
      handleErrors(error)
    }
  }


  const updateCompleted = async (todo, completed) => {
    let update = !completed
    toast.info('Updating Todo')
    try {
      await axiosInstance.put(`api/todos/${todo.id}`, { completed: update })
      toast.clear()
      toast.success('Todo Status Updated')
    } catch (error) {
      handleErrors(error)
    }
  }


  const setFilter = (filter) => {
    todos.currentFilter = filter
    getTodos(1)
    // todos.currentPage = 1
  }


  const handleErrors = (error) => {
    if (error.response) {
      if (error.response && error.response.status === 403) {
        toast.error('You are not authorized to perform this action.')
      } else if (error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error(`Coudn't fetch items. ${error.response.statusText}`)
      }
    } else {
      toast.error('There was a network error. Please try again later.')
    }
  }

  return {
    todos,
    getTodos,
    clearCache,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    updateCompleted,
    setFilter,
  }
})
