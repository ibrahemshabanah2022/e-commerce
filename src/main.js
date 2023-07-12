import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import authGard from "./authGard";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});
// import "./mdb-vue-ui-kit/css/mdb.min.css";
router.beforeEach(authGard.beforeEach);
const app = createApp(App);

app.use(router).use(store).use(vuetify);

app.mount("#app");
