import { createRouter, createWebHashHistory } from "vue-router";
const login = () => import("@/views/login/index.vue");
const routerHistory = createWebHashHistory();
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    name: login,
    path: "/login",
    component: login,
  },
];
const router = createRouter({
  history: routerHistory,
  routes,
});
export default router;
