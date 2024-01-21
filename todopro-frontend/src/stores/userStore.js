import { ref } from 'vue'
import axiosInstance from '@/middlewares/axiosInstance.js'
import { useToast } from 'vue-toastification'
import router from '@/router'

export function useUserStore() {
  const user = ref(null)
  const toast = useToast()

  /**
   * Asynchronously sets the user by making a GET request to '/api/user'.
   * @param {Object} user - The user object to set, passed after login or registration.
   * @return {Promise<Object>} The user object fetched from the API.
   * @throws {Error} If there is an error during the request.
   */

  const setUser = async () => {
    try {
      const response = await axiosInstance.get('/api/user')
      user.value = response.data.data
      return user.value
    } catch (error) {
      handleErrors(error)
      user.value = null
    }
  }

  /**
   * Asynchronously Attempts logs in the user using the provided form data.
   * It obtains a CSRF token, sends the login credentials to /login endpoint,
   * and then handles success and error responses. On success, it stores the token,
   * sets the authorization header, updates user state, and redirects to the 'home' route.
   *  On error, it shows a relevant error message using toast notifications.
   * @param {object} form - The user login form data.
   * @param {object} loading - The loading indicator state object.
   * @param {object} toast - The toast notification object.
   */
  const loginUser = async (form, loading) => {
    loading.value = true
    toast.info('Signing in...', { timeout: 1000 })
    try {
      await axiosInstance.get('/sanctum/csrf-cookie')
      const response = await axiosInstance.post('login', form.value)
      handleLoginResponse(response)
      toast.success('Welcome back!')
      router.push('/dashboard')
    } catch (error) {
      handleErrors(error)
    } finally {
      clearFormPassword(form)
      loading.value = false
    }
  }

  /**
   * Asynchronously Attempts to Register a User using the provided form data.
   * It obtains a CSRF token, sends the data to /register endpoint,
   * and then handles success and error responses. On success, it stores the token,
   * sets the authorization header, updates user state, and redirects to the 'home' route.
   * On error, it shows a relevant error message using toast notifications.
   * @param {object} form - The user Registration form data.
   * @param {object} loading - The loading indicator state object.
   * @param {object} toast - The toast notification object.
   */
  const registerUser = async (form, loading) => {
    loading.value = true
    toast.info('Signing you up!', { timeout: 1000 })
    try {
      await axiosInstance.get('sanctum/csrf-cookie')
      const response = await axiosInstance.post('register', form.value)
      handleLoginResponse(response)
      toast.success('Welcome to TodoPro!')
      router.push('/dashboard')
    } catch (error) {
      handleErrors(error)
    } finally {
      clearFormPassword(form)
      loading.value = false
    }
  }

  const logout = async () => {
    toast.info('logging you out')
    try {
      const response = await axiosInstance.post('logout')
      if (response.data.success === true) {
        localStorage.removeItem('token')
        user.value = null
        // router.push();
        location.reload()
        toast.success('You have been logged out!')
      }
    } catch (error) {
      handleErrors(error)
    }
  }

  // Helper function to handle login response
  const handleLoginResponse = (response) => {
    localStorage.setItem('token', response.data.token)
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
    user.value = response.data.user
  }

  // Helper function to clear the form password fields
  const clearFormPassword = (form) => {
    form.value.password = ''
    form.value.password_confirmation = ''
  }

  // Helper function to handle errors
  const handleErrors = (error) => {
    if (error.response) {
      if (error.response.status === 422) {
        for (const fieldErrors of Object.values(error.response.data.errors)) {
          fieldErrors.forEach((errorMessage) => {
            toast.error(errorMessage)
          })
        }
      } else if (error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else if (error.response.data && error.response.data.error) {
        toast.error(error.response.data.error)
      }
    } else {
      toast.error('Something went wrong')
    }
  }

  return {
    user,
    setUser,
    loginUser,
    registerUser,
    logout
  }
}
