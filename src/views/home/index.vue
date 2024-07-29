<script lang="ts" setup>
//面包屑
import Breadcrumb from "@/components/Breadcrumb.vue";
import { ref } from "vue";
//引入3d动画
import { World } from "@/utils/treeWorld";
import { onMounted, onBeforeUnmount } from "vue";
//css动画库
import "animate.css";
import Echarts from "./components/Echarts.vue";
const item = ref([{ name: "首页", iconName: "location" }]);
let animateClass = ref("");
let world: World;
const main = async () => {
  const container = document.querySelector("#geometry-scene");
  world = new World(container);
  //按需渲染 （render渲染一帧）
  // world.render();
  //初始化模型
  await world.init();
  world.start();
};
const animateButtons = [
  { type: "primary", text: "bounce", className: "animate__bounce" },
  { type: "primary", text: "flash", className: "animate__flash" },
  { type: "primary", text: "zoomIn", className: "animate__zoomIn" },
  { type: "primary", text: "backInLeft", className: "animate__backInLeft" },
  { type: "primary", text: "bounceIn", className: "animate__bounceIn" },
  { type: "primary", text: "fadeInDown", className: "animate__fadeInDown" },
  {
    type: "primary",
    text: "rotateInUpRight",
    className: "animate__rotateInUpRight",
  },
  { type: "primary", text: "rollOut", className: "animate__rollOut" },
  { type: "primary", text: "hinge...", className: "animate__hinge" },
] as const;
onMounted(() => {
  main();
});
onBeforeUnmount(() => {
  //组件销毁需要前停止动画
  world.stop();
});
</script>

<template>
  <Breadcrumb ref="breadCrumb" :items="item"> </Breadcrumb>
  <div class="wrapped-top">
    <el-card style="max-width: 500px">
      <template #header>
        <div class="card-header">
          <span>Three.js</span>
          <a
            href="https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene"
            target="_blank"
            rel="noopener noreferrer"
            >（中文文档）</a
          >
        </div>
      </template>
      <div id="geometry-scene" />
      <template #footer
        >模型:BoxGeometry 相机:Camera 材质:Material 场景:Scene 等</template
      >
    </el-card>
    <el-card style="max-width: 500px">
      <template #header>
        <div class="card-header">
          Animate.css
          <a
            href="https://animate.style/"
            target="_blank"
            rel="noopener noreferrer"
            >（中文文档）</a
          >
        </div>
      </template>
      <div class="card-content">
        <h1 class="animate__animated" :class="animateClass">Animate.css</h1>
      </div>
      <template #footer>
        <el-button
          v-for="button in animateButtons"
          :key="button.text"
          :type="button.type"
          text
          @click="animateClass = button.className"
        >
          {{ button.text }}
        </el-button>
      </template>
    </el-card>
    <el-card style="width: 30%">
      <template #header>
        <div class="card-header">
          Echarts
          <a
            href="https://echarts.apache.org/zh/index.html"
            target="_blank"
            rel="noopener noreferrer"
            >（中文文档）</a
          >
        </div>
      </template>
      <div class="echart-content">
        <Echarts />
      </div>
    </el-card>
    <el-card style="width: 40%">
      <template #header>
        <div class="card-header">
          A VitePress Site
          <a
            href="https://vitepress.dev/zh/guide/getting-started"
            target="_blank"
            rel="noopener noreferrer"
            >（中文文档）</a
          >
        </div>
      </template>
      <div>
        <iframe
          src="http://8.135.36.9:8088/"
          width="100%"
          height="400px"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </el-card>
    <el-card style="width: 30%">
      <template #header>
        <div class="card-header">
          Electron
          <a
            href="https://www.electronjs.org/zh/docs/latest/"
            target="_blank"
            rel="noopener noreferrer"
            >（中文文档）</a
          >
          <a href="\electron-win32-x64.zip" download="electron-win32-x64.zip"
            >点击下载demo</a
          >
        </div>
      </template>
      <div class="electron-content">
        Electron是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架。 嵌入
        Chromium 和 Node.js 到 二进制的 Electron 允许您保持一个 JavaScript
        代码代码库并创建 在Windows上运行的跨平台应用
        macOS和Linux——不需要本地开发经验。
        <img src="@/assets//home/homeBgE.png" style="padding-top: 20%" />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
#geometry-scene {
  height: 200px;
}
.wrapped-top {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  .el-card {
    margin: 10px;
  }
  .card-content {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 20px;
    color: #4672fe;
    height: 200px;
    background-color: #111111;
  }

  .echart-content {
    height: auto;
    width: 100%;
  }
  .electron-content {
    display: flex;
    flex-direction: column;
    font-size: 18px;
    font-family: "Brush Script MT", cursive; /* 使用艺术字体 */
    color: #111111; /* 文字颜色 */
    text-shadow: 3px 3px 0px rgba(0, 0, 0, 0.2),
      /* 阴影效果 */ 6px 6px 0px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease; /* 过渡效果 */
  }
}
</style>
