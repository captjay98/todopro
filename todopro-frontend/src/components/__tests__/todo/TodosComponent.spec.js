import { mount, flushPromises } from '@vue/test-utils'
import { describe, test, expect, beforeEach, vi } from 'vitest'
import TodosComponent from '@/components/todo/TodosComponent.vue'
import TodoComponent from '@/components/todo/TodoComponent.vue'
import SideBarComponent from '@/components/partials/SideBarComponent.vue'

const getTodosMock = vi.fn()
const toastErrorMock = vi.fn()

vi.mock('@/composables/todoApi.js', () => ({
  useTodoApi: () => ({
    getTodos: getTodosMock
  })
}))

vi.mock('vue-toastification', () => ({
  useToast: () => ({
    error: toastErrorMock
  })
}))

let wrapper

beforeEach(() => {
  wrapper = mount(TodosComponent, {
    global: {
      stubs: {
        SideBar: SideBarComponent,
        TodoComponent
      }
    }
  })
})

describe('TodoListComponent', () => {
  test('should fetch todos on mount', async () => {
    expect(getTodosMock).toHaveBeenCalledOnce()
  })

  test('should display error toast when fetch todos fails on mount', async () => {
    getTodosMock.mockRejectedValueOnce(new Error('Fetch failed'))
    wrapper = mount(TodosComponent, {
      global: {
        stubs: {
          SideBar: SideBarComponent,
          TodoComponent
        }
      }
    })

    await flushPromises()

    expect(toastErrorMock).toHaveBeenCalledWith('Failed to Fetch Todos on Mount')
  })

  test('should go to previous page when prev button is clicked', async () => {
    const currentPage = 4
    wrapper.vm.todos.currentPage = currentPage

    await wrapper.find('button[aria-label="Previous Page"]').trigger('click')

    expect(wrapper.vm.todos.currentPage).toBe(currentPage - 1)
    expect(getTodosMock).toHaveBeenCalledWith(currentPage - 1, expect.anything())
  })

  test('should go to next page when next button is clicked', async () => {
    const currentPage = 1
    wrapper.vm.todos.currentPage = currentPage
    wrapper.vm.todos.totalPages = 3

    await wrapper.find('button[aria-label="Next Page"]').trigger('click')

    expect(wrapper.vm.todos.currentPage).toBe(currentPage + 1)
    expect(getTodosMock).toHaveBeenCalledWith(currentPage + 1, expect.anything())
  })

  test('should handle todo deletion', async () => {
    const deletedTodoId = 1
    const currentPage = 1
    wrapper.vm.todos.currentPage = currentPage

    wrapper.vm.handleTodoDeleted(deletedTodoId)

    await flushPromises()

    expect(getTodosMock).toHaveBeenCalledWith(currentPage, expect.anything())
  })
})
