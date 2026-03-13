import { defineStore } from "pinia";
import axios from "axios";

const API_BASE_URL = "http://localhost:3100";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),
  getters: {
    countTodos: (state) => state.todos.length,
  },
  actions: {
    async fetchTodos() {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      this.todos = Array.isArray(response.data) ? response.data : [];
    },
    async toggleStatus(id) {
      const foundIndex = this.todos.findIndex((t) => t.id == id);
      if (foundIndex >= 0) {
        const isCompleted = this.todos[foundIndex].completedAt != null;
        const endpoint = isCompleted ? "pending" : "done";
        const response = await axios.patch(
          `${API_BASE_URL}/tasks/${id}/${endpoint}`,
        );
        if (response.data) {
          this.todos.splice(foundIndex, 1, response.data);
        }
      }
    },
    async addTodo(todo) {
      if (!todo) {
        return;
      }
      const response = await axios.post(`${API_BASE_URL}/tasks`, {
        name: todo,
        description: "description",
      });
      if (response.data) {
        this.todos.push(response.data);
      }
    },
    async clearAll() {
      const ids = this.todos.map((t) => t.id);
      await Promise.all(
        ids.map((id) => axios.delete(`${API_BASE_URL}/tasks/${id}`)),
      );
      this.todos = [];
    },
  },
});
