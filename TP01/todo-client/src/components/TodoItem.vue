<template>
  <li class="list" :class="{ pending: !todo.is_done }">
    <input
      type="checkbox"
      :checked="todo.is_done"
      @click.stop="onToggle"
    />
    <span class="task">{{ todo.title }}</span>
    <i class="uil" :class="icon" @click.stop="onDelete"></i>
  </li>
</template>

<script setup lang="ts">
import { useTodoStore, type Todo } from '../stores/todo.store'

const props = defineProps<{
  todo: Todo
  icon: string
}>()

const todoStore = useTodoStore()

function onToggle() {
  todoStore.toggleTodo(props.todo)
}

function onDelete() {
  todoStore.deleteTodo(props.todo.id)
}
</script>
