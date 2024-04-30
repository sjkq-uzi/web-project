<script setup lang="ts">
import "animate.css";
import { ref, reactive } from "vue";
import forget_password from "./components/forget_password.vue";
import { login, register } from "@/api/login";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useUserInfo } from "@/store/userInfo";
const store = useUserInfo();
const router = useRouter();
const activeName = ref("first");
//表单接口
interface formData {
  account: string;
  password: string;
  rePassword?: string;
}
//定义表单数据
const loginData: formData = reactive({
  account: "",
  password: "",
});
//注册表单数据
const registerData: formData = reactive({
  account: "",
  password: "",
  rePassword: "",
});
//子组件暴露的实例
const forgetP = ref();
const openDialog = () => {
  //调用子组件的方法打开对话框
  forgetP.value.openForgetPasswordDialog();
};
//登录
const goLogin = async () => {
  const res = await login(loginData);
  console.log("res---", res);
  const { token } = res.data;
  ElMessage({
    showClose: true,
    message: res.data.message,
    type: res.data.status === 0 ? "success" : "error",
  });
  if (res.data.status === 0) {
    //登录成功后获取id
    const { id } = res.data.results;
    //token存到浏览器缓存
    localStorage.setItem("token", token);
    //根据id获取用户信息
    store.userInfo(id);
    //登录成功跳转到首页
    router.push("/home");
  }
};
//注册
const goRegister = async () => {
  //判断俩次密码输入是否一致
  if (registerData.password === registerData.rePassword) {
    const res = await register(registerData);
    console.log("res---", res);
    if (res.data.code === 201) {
      //注册成功
      ElMessage({
        showClose: true,
        message: res.data.message,
        type: "success",
      });
      activeName.value = "first";
    } else if (res.data.code === 500) {
      //注册失败,数据库报错
      ElMessage.error(res.data.message);
    } else if (res.data.code === 400) {
      //账号或密码不能为空
      ElMessage.warning(res.data.message);
    } else if (res.data.code === 409) {
      //账号已存在
      ElMessage.warning(res.data.message);
    } else {
      ElMessage.error("注册账号失败");
    }
  } else {
    ElMessage.error("两次密码输入不一致");
  }
};
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-wrapped">
        <div class="header-wrapped-contant">
          <h3 class="animate__animated animate__bounceInRight">后台管理系统</h3>
          <span
            class="header-wrapped-contant-welcome animate__animated animate__wobble"
            >欢迎您的登录</span
          >
        </div>
      </el-header>
      <el-main>
        <div class="center-wrapped">
          <el-card class="center-wrapped-card">
            <el-tabs v-model="activeName" class="demo-tabs" :stretch="true">
              <el-tab-pane label="登录" name="first">
                <el-form class="login-form">
                  <el-form-item label="账号">
                    <el-input
                      v-model="loginData.account"
                      placeholder="请输入账号"
                    />
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input
                      v-model="loginData.password"
                      placeholder="请输入密码"
                      show-password
                    />
                  </el-form-item>
                  <div class="login-form-wrapped">
                    <div class="forget-password">
                      <span class="forget-password-button" @click="openDialog"
                        >忘记密码</span
                      >
                    </div>
                    <div class="login-form-wrapped-login">
                      <el-button type="primary" @click="goLogin"
                        >登录</el-button
                      >
                    </div>
                    <div class="login-form-wrapped-register">
                      还没有账号?<span class="register-button">马上注册</span>
                    </div>
                  </div>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="注册" name="second">
                <el-form>
                  <el-form-item label="账号">
                    <el-input
                      v-model="registerData.account"
                      placeholder="账号长度6到12位"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input
                      v-model="registerData.password"
                      placeholder="密码长度6到12位含字母数字"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码">
                    <el-input
                      v-model="registerData.rePassword"
                      placeholder="请再次确认密码"
                    ></el-input>
                  </el-form-item>
                  <div class="footer-register-button">
                    <el-button type="primary" @click="goRegister"
                      >注册</el-button
                    >
                  </div>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-main>
      <el-footer class="footer-wrapped">
        <div class="footer-wrapped-contant">
          <div class="footer-wrapped-contant-title">
            <span>Vue3</span>
            <span>MySQL</span>
            <span>Typescript</span>
            <span>Animate</span>
            <span>Vite</span>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
  <forget_password ref="forgetP" />
</template>

<style lang="scss" scoped>
.header-wrapped {
  &-contant {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-welconme {
      font-size: 13px;
    }
  }
}
.el-main {
  background-image: url("@/assets/login/topBg.jpg");
  background-size: cover;
  background-position: center;
  --el-main-padding: 0;
  height: 600px;
  //登录框
  .center-wrapped {
    margin: 0 auto;
    width: 1200px;
    height: 600px;
    .footer-register-button {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    &-card {
      width: 350px;
      height: 375px;
      float: right;
      position: relative;
      top: 14%;
      .login-form {
        //登录底部外壳
        &-wrapped {
          display: flex;
          flex-direction: column;
          .forget-password {
            display: flex;
            justify-content: flex-end;
            margin: 10px 0;
            &-button {
              font-size: 12px;
              color: #409eff;
              cursor: pointer;
            }
          }
          //底部登录按钮
          &-login {
            width: 100%;
            display: flex;
            justify-content: center;
          }
          &-register {
            font-size: 12px;
            margin: 12px 0;
            display: flex;
            justify-content: center;
            .register-button {
              font-size: 12px;
              color: #409eff;
              cursor: pointer;
              margin-left: 4px;
            }
          }
        }
      }
    }
  }
}
//底部外壳
.footer-wrapped {
  margin-top: 8px;
  &-contant {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 14px;
      color: #989898;
      //在元素后增加|，除了最后一个元素
      &:not(:last-child):after {
        content: "|";
        margin: 6px;
        color: #666;
      }
      &:hover {
        color: #409eff;
      }
    }
  }
}
.el-form {
  margin-top: 30px;
}
//标签
:deep(.el-tabs__item) {
  font-size: 18px;
  color: #338;
}
:deep(.el-input__inner) {
  height: 40px;
}
:deep(.el-form-item__label) {
  height: 40px;
  line-height: 40px;
}
//样式穿透登录按钮
:deep(.el-button) {
  width: 300px;
  height: 45px;
  font-size: 16px;
}
</style>
