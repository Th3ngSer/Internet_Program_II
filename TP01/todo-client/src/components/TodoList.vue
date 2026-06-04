<template>
  <ul class="todoLists">
    <template v-if="status === 'completed'">
      <TodoItem
        v-for="todo of doneTodos"
        :key="todo.id"
        icon="uil-trash-alt"
        :todo="todo"
      />
    </template>
    <template v-else>
      <TodoItem
        v-for="todo of activeTodos"
        :key="todo.id"
        icon="uil-trash-alt"
        :todo="todo"
      />
    </template>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '../stores/todo.store'
import TodoItem from './TodoItem.vue'

defineProps<{ status: string }>()

const todoStore = useTodoStore()

const doneTodos = computed(() =>
  todoStore.todos.filter((todo) => todo.is_done),
)

const activeTodos = computed(() =>
  todoStore.todos.filter((todo) => !todo.is_done),
)
</script>
