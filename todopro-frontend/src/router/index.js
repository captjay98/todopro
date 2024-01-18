import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import TodosView from '../views/TodosView.vue'
import TodoView from '../views/TodoView.vue'
import ProfileView from '../views/ProfileView.vue'
import CreateTodoView from '../views/CreateTodoView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/todos',
      name: 'todos',
      component: TodosView
    },

    {
      path: '/todo/:id',
      name: 'todo',
      component: TodoView
    },

    {
      path: '/create-todo',
      name: 'createtodo',
      component: CreateTodoView
    }
    // {
    //     path: '/about',
    //     name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //     component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
