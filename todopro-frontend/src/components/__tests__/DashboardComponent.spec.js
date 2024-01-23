import { mount } from '@vue/test-utils'
import { describe, test, expect, beforeEach } from 'vitest'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import DashboardComponent from '@/components/DashboardComponent.vue'
import TodosComponent from '@/components/todo/TodosComponent.vue'
import CreateTodoComponent from '@/components/todo/CreateTodoComponent.vue'

const RouterLinkStub = {
  template: '<a><slot></slot></a>',
  props: ['to']
}

let wrapper

beforeEach(() => {
  wrapper = mount(DashboardComponent, {
    global: {
      // plugins: [router],
      stubs: {
        RouterLink: RouterLinkStub
      },
      components: {
        TodosComponent,
        CreateTodoComponent
      },
      layouts: {
        AuthenticatedLayout
      }
    }
  })
})

describe('dashboard component', () => {
  test('dashbaord component can mount', () => {
    expect(wrapper.findComponent(DashboardComponent).exists()).toBe(true)
  })
})
