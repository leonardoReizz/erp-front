import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import vue3GoogleLogin from 'vue3-google-login'

const pinia = createPinia();
const app = createApp(App);

app.use(vue3GoogleLogin, {
  clientId:  import.meta.env.VITE_GOOGLE_CLIENT_ID
})
app.use(router);
app.use(pinia);
app.mount("#app");
