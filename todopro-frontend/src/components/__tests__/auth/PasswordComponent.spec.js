import { mount } from '@vue/test-utils'
import { describe, test, expect, beforeEach } from 'vitest'
import PasswordComponent from '@/components/auth/PasswordComponent.vue'

let wrapper

beforeEach(() => {
  wrapper = mount(PasswordComponent)
})

describe('password component', () => {
  test('password component can mount', () => {
    expect(wrapper.findComponent(PasswordComponent).exists()).toBe(true)
  })
})
