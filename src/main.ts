import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
createApp(App).use(createPinia()).mount("#app");
