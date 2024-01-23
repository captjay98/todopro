import { mount } from '@vue/test-utils'
import { describe, test, expect, beforeEach } from 'vitest'
import CreateTodoComponent from '@/components/todo/CreateTodoComponent.vue'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import CreateTodoView from '@/views/CreateTodoView.vue'
let wrapper

beforeEach(() => {
  wrapper = mount(CreateTodoView)
})

describe('CreateTodo view', () => {


test('boilerplate')
})
