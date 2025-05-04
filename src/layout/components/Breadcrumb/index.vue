<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="(item, index) in routes" :key="item.path">
      <span v-if="index === routes.length - 1">
        {{ $t(item.meta.title) }}
      </span>
      <a v-else @click.prevent="onPress(item)">{{ $t(item.meta.title) }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts" name="Breadcrumb">
import { watch, ref } from 'vue'
import { uniqBy } from 'lodash-es'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const routes = ref<any[]>([])
const onPress = (item: any) => {
  router.push({
    path: item.path
  })
}

watch(
  () => route.path,
  () => {
    const matched = route.matched.filter((item) => item.meta && item.meta.title)
    routes.value = uniqBy(matched, 'path')
  },
  { immediate: true }
)
</script>
