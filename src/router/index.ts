import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {path: "/", component: LoginPage},
  {path: "/register", component: RegisterPage},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;