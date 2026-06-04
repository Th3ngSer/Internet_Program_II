# TP05 — VueJS with Hasura GraphQL

## 📖 Overview

This project is a **Todo Application** built with **Vue 3** and connected to a **Hasura GraphQL** backend powered by a **Neon PostgreSQL** database. It demonstrates a modern full-stack architecture where the frontend communicates with the database exclusively through **GraphQL** — no REST API needed.

| Technology | Role |
|---|---|
| **Vue 3** | Frontend framework (Composition API + `<script setup>`) |
| **Pinia** | State management |
| **Apollo Client** | GraphQL client (queries, mutations, subscriptions) |
| **Hasura Cloud** | Instant GraphQL API over PostgreSQL |
| **Neon** | Serverless PostgreSQL database |
| **Vite** | Development server & bundler |
| **TypeScript** | Type safety across all source files |

---

## 🏗️ Architecture

```
┌──────────────────────────┐
│       Vue 3 App          │
│  (Composition API + TS)  │
│                          │
│  ┌────────┐  ┌────────┐  │
│  │ Pinia  │──│ Apollo │  │
│  │ Store  │  │ Client │  │
│  └────────┘  └───┬────┘  │
│                  │       │
└──────────────────┼───────┘
                   │
          HTTP (query/mutation)
          WS   (subscription)
                   │
          ┌────────▼────────┐
          │  Hasura Cloud   │
          │  GraphQL Engine │
          └────────┬────────┘
                   │
          ┌────────▼────────┐
          │ Neon PostgreSQL │
          │  (todos table)  │
          └─────────────────┘
```

**Data Flow:**
1. Vue components call **Pinia store** actions
2. Pinia store uses **Apollo Client** to send GraphQL operations
3. Apollo Client sends requests to **Hasura** (HTTP for queries/mutations, WebSocket for subscriptions)
4. Hasura translates GraphQL into **SQL** and queries the **Neon** PostgreSQL database
5. Results flow back through the same chain

---

## 📁 Project Structure

```
todo-client/
├── index.html                          # Entry HTML
├── .env                                # Hasura endpoint configuration
├── package.json                        # Dependencies
├── vite.config.js                      # Vite configuration
└── src/
    ├── main.ts                         # App bootstrap (Pinia + Apollo provider)
    ├── App.vue                         # Root component
    ├── apollo/
    │   └── client.ts                   # Apollo Client setup (HTTP + WS)
    ├── graphql/
    │   └── todos.ts                    # All GraphQL operations
    ├── stores/
    │   └── todo.store.ts               # Pinia store (Composition API)
    ├── components/
    │   ├── AddTodo.vue                 # Input for adding new todos
    │   ├── TodoList.vue                # Filtered list (active/done)
    │   └── TodoItem.vue                # Single todo (toggle + delete)
    └── assets/
        └── main.css                    # Styling
```

---

## 🗄️ Part A — Hasura + Neon Setup

### Database Table: `todos`

| Column | Type | Default | Constraints |
|---|---|---|---|
| `id` | `uuid` | `gen_random_uuid()` | Primary Key |
| `title` | `text` | — | NOT NULL |
| `is_done` | `boolean` | `false` | NOT NULL |
| `created_at` | `timestamptz` | `now()` | — |

### Permissions (Role: `anonymous`)

| Operation | Columns | Row Filter |
|---|---|---|
| SELECT | All (`id`, `title`, `is_done`, `created_at`) | No filter (all rows) |
| INSERT | `title`, `is_done` | — |
| UPDATE | `title`, `is_done` | — |
| DELETE | — | No filter |

### Environment Variables (`.env`)

```env
VITE_HASURA_HTTP=https://viable-snail-62.hasura.app/v1/graphql
VITE_HASURA_WS=wss://viable-snail-62.hasura.app/v1/graphql
VITE_HASURA_ROLE=anonymous
```

---

