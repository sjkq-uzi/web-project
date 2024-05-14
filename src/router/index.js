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
      {
        name: "set",
        path: "/set",
        component: () => import("@/views/set/index.vue"),
      },
      {
        name: "templateManage",
        path: "/templateManage",
        component: () => import("@/views/templateManage/index.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: routerHistory,
  routes,
});
export default router;
