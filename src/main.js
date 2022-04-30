import { createApp, Vue } from "vue";
import { router } from "./router";
import store from "./store";
import App from "./App.vue";
import "bootstrap-icons/font/bootstrap-icons.css";

createApp(App).use(router).use(store).mount("#app");
