import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import DashboardPage from "@/pages/DashboardPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import CreateProductPage from "@/pages/CreateProductPage.vue";
import ProductPage from "@/pages/ProductPage.vue";
import CategoryPage from "@/pages/CategoryPage.vue";
import CreateCategoryPage from "@/pages/CreateCategoryPage.vue";
import CustomerPage from "@/pages/CustomerPage.vue";
import CreateContactPage from "@/features/Contact/pages/CreateContactPage.vue";
const routes = [
  {path: "/", component: LoginPage},
  {path: "/register", component: RegisterPage},
  {path: "/dashboard", component: DashboardPage},
  {path: "/product", component: ProductPage},
  {path: "/create-product", component: CreateProductPage},
  {path: "/categories", component: CategoryPage},
  {path: "/create-category", component: CreateCategoryPage},
  {path: "/customer", component: CustomerPage},
  {path: "/create-contact", component: CreateContactPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;  