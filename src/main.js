import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import authGard from "./authGard";

import "./assets/main.css";
// import "./mdb-vue-ui-kit/css/mdb.min.css";
router.beforeEach(authGard.beforeEach);
const app = createApp(App);

app.use(router).use(store);

app.mount("#app");
