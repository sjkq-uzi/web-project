<script setup lang="ts">
import { Menu as IconMenu } from "@element-plus/icons-vue";
import { ref } from "vue";
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu class="el-menu-vertical-demo" router>
          <div class="title">通用后台管理系统</div>
          <el-menu-item index="home">
            <el-icon><icon-menu /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="home">
            <el-icon><icon-menu /></el-icon>
            <span>系统概览</span>
          </el-menu-item>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><location /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item-group title="管理员管理">
              <el-menu-item index="1-1">产品管理员</el-menu-item>
              <el-menu-item index="1-2">用户管理员</el-menu-item>
              <el-menu-item index="1-2">消息管理员</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">用户列表</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>item four</template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="home">
            <el-icon><icon-menu /></el-icon>
            <span>合同管理</span>
          </el-menu-item>
          <el-menu-item index="home">
            <el-icon><icon-menu /></el-icon>
            <span>操作日志</span>
          </el-menu-item>
          <el-menu-item index="home">
            <el-icon><icon-menu /></el-icon>
            <span>登录日志</span>
          </el-menu-item>
          <el-menu-item index="home">
            <el-icon><icon-menu /></el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>头部</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped></style>