## 🔌 Part B & C — Apollo Client Setup

**File:** `src/apollo/client.ts`

The Apollo Client is configured with a **split link**:
- **HTTP Link** — used for `query` and `mutation` operations
- **WebSocket Link** — used for `subscription` operations (realtime)

```typescript
import {
  ApolloClient, InMemoryCache, HttpLink, split,
} from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_HASURA_HTTP,
  headers: {
    'x-hasura-role': import.meta.env.VITE_HASURA_ROLE,
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_HASURA_WS,
    connectionParams: async () => ({
      headers: {
        'x-hasura-role': import.meta.env.VITE_HASURA_ROLE,
      },
    }),
  }),
);

const link = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return (
      def.kind === 'OperationDefinition' && def.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
```

**Why `split`?**
- Regular queries and mutations use HTTP (`httpLink`)
- Subscriptions require a persistent WebSocket connection (`wsLink`)
- `split()` routes each operation to the correct transport automatically

---

## 🚀 Part D — App Bootstrap

**File:** `src/main.ts`

```typescript
import './assets/main.css'
import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import { apolloClient } from './apollo/client'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(createPinia())
app.mount('#app')
```

**Key points:**
- `provide(DefaultApolloClient, apolloClient)` — makes Apollo available to all Vue components via dependency injection
- `createPinia()` — registers the Pinia state management plugin
- `h(App)` — renders the root `App` component using Vue's render function

---

## 📝 Part E — GraphQL Operations

**File:** `src/graphql/todos.ts`

All GraphQL operations are defined in a single file using `gql` template literals:

### Query — Fetch All Todos

```graphql
query GetTodos {
  todos(order_by: { created_at: desc }) {
    id
    title
    is_done
    created_at
  }
}
```

### Mutation — Add Todo

```graphql
mutation AddTodo($title: String!) {
  insert_todos_one(object: { title: $title }) {
    id
    title
    is_done
    created_at
  }
}
```

### Mutation — Toggle Todo

```graphql
mutation ToggleTodo($id: uuid!, $done: Boolean!) {
  update_todos_by_pk(pk_columns: { id: $id }, _set: { is_done: $done }) {
    id
    is_done
  }
}
```

### Mutation — Delete Todo

```graphql
mutation DeleteTodo($id: uuid!) {
  delete_todos_by_pk(id: $id) {
    id
  }
}
```

### Mutation — Delete All Todos

```graphql
mutation DeleteAllTodos {
  delete_todos(where: {}) {
    affected_rows
  }
}
```

### Subscription — Realtime Updates

```graphql
subscription TodosSub {
  todos(order_by: { created_at: desc }) {
    id
    title
    is_done
    created_at
  }
}
```

> **Note:** These are Hasura auto-generated operation names (`insert_todos_one`, `update_todos_by_pk`, `delete_todos_by_pk`). Hasura generates them automatically based on the table name.

---

## 🧠 Part F — Pinia Store

**File:** `src/stores/todo.store.ts`

The store uses **Pinia's Composition API** style (setup function) with TypeScript:

```typescript
export type Todo = {
  id: string
  title: string
  is_done: boolean
  created_at: string
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ... actions
})
```

### Store Actions

| Action | Description | GraphQL Operation |
|---|---|---|
| `fetchTodos()` | Load all todos from Hasura | `GET_TODOS` query |
| `addTodo(title)` | Create a new todo | `ADD_TODO` mutation |
| `toggleTodo(todo)` | Toggle `is_done` status | `TOGGLE_TODO` mutation |
| `deleteTodo(id)` | Delete a single todo | `DELETE_TODO` mutation |
| `clearAll()` | Delete all todos | `DELETE_ALL_TODOS` mutation |
| `startRealtime()` | Subscribe to live updates | `TODOS_SUB` subscription |

### How Apollo Client is used in the Store

Instead of using Vue Apollo composables (`useQuery`, `useMutation`), the store imports `apolloClient` directly and calls:

