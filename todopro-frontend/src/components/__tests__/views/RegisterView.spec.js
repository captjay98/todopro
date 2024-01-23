import { mount } from '@vue/test-utils'
import { describe, test, expect, beforeEach } from 'vitest'
import RegisterView from '@/views/RegisterView.vue'
import RegisterComponent from '@/components/auth/RegisterComponent.vue'

let wrapper

beforeEach(() => {
  wrapper = mount(RegisterView)
})

describe('Register view', () => {
  test('boilerplate')
})
