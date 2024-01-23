// import axiosInstance from '@/middlewares/axiosInstance.js'
// import { useToast } from 'vue-toastification'
// import router from '@/router'
// export function useTodoApi() {
//   const toast = useToast()

//   /**
//    * Fetches todos from the API based on the specified page and filter.
//    *
//    * @param {number} page - The page number to fetch todos from.
//    * @param {object} todosData - The object to store the fetched todos data.
//    * @param {string} [filter=''] - Optional The filter to apply when fetching todos.
//    */
//   const getTodos = async (page, todos, filter = '') => {
//     try {
//       toast.info('Fetching Todos...', { timeout: 2000 })
//       const params = { page }
//       if (filter) params.filter = filter
//       const response = await axiosInstance.get('/api/todos', { params })
//       const {
//         data,
//         meta: { current_page, last_page, total }
//       } = response.data
//       Object.assign(todos, {
//         items: data,
//         currentPage: current_page,
//         totalPages: last_page,
//         totalItems: total
//       })
//     } catch (error) {
//       if (error.response) {
//         if (error.response && error.response.status === 403) {
//           toast.error('You are not authorized to perform this action.')
//           router.push('/todos')
//         } else if (error.response.data.message) {
//           toast.error(error.response.data.message)
//         } else {
//           toast.error(`Coudn't fetch Todos. ${error.response.statusText}`)
//         }
//       } else {
//         toast.error('There was a network error. Please try again later.')
//       }
//     }
//   }

//   /**
//    * Retrieves a todo from the server and updates the form with its data.
//    *
//    * @param {object} form - the form object to update
//    * @param {number} id - the ID of the todo to retrieve
//    * @return {void}
//    */
//   const getTodo = async (form, id) => {
//     try {
//       const response = await axiosInstance.get(`api/todos/${id}`)
//       const todo = response.data.data
//       form.value = todo
//     } catch (error) {
//       if (error.response) {
//         if (error.response && error.response.status === 403) {
//           toast.error('You are not authorized to perform this action.')
//           router.push('/todos')
//         } else if (error.response.data.message) {
//           toast.error(error.response.data.message)
//         } else {
//           toast.error(`There was an error retrieving the todo. ${error.response.statusText}`)
//         }
//       } else {
//         toast.error('There was a network error. Please try again later.')
//       }
//     }
//   }

//   /**
//    * Updates a todo with the given form data and ID.
//    *
//    * @param {object} form - The form data containing the updated todo details.
//    * @param {number} id - The ID of the todo to be updated.
//    * @return {Promise} A promise that resolves when the todo is successfully updated.
//    */
//   const updateTodo = async (form, id) => {
//     try {
//       await axiosInstance.put(`/api/todos/${form.id}`, form)
//       toast.clear()
//       toast.success('Your todo has been updated!')
//       router.push('/todos')
//     } catch (error) {
//       if (error.response) {
//         if (error.response.status === 403) {
//           toast.error('You are not authorized to perform this action.')
//         } else if (error.response.data.message) {
//           toast.error(error.response.data.message)
//         } else {
//           toast.error(`Failed to update Todo. ${error.response.statusText}`)
//         }
//       } else {
//         toast.error('There was a network error. Please try again later.')
//       }
//       router.push('/todos')
//     }
//   }

//   /**
//    * Creates a new Todo item.
//    *
//    * @param {Object} form - The form data for creating the Todo.
//    * @param {Function} emit - emits a createdTodo event.
//    * @return {Promise} A promise that resolves with the created Todo object.
//    */
//   const createTodo = async (form, emit) => {
//     toast.info('Creating Todo...', { timeout: 2000 })
//     try {
//       const response = await axiosInstance.post('/api/todos', form)
//       const todo = response.data.data
//       emit('todoCreated', todo.id)
//       toast.success('Todo Created')
//       if (router.currentRoute.value.path === '/dashboard') {
//         router.go('0')
//       } else {
//         router.push('/todos')
//       }
//     } catch (error) {
//       if (error.response) {
//         if (error.response.data.message) {
//           toast.error(error.response.data.message)
//         } else toast.error(`Failed to Create Todo. ${error.response.statusText}`)
//       } else {
//         toast.error('There was a network error. Please try again later.')
//       }
//     }
//   }

//   /**
//    * Deletes a todo from the server and emits a todoDeleted event.
//    *
//    * @param {object} todo - The todo object to be deleted.
//    * @param {function} emit - emits a todoDeleted event.
//    * @return {Promise} - A promise that resolves when the todo is deleted.
//    */
//   const deleteTodo = async (todo, emit) => {
//     toast.info('Deleting Todo', { timeout: 2000 })
//     try {
//       await axiosInstance.delete(`api/todos/${todo.id}`)
//       emit('todoDeleted', todo.id)
//       toast.clear()
//       toast.info('Todo Deleted', { timeout: 2000 })
//       if (
//         router.currentRoute.value.path !== '/todos' &&
//         router.currentRoute.value.path !== '/dashboard'
//       ) {
//         router.push('/todos')
//       }
//     } catch (error) {
//       if (error.response) {
//         if (error.response.status == 404) {
//           toast.error('Todo Does not exist')
//           return
//         } else if (error.response.status === 403) {
//           toast.error(error.response.data.message)
//           return
//         } else if (error && error.response.data.message) {
//           toast.error(error.response.data.message)
//         } else {
//           toast.error(`There was an error Deleting the todo. ${error.response.statusText}`)
//         }
//       } else {
//         toast.error('There was a network error. Please try again later.')
//       }
//     }
//   }

//   /**
//    * Updates the completed status of a todo item.
//    *
//    * @param {object} todo - The todo item to update.
//    * @param {boolean} completed - takes the current completed status.
//    * @return {Promise<void>} - A promise that resolves once the update is complete.
//    */
//   const updateCompleted = async (todo, completed) => {
//     let update = !completed
//     toast.info('Updating Todo')
//     try {
//       await axiosInstance.put(`api/todos/${todo.id}`, { completed: update })
//       toast.clear()
//       toast.success('Todo Status Updated')
//     } catch (error) {
//       if (error.response) {
//         if (error.response.data.message) {
//           toast.error(error.response.data.message)
//         } else toast.error(`Failed to Update Todo.${error.response.statusText}`)
//       } else {
//         toast.error('There was a network error. Please try again later.')
//       }
//     }
//   }

//   return {
//     createTodo,
//     updateTodo,
//     getTodos,
//     getTodo,
//     deleteTodo,
//     updateCompleted
//   }
// }
