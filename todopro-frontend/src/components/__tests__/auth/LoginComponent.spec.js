import { mount } from '@vue/test-utils'
import { test, describe, expect, beforeEach, vi } from 'vitest'
import LoginComponent from '@/components/auth/LoginComponent.vue'

const loginUserMock = vi.fn()

vi.mock('@/stores/userStore.js', () => ({
  useUserStore: () => ({
    loginUser: loginUserMock
  })
}))

let wrapper

beforeEach(() => {
  wrapper = mount(LoginComponent)
})

describe('LoginComponent', () => {
  describe('form and inputs can be rendered, filled and submitted', () => {
    test('has a form', async () => {
      expect(wrapper.find('[data-test="form"]').exists()).toBe(true)
    })

    test('has input for email', async () => {
      const emailInput = wrapper.find('[data-test="email"]')
      expect(emailInput.exists()).toBe(true)
    })

    test('has input for password', async () => {
      const passwordInput = wrapper.find('[data-test="password"]')
      expect(passwordInput.exists()).toBe(true)
    })

    test('email can be filled', async () => {
      const emailInput = wrapper.find('[data-test="email"]')
      await emailInput.setValue('user@mail.com')
      expect(emailInput.element.value).toBe('user@mail.com')
    })

    test('password can be filled', async () => {
      const passwordInput = wrapper.find('[data-test="password"]')
      await passwordInput.setValue('password')
      expect(passwordInput.element.value).toBe('password')
    })

    test('loginUserMock called with form values', async () => {
      const emailInput = wrapper.find('[data-test="email"]')
      const passwordInput = wrapper.find('[data-test="password"]')

      await emailInput.setValue('user@mail.com')
      await passwordInput.setValue('password')
      await wrapper.find('[data-test="form"]').trigger('submit')

      expect(loginUserMock).toHaveBeenCalled({})
    })
  })
})
