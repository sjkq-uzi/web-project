<script lang="ts" setup>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { ref, computed, reactive } from "vue";
import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
import { data } from "@/utils/data/systemSetData";
import { useUserInfo } from "@/store/userInfo";
import {
  bindAccount,
  changeName,
  changeGender,
  changeEmail,
} from "@/api/userInfo";
import change from "./components/change_password.vue";
const userStore = useUserInfo();
const item = ref([{ name: "系统设置", iconName: "location" }]);
const activeName = ref("first");
//上传头像成功后的回调
const handleAvatarSuccess: UploadProps["onSuccess"] = async (response) => {
  if (response.status === 0) {
    //调用绑定头像接口
    bindAccount(userStore.account, response.onlyId, response.url).then(
      (res) => {
        console.log("res=", res);
        if (res.data.status === 0) {
          //讲上传的图片地址存到vuex中
          userStore.$patch({
            imageUrl: response.url,
          });
          ElMessage({
            message: "上传头像成功",
            type: "success",
          });
        } else {
          ElMessage.error("上传头像失败请重新上传");
        }
      }
    );
  } else {
    ElMessage.error("更新头像失败请重新上传");
  }
};
//上传之前，对图片进行限制
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("头像必须是JPG格式!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("头像大小必须小于2MB!");
    return false;
  }
  return true;
};
//系统设置页面展示的数据
const arr = reactive(data);
//个人信息展示，从store里中获取
const dataArr = computed(() => {
  const res = arr;
  res.forEach((item, index) => {
    arr[index].modelInfo = userStore[item.id];
  });
  return arr;
});
//子组件实例
const changeP = ref();
//个人信息管理遍历数据的类型
interface itemData {
  name: string;
  id: string;
  modelInfo: string;
  hasInput: boolean;
  hasSelect: boolean;
  hasButton: boolean;
  isDisabled: boolean;
  buttonText: string;
}
//修改按钮点击事件
const onClick = async (item: itemData) => {
  const id = localStorage.getItem("id");
  let dataConfig: any;
  switch (item.id) {
    case "Password":
      changeP.value.openChangePasswordDialog();
      break;
    case "name":
      dataConfig = await changeName(id, item.modelInfo);
      !dataConfig.data.status &&
        userStore.$patch({
          name: item.modelInfo,
        });
      break;
    case "gender":
      dataConfig = await changeGender(id, item.modelInfo);
      !dataConfig.data.status &&
        userStore.$patch({
          gender: item.modelInfo,
        });
      break;
    case "email":
      dataConfig = await changeEmail(id, item.modelInfo);
      !dataConfig.data.status &&
        userStore.$patch({
          email: item.modelInfo,
        });
    default:
      break;
  }
  ElMessage({
    showClose: true,
    message: dataConfig.data.message,
    type: dataConfig.data.status === 0 ? "success" : "error",
  });
  console.log("dataConfig=", dataConfig);
};
</script>

<template>
  <Breadcrumb ref="breadCrumb" :items="item"> </Breadcrumb>
  <!-- 公共外壳 -->
  <div class="common-wrapped">
    <div class="common-content">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="账号详情" name="first">
          <div class="common-content-account">
            <span>用户头像</span>
            <div class="common-content-account-item">
              <!-- action是上传头像接口 -->
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:3007/users/uploadAvatar"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="userStore.imageUrl"
                  :src="userStore.imageUrl"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </div>
          </div>
          <div
            class="common-content-account"
            v-for="(item, index) in dataArr"
            :key="index"
          >
            <span>{{ item.name }}</span>
            <div class="common-content-account-item">
              <el-input
                v-if="item.hasInput"
                v-model="item.modelInfo"
                :disabled="item.isDisabled"
              ></el-input>
              <el-select
                v-if="item.hasSelect"
                v-model="item.modelInfo"
                placeholder="请选择你的性别"
              >
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
              <el-button
                v-if="item.hasButton"
                type="primary"
                @click="onClick(item)"
                >{{ item.buttonText }}
              </el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">Config</el-tab-pane>
        <el-tab-pane label="首页管理" name="third">Role</el-tab-pane>
        <el-tab-pane label="其他设置" name="fourth">Task</el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <change ref="changeP" />
</template>

<style lang="scss" scoped>
.common-wrapped {
  padding: 8px;
  background: #f5f5f5;
  height: calc(100vh - 111px);
  .common-content {
    padding: 0, 10px;
    height: 100%;
    background: #fff;
    //账号信息外壳
    &-account {
      display: flex;
      align-items: center;
      padding-left: 50px;
      margin-bottom: 24px;
      //头像
      &-item {
        display: flex;
        align-items: center;
        margin-left: 20px;
        margin-right: 16px;
        .el-button {
          margin-left: 20px;
        }
        .el-select {
          width: 240px;
        }
        .el-input {
          width: 240px;
        }
      }
    }
  }
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

//上传头像
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
:deep(.el-tabs__header) {
  margin-left: 18px;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
