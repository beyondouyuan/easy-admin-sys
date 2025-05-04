<template>
  <el-cascader v-model="value" v-bind="$attrs" />
</template>
<script setup lang="ts" name="Cascader">
import { ref } from 'vue'

const value = ref([])
</script>
