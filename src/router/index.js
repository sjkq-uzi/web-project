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
        name: "fileUpload",
        path: "/fileUpload",
        component: () => import("@/views/fileUpload/index.vue"),
      },
      {
        name: "gptChat",
        path: "/gptChat",
        component: () => import("@/views/gptChat/index.vue"),
      },
      {
        name: "gptDraw",
        path: "/gptDraw",
        component: () => import("@/views/gptChat/gptDraw.vue"),
      },
      {
        name: "chatRoom",
        path: "/chatRoom",
        component: () => import("@/views/chatRoom/index.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: routerHistory,
  routes,
});
export default router;
