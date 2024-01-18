import { mount } from '@vue/test-utils';
import { it, expect } from 'vitest';
import TodoComponent from '@/components/todo/TodoComponent.vue';
import router from '../../../mock-router-setup.js';

it('should render todo and respond to interactions', () => {
  const wrapper = mount(TodoComponent, {
    global: {
      plugins: [router],
    },
    props:{
        todo:{id:1,title:'test todo', description:"testing todo", completed:false}
    }
  });

 const title = wrapper.find('h3').text();
 const description = wrapper.find('p').text();
 expect(title).toBe('test todo');
 expect(description).toBe('testing todo');


});
