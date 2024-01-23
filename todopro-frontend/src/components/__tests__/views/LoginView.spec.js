import { mount } from '@vue/test-utils'
import { describe, test, expect, beforeEach } from 'vitest'
import LoginView from '@/views/LoginView.vue'
import LoginComponent from '@/components/auth/LoginComponent.vue'

let wrapper

beforeEach(() => {
  wrapper = mount(LoginView)
})

describe('Login view', () => {
  test('boilerplate')
})
