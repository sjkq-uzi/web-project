<script setup>
import Breadcrumb from "@/components/Breadcrumb.vue";
import { ref } from "vue";
const item = ref([{ name: "模板管理", iconName: "location" }]);

</script>

<template>
    <Breadcrumb ref="breadCrumb" :items="item"> </Breadcrumb>

</template>

<style scoped></style>
