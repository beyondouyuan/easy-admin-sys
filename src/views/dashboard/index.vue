<template>
  <div>
    <el-button type="primary" @click="onPress">跳转</el-button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const onPress = () => {
  router.push({
    path: '/signboard/system',
  })
}
</script>
