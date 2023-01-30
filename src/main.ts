import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

// Pinia
import { createPinia } from "pinia";

// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";

const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();

createApp(App).use(pinia).use(vuetify).mount("#app");
