import "./assets/main.css";
import sh3Components from "sh3-components";

import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import PrimeVue from "primevue/config";

import PrimeVueComponents from "@/utils/primevueComponents.js";
import ToastService from "primevue/toastservice";

const app = createApp(App);

app.use(PrimeVue);
app.use(PrimeVueComponents);
app.use(sh3Components);
app.use(ToastService);

app.mount("#app");
