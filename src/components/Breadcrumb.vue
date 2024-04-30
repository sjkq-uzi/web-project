<!-- 封装的面包屑组件，参数 name、iconName，对象数组 -->
<script lang="ts" setup>
import SvgIcon from "@/components/SvgIcon.vue";
//定义接口验证props传来的数据
interface props {
  name: string;
  iconName?: string;
}
const props = defineProps<{
  items: props[];
}>();
</script>

<template>
  <div class="bread-crumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in props.items">
        <SvgIcon
          v-if="item.iconName"
          :icon-name="item.iconName"
          class="bread-crumb-icon"
        ></SvgIcon>
        {{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
.bread-crumb {
  height: 30px;
  padding: 0, 20px;
  display: flex;
  align-items: center;
}
:deep(.el_breadcrumb__item) {
  height: 20px;
  font-size: 16px;
  line-height: 30px;
}
:deep(.el-breadcrumb__inner) {
  display: flex;
  align-items: center;
  font-weight: 500;
}
.bread-crumb-icon {
  margin-right: 4px;
}
</style>
