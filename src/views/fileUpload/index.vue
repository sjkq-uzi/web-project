<script setup lang="ts">
//面包屑
import Breadcrumb from "@/components/Breadcrumb.vue";
import { ref, onMounted, watch } from "vue";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
//引入VueOfficeExcel组件
import * as VueOfficeExcel from "@vue-office/excel";
//引入相关样式
import "@vue-office/excel/lib/index.css";
const item = ref([{ name: "文件转换", iconName: "location" }]);
const excel = ref();
const isUpload = ref(true);
const renderedHandler = () => {
  console.log("渲染完成");
};
const errorHandler = () => {
  console.log("渲染失败");
};
onMounted(() => {
  const dom = document.getElementById("dropzone-file-upload");
  Dropzone.autoDiscover = false;
  //初始化Dropzone实例处理文件上传
  let myDropzone = new Dropzone(dom, {
    url: "http://8.135.36.9/utils/fileUpload",
    method: "post",
    paramName: "file",
    maxFilesize: 10, // MB
    maxFiles: 1,
    addRemoveLinks: true,
    acceptedFiles: ".xlsx,.js",
    headers: [{ "L-custom-header": "js-xlsx" }],
    dictMaxFilesExceeded: "您只能上传一个文件。", // 超过文件数限制时的提示信息
  });
  //文件上传成功时
  myDropzone.on("success", (file: Blob, response: any) => {
    // 成功事件触发时，执行的回调函数
    console.log("response=", response);
    // 使用 FileReader 读取文件内容
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    // 读取成功后，执行的回调函数
    reader.onload = (loadEvent) => {
      // 获取读取成功的 ArrayBuffer
      let arrayBuffer = loadEvent.target.result;
      excel.value = arrayBuffer;
    };
    isUpload.value = false;
    console.log("A file has been added");
  });
  myDropzone.on("addedfile", () => {
    //确保上传文件只能有一个
    if (myDropzone.files.length > 1) {
      myDropzone.removeFile(myDropzone.files[1]);
    }
  });
  myDropzone.on("removedfile", () => {
    //文件全部删除时回复文件上传状态
    if (myDropzone.files.length === 0) {
      isUpload.value = true;
    }
  });
});
</script>

<template>
  <Breadcrumb ref="breadCrumb" :items="item" />
  <div class="wrapped-content">
    <div
      id="dropzone-file-upload"
      action="http://8.135.36.9/utils/fileUpload"
      method="post"
    >
      <div v-if="isUpload">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <span style="padding: 10px">文件上传</span>
      </div>
    </div>

    <vue-office-excel
      style="height: 80vh"
      :src="excel"
      @rendered="renderedHandler"
      @error="errorHandler"
    />
  </div>
</template>

<style lang="scss" scoped>
#dropzone-file-upload {
  height: 200px;
  border: 1px solid;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.25);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(.dz-success-mark) {
  display: none;
}
:deep(.dz-error-mark) {
  display: none;
}
</style>
