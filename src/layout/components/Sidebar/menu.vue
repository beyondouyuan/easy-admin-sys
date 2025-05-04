<template>
  <template v-for="item in sourceData" :key="ensurePath(item)">
    <el-sub-menu v-if="ensureMenu(item)" :index="ensurePath(item)">
      <template #title>
        <!-- <el-icon v-if="item.icon"><i :class="`iconfont icon-${item.icon}`" /> </el-icon> -->
        <el-icon v-if="item.parentPath === '/'"><Menu /> </el-icon>
        <span>{{ ensureTitle(item.title) }}</span>
      </template>
      <EasyMenu :source-data="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="ensurePath(item)">
      <!-- <el-icon v-if="item.icon"><i :class="`iconfont icon-${item.icon}`" /></el-icon> -->
      <el-icon v-if="item.parentPath === '/'"><Menu /> </el-icon>
      <template #title>
        <span>{{ ensureTitle(item.title) }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
<script setup lang="ts" name="EasyMenu">
import { Menu } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
interface IMeta {
  [key: string]: string
  title: string
}
interface IRoute {
  [key: string]: any
  title: string
  path: string
  meta: IMeta
  children?: IRoute[]
}
interface ISourceData {
  sourceData: IRoute[]
}

const { t } = useI18n()

const ensurePath = (route: any) => {
  const { parentPath, path, root, children = [] } = route
  if (root && children.length === 1) {
    return `${children[0].parentPath}/${children[0].path}`
  }
  const fullPath = children?.length || parentPath === '/' ? path : `${parentPath}/${path}`
  return fullPath
}

const ensureTitle = (title: any) => {
  return t(title)
}

const ensureMenu = (item: any) => {
  return item.root ? false : item?.children?.length
}

withDefaults(defineProps<ISourceData>(), {
  sourceData: () => [],
})
</script>
