<script setup>
import { RouterLink, useRoute } from 'vue-router'
import Button from '@/components/partials/ButtonComponent.vue'
import { ref } from 'vue'


const route = useRoute()
const currentFilter = ref('all')

const { getTodos, todosData, currentPage } = defineProps({
    getTodos: Function,
    todosData: Object,
    currentPage: Number,
})

const setFilterAndFetchTodos = (filter) => {
    currentFilter.value = filter
    getTodos(currentPage, todosData, filter)
}

</script>

<template>
    <aside v-if="route.path === '/todos'"
        class="max-sm:hidden fixed h-screen left-0 top-0 bg-blue-900/70 rounded-lg w-[10%]">
        <div class="flex flex-col gap-5 justify-center items-center pt-20 h-full text-slate-200 text-[0.9rem]">
            <div class="px-2">
                <RouterLink to="/create-todo">
                    <Button> Add Todo </Button>
                </RouterLink>
            </div>
            <p :class="{ 'bg-black/60 w-full text-white py-1 px-3 rounded': currentFilter === 'all' }"
                @click="setFilterAndFetchTodos('all')">All</p>
            <p :class="{ 'bg-black w-full text-white py-1 px-3 rounded': currentFilter === 'true' }"
                @click="setFilterAndFetchTodos('true')">Completed</p>
            <p :class="{ 'bg-black w-full text-white py-1 px-3 rounded': currentFilter === 'false' }"
                @click="setFilterAndFetchTodos('false')">Not Completed</p>
            <p :class="{ 'bg-black w-full text-white py-1 px-3 rounded': currentFilter === 'newest' }"
                @click="setFilterAndFetchTodos('newest')">Newest</p>
            <p :class="{ 'bg-black w-full text-white py-1 px-3 rounded': currentFilter === 'oldest' }"
                @click="setFilterAndFetchTodos('oldest')">Oldest</p>
        </div>
    </aside>
</template>
