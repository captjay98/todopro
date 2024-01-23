import { mount } from '@vue/test-utils'
import { test, describe, expect, beforeEach, vi } from 'vitest'
import TodoComponent from '@/components/todo/TodoComponent.vue'

const RouterLinkStub = {
  template: '<a><slot></slot></a>',
  props: ['to']
}

const deleteTodoMock = vi.fn()
const updateCompletedMock = vi.fn()

vi.mock('@/stores/todoStore.js', () => ({
  useTodoStore: () => ({
    deleteTodo: deleteTodoMock,
    updateCompleted: updateCompletedMock
  })
}))

let wrapper

beforeEach(() => {
  const todo = { id: 1, title: 'test todo', description: 'testing todo', completed: false }
  wrapper = mount(TodoComponent, {
    global: {
      // plugins: [router],
      stubs: {
        RouterLink: RouterLinkStub
      }
    },
    props: {
      todo
    }
  })
})

describe('TodoComponent', () => {
  describe('Todo Component Display', () => {
    test('displays the todo title', () => {
      const title = wrapper.get('[data-test="title"]')
      expect(title.text()).toBe('test todo')
    })
    test('displays the todo Description', () => {
      const description = wrapper.get('[data-test="description"]')
      expect(description.text()).toBe('testing todo')
    })
    test('displays the todo Checkbox', () => {
      const checkbox = wrapper.find('input[type="checkbox"]')
      expect(checkbox.element.checked).toBe(false)
    })
    test('displays the Delete Button', () => {
      const deleteButton = wrapper.find('[data-test="delete"]')
      expect(deleteButton.text()).toBe('X')
    })
  })

  describe('TodoComponent interactions', () => {
    test('should Invoke deleteTodo when delete is clicked', async () => {
      const deleteButton = wrapper.find('[data-test="delete"]')
      await deleteButton.trigger('click')
      expect(deleteTodoMock).toHaveBeenCalled()
    })

    describe('should update completed status when checkbox is clicked', async () => {
      test('update completed value', async () => {
        const checkbox = wrapper.find('input[type="checkbox"]')
        await checkbox.trigger('click')
        expect(checkbox.element.checked).toBe(true)
      })
      test('invoke updateCompleted', async () => {
        const checkbox = wrapper.find('input[type="checkbox"]')
        await checkbox.trigger('click')
        expect(updateCompletedMock).toHaveBeenCalled()
      })
    })

    test('RouterLink should have the correct `to` prop', () => {
      const routerLink = wrapper.findComponent(RouterLinkStub)
      expect(routerLink.props('to')).toBe(`/todo/${wrapper.props().todo.id}`)
    })
  })
})
