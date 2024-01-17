import axiosInstance from '@/middlewares/axiosInstance.js'
import { useToast } from 'vue-toastification'
import router from '@/router'
export function useTodoApi() {
    const toast = useToast()

    const getTodos = async (page, todosData, filter = '') => {
        try {
            toast.info('Fetching Todos...', { timeout: 1000 })
            const params = { page }
            if (filter) params.filter = filter
            const response = await axiosInstance.get('/api/todos', { params })
            todosData.todos = response.data.data
            todosData.currentPage = response.data.meta.current_page
            todosData.totalPages = response.data.meta.last_page
            todosData.totalItems = response.data.meta.total
        } catch (error) {
            if (error && error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error('There was a problem fetching todos')
            }
            console.log(error)
        }
    }

    const getTodo = async (form, id) => {
        try {
            const response = await axiosInstance.get(`api/todos/${id}`)
            const todo = response.data.data
            form.value = todo
        } catch (error) {
            if (error.response && error.response.status === 403) {
                toast.error('You are not authorized to perform this action.')
                router.push('/todos')
            }
            toast.error('There was an error retrieving the todo')
        }
    }

    const updateTodo = async (form, id) => {
        console.log(form.title)
        console.log(form.id)
        try {
            const response = await axiosInstance.put(`/api/todos/${id}`, form)
            toast.clear()
            console.log(response)
            toast.success('Your todo has been updated!')
        } catch (error) {
            console.error('Error updating todo:', error)
            if (error.response) {
                if (error.response.status === 403) {
                    toast.error('You are not authorized to perform this action.')
                } else {
                    toast.error(`There was an error updating the todo: ${error.response.statusText}`)
                }
            } else {
                toast.error('There was a network error. Please try again later.')
            }
            router.push('/todos')
        }
    }

    const createTodo = async (form, emit) => {
        console.log(form)
        toast.info('Creating Todo...', { timeout: 1000 })
        try {
            const response = await axiosInstance.post('/api/todos', form)
            const todo = response.data.todo
            emit('todoCreated', todo.id)
            toast.success('Todo Created')
            router.push('/todos')
        } catch (error) {
            if (error && error.response.data.message) {
                toast.error(error.response.data.message)
            }
            toast.error('Something went wrong')
        }
    }

    const deleteTodo = async (todo, emit) => {
        toast.info('Deleting Todo', { timeout: 1000 })
        try {
            console.log(todo)
            await axiosInstance.delete(`api/todos/${todo.id}`)
            emit('todoDeleted', todo.id)
            toast.clear()
            toast.info('Todo Deleted', { timeout: 3000 })
            if (router.currentRoute.value.path !== '/todos') {
                router.push('/todos')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status == 404) {
                    toast.error('Todo Does not exist')
                    return
                } else if (error.response.status === 403) {
                    toast.error(error.response.data.message)
                    return
                } else if (error && error.response.data.message) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error('There was an error Deleting the todo')
                }
            }
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
            if (error.response.data.message) {
                toast.error(error.response.data.message)
            }
            toast.error('Something went wrong.')
        }
    }

    return {
        createTodo,
        updateTodo,
        getTodos,
        getTodo,
        deleteTodo,
        updateCompleted
    }
}
