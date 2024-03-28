<script lang="ts" setup>
import { ref, reactive, defineExpose } from "vue";

// const dialogVisible = ref(false);

interface forgetData {
  account: string;
  email: string;
  password: string;
  repassword: string;
}
const forgetData: forgetData = reactive({
  account: "",
  email: "",
  password: "",
  repassword: "",
});
const state = reactive({
  forgetPasswordDialog: false,
  changePasswordDialog: false,
});
//控制弹窗
const openForgetPasswordDialog = () => {
  state.forgetPasswordDialog = true;
};

const openChangePassword = () => {
  state.forgetPasswordDialog = false;
  state.changePasswordDialog = true;
};
//表单验规则
const rules = reactive({
  account: [{ required: true, message: "请输入你的注册账号", trigger: "blur" }],
  email: [{ required: true, message: "请输入你的注册邮箱", trigger: "blur" }],
  password: [
    { required: true, message: "请输入您想修改的密码", trigger: "blur" },
  ],
  repassword: [
    { required: true, message: "请确认您的新密码", trigger: "blur" },
  ],
});
defineExpose({
  openForgetPasswordDialog,
});
</script>

<template>
  <el-dialog
    v-model="state.forgetPasswordDialog"
    title="忘记密码"
    widtt="400px"
  >
    <el-form class="login-form" label-position="top" :rules="rules">
      <el-form-item label="输入您的注册账号" prop="account">
        <el-input v-model="forgetData.account" placeholder="输入您的注册账号" />
      </el-form-item>
      <el-form-item label="输入您的个人邮箱" prop="email">
        <el-input v-model="forgetData.email" placeholder="输入您的个人邮箱" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.forgetPasswordDialog = false">取消</el-button>
        <el-button type="primary" @click="openChangePassword">
          下一步
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 修改密码 -->
  <el-dialog
    v-model="state.changePasswordDialog"
    title="修改密码"
    widtt="400px"
  >
    <el-form class="login-form" label-position="top" :rules="rules">
      <el-form-item label="输入您的新密码" prop="password">
        <el-input v-model="forgetData.account" placeholder="输入您的新密码" />
      </el-form-item>
      <el-form-item label="请在此确认您的新密码" prop="repassword">
        <el-input
          v-model="forgetData.email"
          placeholder="请在此确认您的新密码"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.changePasswordDialog = false">取消</el-button>
        <el-button type="primary"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
