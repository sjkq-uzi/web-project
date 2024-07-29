<script setup lang="ts">
import { Menu as IconMenu } from "@element-plus/icons-vue";
//css动画库
import "animate.css";
import { ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useUserInfo } from "@/store/userInfo";
import { Sunny, Moon } from "@element-plus/icons-vue";
const userStore = useUserInfo();
const router = useRouter();
const switchStatus = ref(false);
//退出登录
const logOut = () => {
  router.replace("/login");
};
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          router
          text-color="#fff"
          background-color="#2b303b"
        >
          <div class="title animate__animated animate__flash">
            {{ userStore.name }}的博客
          </div>
          <el-menu-item index="home">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu>
            <template #title>
              <el-icon><ChromeFilled /></el-icon>
              <span>AI工具</span>
            </template>
            <el-menu-item-group title="ai小助手">
              <el-menu-item index="gptChat">豆沙包</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="根据描述生成图片">
              <el-menu-item index="gptDraw">神笔马良</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><User /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item-group title="管理员管理">
              <el-menu-item index="3-1">产品管理员</el-menu-item>
              <el-menu-item index="3-2">用户管理员</el-menu-item>
              <el-menu-item index="3-3">消息管理员</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="员工管理">
              <el-menu-item index="3-4">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="5">
            <template #title>
              <el-icon><ChromeFilled /></el-icon>
              <span>自动化测试</span>
            </template>
            <el-menu-item-group title="消息管理">
              <el-menu-item index="5-1">消息列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="回收站">
              <el-menu-item index="5-2">回收站</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="chatRoom">
            <el-icon><icon-menu /></el-icon>
            <span>聊天室</span>
          </el-menu-item>
          <el-menu-item index="8">
            <el-icon><icon-menu /></el-icon>
            <span>登录日志</span>
          </el-menu-item>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><ShoppingBag /></el-icon>
              <span>系统工具</span>
            </template>
            <el-menu-item index="fileUpload">文件转换</el-menu-item>
            <el-menu-item-group title="配置管理">
              <el-menu-item index="4-2">配置管理</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="set">
            <el-icon><tools /></el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span
            class="header-left-content animate__animated animate__bounceInDown"
            >欢迎 {{ userStore.name }} 登录</span
          >
          <div class="header-right">
            <el-switch
              v-model="switchStatus"
              :active-icon="Sunny"
              :inactive-icon="Moon"
            />
            <el-icon><Message /></el-icon>
            <el-avatar :size="24" :src="userStore.imageUrl" />
            <el-dropdown>
              <span class="el-dropdown-link"> 设置 </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>设置账号</el-dropdown-item>
                  <el-dropdown-item>更改头像</el-dropdown-item>
                  <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  width: 210px;
  overflow-x: hidden;
  .el-menu {
    width: 210px;
    height: 100vh;
    border-right: 0;
  }
  .title {
    padding: 20px;
    display: flex;
    justify-content: center;
    color: aliceblue;
  }
}
.el-header {
  display: flex;
  justify-content: space-between;
  height: 55px;
  color: #c1c6c8;
  align-items: center;
  background: #2b303b;
  .header-left-content {
    font-size: 14px;
  }
  .header-right {
    width: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.el-main {
  --el-main-padding: 5px;
  background-color: #f3f4fa;
  height: 500px;
}
.el-menu-item:hover {
  background: #006eff;
}

:deep(.el-sub-menu__title:hover) {
  background: #006eff !important;
}
</style>
