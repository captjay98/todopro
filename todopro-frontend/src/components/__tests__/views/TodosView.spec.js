import { mount } from '@vue/test-utils'
import { describe, test, expect, beforeEach } from 'vitest'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import TodosComponent from '@/components/todo/TodosComponent.vue'
import TodosView from '@/views/TodoView.vue'
import Button from '@/components/partials/ButtonComponent.vue'

let wrapper

beforeEach(() => {
  wrapper = mount(TodosView)
})

describe('TodosView view', () => {
  test('boilerplate')
})
