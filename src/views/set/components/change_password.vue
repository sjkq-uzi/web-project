<script setup lang="ts">
import { reactive } from "vue";
import { changePassword } from "@/api/userInfo";
import { ElMessage } from "element-plus";
const state = reactive({
  changePasswordDialog: false,
});
//表单验规则
const rules = reactive({
  oldPassword: [
    { required: true, message: "请输入您的旧密码", trigger: "blur" },
  ],
  newPassword: [
    { required: true, message: "请输入您的新密码", trigger: "blur" },
  ],
});
interface passwordData {
  oldPassword: string;
  newPassword: string;
}
const passwordData: passwordData = reactive({
  oldPassword: "",
  newPassword: "",
});
//修改密码
const changeP = async () => {
  const id = localStorage.getItem("id");
  //判断俩次密码输入是否一致
  if (passwordData.oldPassword === passwordData.newPassword) {
    //根据id重置密码
    const res = await changePassword(
      passwordData.oldPassword,
      passwordData.newPassword,
      id
    );
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
const openChangePasswordDialog = () =>{
  state.changePasswordDialog = true;
}
//暴露打开弹窗的方法
defineExpose({
  openChangePasswordDialog,
});
</script>

<template>
  <el-dialog
    v-model="state.changePasswordDialog"
    title="修改密码"
    widtt="400px"
  >
    <el-form class="login-form" label-position="top" :rules="rules">
      <el-form-item label="请输入您的旧密码" prop="oldPassword">
        <el-input
          v-model="passwordData.oldPassword"
          placeholder="请输入您的旧密码"
        />
      </el-form-item>
      <el-form-item label="请输入您的新密码" prop="newPassword">
        <el-input
          v-model="passwordData.newPassword"
          placeholder="请输入您的新密码"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.changePasswordDialog = false">取消</el-button>
        <el-button @click="changeP" type="primary"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped></style>
