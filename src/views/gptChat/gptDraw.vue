<script setup>
//面包屑
import Breadcrumb from "@/components/Breadcrumb.vue";
import { ref, nextTick } from "vue";
import { draw } from "@/api/gpt";
const item = ref([{ name: "豆沙包(神笔马良)", iconName: "Ai" }]);
const textareaValue = ref("");
import { ElLoading } from "element-plus";
nextTick(() => {
  const inputDome = document.querySelector(".el-input");
  inputDome.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      drawing(textareaValue.value);
    }
  });
});

const drawing = (msg) => {
  //聊天框
  const chatContainer = document.querySelector(".gpt-chat-container");
  chatContainer.innerHTML += `<p>${msg}</p>`;
  textareaValue.value = "";
  // 创建一个新的消息元素
  const message = document.createElement("div");
  message.className = "message";
  const loadingInstance = ElLoading.service({
    target: chatContainer,
    text: "正在生成中...",
    background: "rgba(0, 0, 0, 0.7)",
  });
  draw(msg).then((res) => {
    console.log("res==", res.data);
    loadingInstance.removeElLoadingChild();
    message.style.backgroundImage = `url(${res.data.result})`;
    // 将消息元素添加到聊天框中
    chatContainer.appendChild(message);
    // 滚动到聊天框的底部
    chatContainer.scrollTop = chatContainer.scrollHeight;
  });
};
</script>

<template>
  <Breadcrumb ref="breadCrumb" :items="item" />
  <div class="gpt-chat">
    <div class="gpt-chat-container" />
  </div>
  <el-input v-model="textareaValue" placeholder="Please input" clearable />
</template>

<style lang="scss">
.gpt-chat {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  &-container {
    height: 700px;
    width: 70%;
    border: 2px solid #ccc;
    margin-top: 15px;
    color: #fff;
    border-radius: 10px; /* 圆角 */
    padding: 5px 15px; /* 内边距 */
    overflow-y: scroll;
    background-color: #2b303b;
    // display: flex;
    // align-items: center;
    box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2),
      /* 阴影效果 */ 6px 6px 0px rgba(0, 0, 0, 0.113);
    transition: all 0.3s ease; /* 过渡效果 */
    .message {
      width: 500px; /* 设置div的宽度 */
      height: 500px; /* 设置div的高度 */
      background-size: cover; /* 使图片覆盖整个div */
      background-position: center; /* 将图片居中 */
      background-repeat: no-repeat; /* 防止图片重复 */
    }
  }
}
.el-input {
  margin-top: 10px;
  position: relative;
  width: 70%;
  height: 40px;
  left: 15%;
  border: 2px solid #ccc; /* 边框 */
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2),
    /* 阴影效果 */ 6px 6px 0px rgba(0, 0, 0, 0.113);
  transition: all 0.3s ease; /* 过渡效果 */
  font-size: 16px;
}
</style>
