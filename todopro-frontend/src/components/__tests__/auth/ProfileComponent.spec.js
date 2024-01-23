import { mount } from '@vue/test-utils'
import { describe, test, expect, beforeEach } from 'vitest'
import ProfileComponent from '@/components/auth/ProfileComponent.vue'

let wrapper

beforeEach(() => {
  wrapper = mount(ProfileComponent)
})

describe('profile component', () => {
  test('profile component can mount', () => {
    expect(wrapper.findComponent(ProfileComponent).exists()).toBe(true)
  })
})
