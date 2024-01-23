import { mount } from '@vue/test-utils'
import { describe, test, expect, beforeEach } from 'vitest'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import DashboardComponent from '@/components/DashboardComponent.vue'
import TodosComponent from '../todo/TodosComponent.vue'
import CreateTodoComponent from '../todo/CreateTodoComponent.vue'


let wrapper

beforeEach(() => {
  wrapper = mount(DashboardComponent)
})

describe('dashboard component', () => {
test('boilerplate')

})
