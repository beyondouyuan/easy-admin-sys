<template>
  <el-date-picker v-model="value" v-bind="$attrs" />
</template>
<script setup lang="ts" name="Calendar">
import { ref } from 'vue'

const value = ref()
</script>
