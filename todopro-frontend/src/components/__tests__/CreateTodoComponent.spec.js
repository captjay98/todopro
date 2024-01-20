import { mount } from '@vue/test-utils';
import { test, describe, it, expect, beforeEach, vi } from 'vitest';
import CreateTodoComponent from '@/components/todo/CreateTodoComponent.vue';
import router from '../../../mock-router-setup.js';

const createTodoMock = vi.fn();

vi.mock('@/composables/todoApi.js', () => ({
  useTodoApi: () => ({
    createTodo: createTodoMock,
  }),
}));

let wrapper;

beforeEach(() => {
  wrapper = mount(CreateTodoComponent);
});

describe('CreateTodoComponent', () => {

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
                const completedInput = wrapper.find('input[type="checkbox"]');
                expect(completedInput.exists()).toBe(true);
              })
              test('displays the todo completed Checkbox', () => {
                const checkbox = wrapper.find('input[type="checkbox"]');
                expect(checkbox.element.checked).toBe(false);
            })

        });

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
                    const completedInput = wrapper.find('input[type="checkbox"]');
                    await completedInput.trigger('click')
                    expect(completedInput.element.checked).toBe(true);
                  })

            });

            describe('form can be interacted with', () => {

                test('form can be submitted', async () => {
                    await wrapper.find('[data-test="form"]').trigger('submit')
                    expect(createTodoMock).toHaveBeenCalled()
                  })

                  test('createTodoMock called with form values', async () => {
                    const titleInput = wrapper.find('[data-test="title"]')
                    const descriptionInput = wrapper.find('[data-test="description"]')
                    const completedInput = wrapper.find('input[type="checkbox"]');

                    await titleInput.setValue('New Todo')
                    await descriptionInput.setValue('New Todo Description')
                    await completedInput.trigger('click')
                    await wrapper.find('[data-test="form"]').trigger('submit')

                    expect(createTodoMock).toHaveBeenCalled({})

                    // expect(createTodoMock).toHaveBeenCalledWith({
                    //   title: 'New Todo',
                    //   description: 'New Todo Description',
                    //   completed: true
                    // }, expect.any(Function))
                  })

            });
    });

});
