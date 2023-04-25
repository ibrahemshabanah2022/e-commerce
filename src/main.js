import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

import "./assets/main.css";
// import "./mdb-vue-ui-kit/css/mdb.min.css";
const app = createApp(App);

app.use(router).use(store);

app.mount("#app");
