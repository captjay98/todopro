import { mount } from '@vue/test-utils'
import { test, describe, expect, beforeEach, vi } from 'vitest'
import RegisterComponent from '@/components/auth/RegisterComponent.vue'

const registerUserMock = vi.fn()

vi.mock('@/stores/userStore.js', () => ({
  useUserStore: () => ({
    registerUser: registerUserMock
  })
}))

let wrapper

beforeEach(() => {
  wrapper = mount(RegisterComponent)
})

describe('RegisterComponent', () => {
  describe('form and inputs can be rendered, filled and submitted', () => {
    describe('form and inputs are rendered', () => {
      test('has a form', async () => {
        expect(wrapper.find('[data-test="form"]').exists()).toBe(true)
      })

      test('has input for name', async () => {
        const nameInput = wrapper.find('[data-test="name"]')
        expect(nameInput.exists()).toBe(true)
      })

      test('has input for email', async () => {
        const emailInput = wrapper.find('[data-test="email"]')
        expect(emailInput.exists()).toBe(true)
      })

      test('has input for password', async () => {
        const passwordInput = wrapper.find('[data-test="password"]')
        expect(passwordInput.exists()).toBe(true)
      })

      test('has input for password confirmation', async () => {
        const passwordConfirmationInput = wrapper.find('[data-test="password_confirmation"]')
        expect(passwordConfirmationInput.exists()).toBe(true)
      })
    })

    describe('form can be filled and submitted', () => {
      test('name can be filled', async () => {
        const nameInput = wrapper.find('[data-test="name"]')
        expect(nameInput.exists()).toBe(true)
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

      test('password confirmation can be filled', async () => {
        const passwordConfirmationInput = wrapper.find('[data-test="password_confirmation"]')
        await passwordConfirmationInput.setValue('password')
        expect(passwordConfirmationInput.element.value).toBe('password')
      })

      test('registerUserMock called with form values', async () => {
        const nameInput = wrapper.find('[data-test="name"]')
        const emailInput = wrapper.find('[data-test="email"]')
        const passwordInput = wrapper.find('[data-test="password"]')
        const passwordConfirmationInput = wrapper.find('[data-test="password_confirmation"]')

        await nameInput.setValue('user one')
        await emailInput.setValue('user@mail.com')
        await passwordInput.setValue('password')
        await passwordConfirmationInput.setValue('password')
        await wrapper.find('[data-test="form"]').trigger('submit')

        expect(registerUserMock).toHaveBeenCalled({})
      })
    })
  })
})