- `apolloClient.query()` — for fetching data
- `apolloClient.mutate()` — for creating/updating/deleting data
- `apolloClient.subscribe()` — for realtime subscriptions

This avoids "client not found" issues that can occur when calling Apollo composables inside Pinia actions.

---

## 🖼️ Part G — Vue Components

### `App.vue` — Root Component

```vue
<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed } from 'vue'
import { useTodoStore } from './stores/todo.store'

const todoStore = useTodoStore()
let stopRealtime: null | (() => void) = null

const pendingCount = computed(
  () => todoStore.todos.filter((t) => !t.is_done).length,
)

onMounted(async () => {
  await todoStore.fetchTodos()
  stopRealtime = todoStore.startRealtime()
})

onBeforeUnmount(() => stopRealtime?.())
```

**Responsibilities:**
- Fetches todos on mount
- Starts realtime subscription
- Cleans up subscription on unmount
- Shows pending task count
- Handles "Add" and "Clear All" actions

### `TodoList.vue` — Filtered List

Uses **computed properties** to filter todos:

```typescript
const doneTodos = computed(() =>
  todoStore.todos.filter((todo) => todo.is_done),
)

const activeTodos = computed(() =>
  todoStore.todos.filter((todo) => !todo.is_done),
)
```

Receives a `status` prop (`"pending"` or `"completed"`) and renders the appropriate filtered list.

### `TodoItem.vue` — Single Todo Item

Each todo item provides:
- **Checkbox** — click to toggle `is_done` (`todoStore.toggleTodo()`)
- **Title display** — shows `todo.title`
- **Delete icon** — appears on hover, click to delete (`todoStore.deleteTodo()`)

### `AddTodo.vue` — Input Component

- Textarea with `@keyup.enter` handler
- Emits `added` event with the trimmed title
- Clears input after emitting

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "@apollo/client": "^3.11.0",
    "@vue/apollo-composable": "^4.0.0",
    "graphql": "^16.14.0",
    "graphql-ws": "^6.0.8",
    "pinia": "^2.3.1",
    "vue": "^3.3.4",
    "vue-router": "^4.2.5"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.4.0",
    "vite": "^4.4.11"
  }
}
```

| Package | Purpose |
|---|---|
| `@apollo/client` | GraphQL client for queries, mutations, subscriptions |
| `@vue/apollo-composable` | Vue 3 integration for Apollo (provides `DefaultApolloClient`) |
| `graphql` | GraphQL language parser (peer dependency) |
| `graphql-ws` | Modern WebSocket protocol for GraphQL subscriptions |
| `pinia` | State management for Vue 3 |
| `vue` | Frontend framework |
| `vue-router` | Client-side routing |

---

## 🏆 Part H — Challenges Completed

### ✅ Filtering

Implemented `activeTodos` and `doneTodos` as computed properties in `TodoList.vue`. The UI shows separate sections for **Pending Tasks** and **Completed Tasks**.

### ✅ Realtime Subscription

The `startRealtime()` function in the store subscribes to `TODOS_SUB`. When another user (or Hasura Console) changes data, the local `todos` list updates automatically via WebSocket.

---

## ▶️ How to Run

```bash
# 1. Install dependencies
npm install

# 2. Configure .env with your Hasura endpoint
#    (already configured in .env)

# 3. Start development server
npm run dev

# 4. Open http://localhost:5173
```

---

## 📌 Notes

- The `uuid` type is used for `id` in GraphQL operations. If your Hasura table uses `integer` auto-increment instead, change `uuid!` to `Int!` in `src/graphql/todos.ts`.
- The `anonymous` role is used for classroom demo purposes only. In production, use proper authentication with user-based permissions.
- All data operations go through **GraphQL** — no REST endpoints are used.
- The subscription feature requires that Hasura has WebSocket support enabled (enabled by default on Hasura Cloud).
