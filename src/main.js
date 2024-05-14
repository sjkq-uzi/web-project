import { createApp } from "vue";
// 引入样式
import "./style.css";
// 引入App组件
import App from "./App.vue";
// 引入路由
import router from "./router";
// 引入ElementPlus
import ElementPlus from "element-plus";
// 引入ElementPlus的样式
import "element-plus/dist/index.css";
// 引入中文语言包
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// 导入svg图标
import "virtual:svg-icons-register";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
//二维码第三方库
import VueQrcode from "vue-qrcode";
//导入pinia
import pinia from "./store";
// 创建app实例
const app = createApp(App);
// 引入element图标并注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 使用路由
app.use(router);
// 使用ElementPlus，并设置中文语言包
app.use(ElementPlus, { locale: zhCn });
// 使用pinia
app.use(pinia);
//注册全局组件
app.component("vue-qrcode", VueQrcode);
// app.config.globalProperties.$pinia = pinia;
// 挂载app
app.mount("#app");
