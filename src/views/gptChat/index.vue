<script setup>
//面包屑
import Breadcrumb from "@/components/Breadcrumb.vue";
import { ref, nextTick, reactive, onMounted } from "vue";
//用户信息
import { useUserInfo } from "@/store/userInfo";
//svg组件
import SvgIcon from "@/components/SvgIcon.vue";
import {
  ElForm,
  ElFormItem,
  ElSelect,
  ElInput,
  ElOption,
  ElSwitch,
  ElButton,
  ElMessage,
  ElLoading,
} from "element-plus";
const inputVal = ref("");
//pinia中的用户信息
const userStore = useUserInfo();
const item = ref([{ name: "豆沙包", iconName: "Ai" }]);
const userId = localStorage.getItem("id");
//会话id
const sessinoId = ref(0);
//表单数据
const form = reactive({
  name: userStore.name,
  region: "gpt-3.5-turbo",
  delivery: false,
  agency: false,
});
const user = reactive({
  power: true,
});
let timerId = null;
const debounce = (fn, delay) => {
  return (...args) => {
    //清除定时器
    if (timerId) {
      console.log("timer=", timerId);
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
//新建会话
const newSession = () => {
  const chatlog = document.querySelector(".gpt-chat-container");
  chatlog.innerHTML = "";
  sessinoId.value += 1;
};
nextTick(() => {
  const inputDom = document.getElementById("user-input");
  //监听回车事件
  inputDom.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      debounce(sendMessage, 1000)();
    }
  });
});
onMounted(() => {
  ElMessage({
    showClose: true,
    message: "当前账号没有权限更改配置，请联系帅比小新",
    type: "error",
  });
});
// 发送消息 chat
const sendMessage = () => {
  const chatlog = document.querySelector(".gpt-chat-container");
  const message = inputVal.value;
  chatlog.innerHTML += `<p><strong>${userStore.name}:</strong> ${message}</p>`;
  inputVal.value = "";
  chatlog.innerHTML += `<span><strong>豆沙包: &nbsp</strong></span>`;
  const loadingInstance = ElLoading.service({
    target: chatlog,
    text: "正在加载中...",
    background: "rgba(0, 0, 0, 0.7)",
  });
  // const res = chat(message).then((res) => {
  //   console.log("res=", res.data);
  // chatlog.innerHTML += `<p><strong>豆沙包:</strong> ${res.data}</p>`;
  //   chatlog.scrollTop = chatlog.scrollHeight;
  // });
  // fetch处理流式数据 ，axios只能在node环境下实现 stream
  fetch("http://172.28.4.75:3007/gpt/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message,
      sessinoId: `${sessinoId.value}-${userId}`,
    }),
  })
    .then((response) => {
      console.log(response);
      //清楚loading
      loadingInstance.removeElLoadingChild();
      // 处理流式数据
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      function read() {
        reader.read().then(({ done, value }) => {
          if (done) {
            return;
          }
          const text = decoder.decode(value, { stream: true });
          chatlog.innerHTML += `<span>${text}</span>`;
          chatlog.scrollTop = chatlog.scrollHeight;
          read(); // 继续读取下一个数据块
        });
      }
      read();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};
const onSubmit = () => {
  console.log("--");
};
</script>

<template>
  <Breadcrumb ref="breadCrumb" :items="item" />

  <div class="gpt-chat">
    <div class="gpt-chat-container" />
    <div class="gpt-chat-config">
      <h2>配置列表</h2>
      <el-form
        :model="form"
        :disabled="user.power"
        label-width="auto"
        style="max-width: 600px"
      >
        <el-form-item label="聊天昵称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="模型选择">
          <el-select v-model="form.region" placeholder="选择gpt模型">
            <el-option label="gpt-3.5-turbo" value="gpt-3.5-turbo" />
            <el-option label="gpt-3.5-turbo-0125" value="gpt-3.5-turbo-0125" />
            <el-option label="gpt-3.5-turbo-16k" value="gpt-3.5-turbo-16k" />
            <el-option label="gpt-4o" value="gpt-4o" />
            <el-option label="gpt-4" value="gpt-4" />
            <el-option label="gpt-4-turbo" value="gpt-4-turbo" />
            <el-option
              label="gpt-4-turbo-preview"
              value="gpt-4-turbo-preview"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="开启历史记录">
          <el-switch v-model="form.delivery" />
        </el-form-item>
        <el-form-item label="使用代理">
          <el-switch v-model="form.agency" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">submit</el-button>
          <!-- <el-button>Cancel</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
  <div class="gpt-bottom">
    <input
      v-model="inputVal"
      type="text"
      id="user-input"
      placeholder="请输入内容"
    />
    <SvgIcon icon-name="enter" class="gpt-input-icon" color="black"></SvgIcon>
    <el-button @click="newSession">
      新建会话<el-icon class="el-icon--right"><Plus /></el-icon>
    </el-button>
  </div>
</template>

<style scoped lang="scss">
/* Your styles here */
.gpt-chat {
  position: relative;
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: space-around;
  &-config {
    width: 30%;
    height: 600px;
  }
}
.gpt-chat-container {
  height: 600px;
  width: 60%;
  border: 2px solid #ccc;
  margin-top: 15px;
  overflow-y: scroll;
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2),
    /* 阴影效果 */ 6px 6px 0px rgba(0, 0, 0, 0.113);
  transition: all 0.3s ease; /* 过渡效果 */
  background-color: #2b303b;
  color: #fff;
  border-radius: 10px; /* 圆角 */
  padding: 5px 15px; /* 内边距 */
}
#user-input {
  position: relative;
  width: 50%;
  height: 40px;
  left: 7%;
  border: 2px solid #ccc; /* 边框 */
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2),
    /* 阴影效果 */ 6px 6px 0px rgba(0, 0, 0, 0.113);
  transition: all 0.3s ease; /* 过渡效果 */
  font-size: 16px;
  padding-left: 10px;
}
.gpt-bottom {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 60%;
  // left: 2%;
  top: 7%;
  .gpt-input-icon {
    position: relative;
    right: 4%;
  }
}
</style>
