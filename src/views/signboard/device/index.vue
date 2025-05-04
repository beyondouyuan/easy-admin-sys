<template>
  <div class="easy-page">
    signboard/device
    <el-button @click="onPress">进入详情页</el-button>
  </div>
</template>
<script setup lang="ts" name="SignboardDevice">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  console.log('device page mounted')
})

const onPress = () => {
  router.push({
    path: '/signboard/device/detail',
    query: {
      id: 1,
    },
  })
}
</script>
