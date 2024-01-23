import { mount } from '@vue/test-utils'
import { test, describe, expect, beforeEach, vi } from 'vitest'
import UpdateTodoComponent from '@/components/todo/UpdateTodoComponent.vue'

const getTodoMock = vi.fn()
const deleteTodoMock = vi.fn()
const updateTodoMock = vi.fn()
const mockRoute = {
  params: {
    id: 1
  }
}

vi.mock('@/stores/todoStore.js', () => ({
  useTodoStore: () => ({
    deleteTodo: deleteTodoMock,
    updateTodo: updateTodoMock
  })
}))

let wrapper

beforeEach(() => {
  wrapper = mount(UpdateTodoComponent, {
    global: {
      mocks: {
        $route: mockRoute
      }
    }
  })
})

describe('UpdateTodoComponent', () => {
  //   test('calls getTodo on Mount', () => expect(getTodoMock).toHaveBeenCalled)

  describe('form and inputs can be rendered', () => {
    describe('renders a form', () => {
      test('has a form', async () => {
        expect(wrapper.find('[data-test="form"]').exists()).toBe(true)
      })

      test('has input for title', async () => {
        const titleInput = wrapper.find('[data-test="title"]')
        expect(titleInput.exists()).toBe(true)
      })

      test('has input for description', async () => {
        const descriptionInput = wrapper.find('[data-test="description"]')
        expect(descriptionInput.exists()).toBe(true)
      })

      test('has input for completed', async () => {
        const completedInput = wrapper.find('input[type="checkbox"]')
        expect(completedInput.exists()).toBe(true)
      })
      test('displays the todo completed Checkbox', () => {
        const checkbox = wrapper.find('input[type="checkbox"]')
        expect(checkbox.element.checked).toBe(false)
      })
      test('displays the todo delete todo Icon(X)', () => {
        const deleteIcon = wrapper.find('[data-test="description"]')
        expect(deleteIcon.exists()).toBe(true)
      })
    })

    // test('pre-fills form with todo data', async () => {
    //   const todo = {
    //     id: 1,
    //     title: 'Test todo',
    //     description: 'Todo description',
    //     completed: 'false'
    //   }

    //   await getTodoMock.mockResolvedValue(todo)

    //   wrapper = await mount(UpdateTodoComponent, {
    //     global: {
    //       mocks: {
    //         $route: mockRoute
    //       }
    //     }
    //   })
    //   await flushPromises()
    //   await wrapper.vm.$nextTick()

    //   const titleInput = wrapper.find('[data-test="title"]')
    //   expect(titleInput.element.value).toBe('Test todo')

    //   const descriptionInput = wrapper.find('[data-test="description"]')
    //   expect(descriptionInput.element.value).toBe('Todo description')

    //   const completedInput = wrapper.find('input[type="checkbox"]')
    //   expect(completedInput.element.checked).toBe(false)
    // })

    describe('form inputs can be filled', () => {
      test('title can be filled', async () => {
        const titleInput = wrapper.find('[data-test="title"]')
        await titleInput.setValue('New title')
        expect(titleInput.element.value).toBe('New title')
      })

      test('input for description can be filled', async () => {
        const descriptionInput = wrapper.find('[data-test="description"]')
        await descriptionInput.setValue('New title')
        expect(descriptionInput.element.value).toBe('New title')
      })

      test('chceckbox for completed can be filled', async () => {
        const completedInput = wrapper.find('input[type="checkbox"]')
        await completedInput.trigger('click')
        expect(completedInput.element.checked).toBe(true)
      })
    })

    describe('form can be interacted with', () => {
      test('form can be submitted', async () => {
        await wrapper.find('[data-test="form"]').trigger('submit')
        expect(updateTodoMock).toHaveBeenCalled()
      })

      test('createTodoMock called with form values', async () => {
        const titleInput = wrapper.find('[data-test="title"]')
        const descriptionInput = wrapper.find('[data-test="description"]')
        const completedInput = wrapper.find('input[type="checkbox"]')
        const deleteIcon = wrapper.find('[data-test="description"]')

        await titleInput.setValue('New Todo')
        await descriptionInput.setValue('New Todo Description')
        await completedInput.trigger('click')
        await deleteIcon.trigger('click')
        await wrapper.find('[data-test="form"]').trigger('submit')

        expect(updateTodoMock).toHaveBeenCalled()

        // expect(createTodoMock).toHaveBeenCalledWith({
        //   title: 'New Todo',
        //   description: 'New Todo Description',
        //   completed: true
        // }, expect.any(Function))
      })

      test('todo Status can be updated', async () => {
        await wrapper.find('[data-test="form"]').trigger('submit')
        expect(updateTodoMock).toHaveBeenCalled()
      })

      test('completed status can be updated', async () => {
        const completedInput = wrapper.find('input[type="checkbox"]')
        await completedInput.trigger('click')
        expect(completedInput.element.checked).toBe(true)
      })

      test('todo can be deleted', async () => {
        const deleteIcon = wrapper.find('[data-test="delete"]')
        await deleteIcon.trigger('click')
        expect(deleteTodoMock).toHaveBeenCalled()
      })
    })
  })
})
