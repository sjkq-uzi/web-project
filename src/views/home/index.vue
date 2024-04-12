<script lang="ts" setup>
const qrCodeValue = "GEO:37.7749,-122.4194";
const qrCodeSize = 2000;
const bgColor = "#f03d3d";
</script>

<template>
  <div>
    <vue-qrcode
      :value="qrCodeValue"
      :size="qrCodeSize"
      :bg-color="bgColor"
      color="#f03d3d"
    ></vue-qrcode>
  </div>
</template>

<style lang="scss" scoped></style>
