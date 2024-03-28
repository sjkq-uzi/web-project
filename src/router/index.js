import { createRouter, createWebHashHistory } from "vue-router";
const login = () => import("@/views/login/index.vue");
const routerHistory = createWebHashHistory();
const routes = [
  {
    path: "/",
    redirect: "/menu",
  },
  {
    name: login,
    path: "/login",
    component: login,
  },
  {
    name: "menu",
    path: "/menu",
    component: () => import("@/views/menu/index.vue"),
    children: [
      {
        name: "home",
        path: "/home",
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: routerHistory,
  routes,
});
export default router;
