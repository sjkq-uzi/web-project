<script lang="ts" setup>
import { ref, reactive } from "vue";
import { resetPassword, verifyAccount } from "@/api/login";
import { ElMessage } from "element-plus";
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
//忘记密码=》验证邮箱账号
const openChangePassword = async () => {
  //验证邮箱账号是否匹配
  let res = await verifyAccount(forgetData);
  if (res.data.status === 0) {
    //验证成功
    ElMessage({
      showClose: true,
      message: res.data.message,
      type: "success",
    });
    //将id存到浏览器本地缓存
    localStorage.setItem("id", res.data.id);
    state.forgetPasswordDialog = false;
    state.changePasswordDialog = true;
  } else {
    //验证失败
    ElMessage({
      showClose: true,
      message: res.data.message,
      type: "error",
    });
  }
};
//忘记密码 =》 验证邮箱账号 =》 确认修改密码
const changePassword = async () => {
  const id = localStorage.getItem("id");
  //判断俩次密码输入是否一致
  if (forgetData.repassword === forgetData.password) {
    //根据id重置密码
    const res = await resetPassword(id, forgetData.repassword);
    ElMessage({
      showClose: true,
      message: res.data.message,
      type: res.data.status === 0 ? "success" : "error",
    });
  } else {
    ElMessage({
      showClose: true,
      message: "两次输入的密码不一致",
      type: "error",
    });
  }
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
//暴露打开弹窗的方法
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
    <el-form
      class="login-form"
      label-position="top"
      ref="ruleFormRef"
      :rules="rules"
    >
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
        <el-input v-model="forgetData.password" placeholder="输入您的新密码" />
      </el-form-item>
      <el-form-item label="请在此确认您的新密码" prop="repassword">
        <el-input
          v-model="forgetData.repassword"
          placeholder="请在此确认您的新密码"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.changePasswordDialog = false">取消</el-button>
        <el-button @click="changePassword" type="primary"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
