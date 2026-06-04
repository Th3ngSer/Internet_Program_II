<template>
  <div class="input-field">
    <textarea
      @keyup.enter.prevent="onAdd"
      ref="inputRef"
      placeholder="Enter your new todo"
    ></textarea>
    <i class="uil uil-notes note-icon"></i>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  added: [title: string]
}>()

const inputRef = ref<HTMLTextAreaElement | null>(null)

function onAdd(e: KeyboardEvent) {
  const target = e.target as HTMLTextAreaElement
  const value = target.value.trim()
  if (value) {
    emit('added', value)
    target.value = ''
  }
}
</script>
