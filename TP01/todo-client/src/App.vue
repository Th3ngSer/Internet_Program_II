<template>
  <div class="container">
    <AddTodo @added="onAdd" />

    <h3>Pending Tasks:</h3>
    <TodoList status="pending" />

    <h3>Completed Tasks:</h3>
    <TodoList status="completed" />

    <div class="pending-tasks">
      <span
        >You have <span class="pending-num">{{ pendingCount }}</span> tasks
        pending.</span
      >
      <button class="clear-button" @click="onClearAll">Clear All</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed } from 'vue'
import { useTodoStore } from './stores/todo.store'
import AddTodo from './components/AddTodo.vue'
import TodoList from './components/TodoList.vue'

const todoStore = useTodoStore()
let stopRealtime: null | (() => void) = null

const pendingCount = computed(
  () => todoStore.todos.filter((t) => !t.is_done).length,
)

onMounted(async () => {
  await todoStore.fetchTodos()
  // Optional: enable realtime subscription
  stopRealtime = todoStore.startRealtime()
})

onBeforeUnmount(() => stopRealtime?.())

function onAdd(title: string) {
  todoStore.addTodo(title)
}

function onClearAll() {
  todoStore.clearAll()
}
</script>

<style>
@import "https://unicons.iconscout.com/release/v4.0.0/css/line.css";
</style>
