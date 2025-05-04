<template>
  <el-scrollbar class="flex-1 easy-scrollbar">
    <el-menu
      class="w-full easy-menu"
      v-bind="$attrs"
      unique-opened
      router
      popper-effect="light"
      :default-active="activeRoute(route)"
    >
      <EasyMenu :source-data="sourceData" />
    </el-menu>
  </el-scrollbar>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import EasyMenu from './menu.vue'
import usePermission from '@/hooks/use-permission'
import { useRoute } from 'vue-router'

const { menus } = usePermission()
const sourceData = ref(menus)
const route = useRoute()
const activeRoute = (route: any) => {
  return route.meta.active || route.path
}
</script>
