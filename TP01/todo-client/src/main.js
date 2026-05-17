import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './apollo/client'
import App from "./App.vue";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})
app.use(createPinia());
const store = createPinia();
app.use(store);
app.mount("#app");
