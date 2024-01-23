import { mount } from '@vue/test-utils'
import { describe, test, expect, beforeEach } from 'vitest'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import UpdateTodoComponent from '@/components/todo/UpdateTodoComponent.vue'

let wrapper

beforeEach(() => {
  wrapper = mount(UpdateTodoComponent)
})

describe('Todo view', () => {
  test('boilerplate')
})
