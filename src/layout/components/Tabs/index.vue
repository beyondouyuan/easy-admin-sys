<template>
  <div class="tabs-container">
    <div class="tabs-wrapper">
      <el-tabs v-model="modelValue" @tab-click="onPress" @tab-remove="onRemove">
        <el-tab-pane
          v-for="item in tabs"
          :key="item.path"
          :name="item.path"
          :closable="item.closable"
        >
          <template #label>
            <el-icon v-if="item.icon" class="tabs-icon">
              <component :is="item.icon"></component>
            </el-icon>
            {{ ensureTitle(item) }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTabsStore } from '@/stores/packages/tabs'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const tabsStore = useTabsStore()
const { t } = useI18n()

const modelValue = ref(route.fullPath)
const tabs = computed(() => tabsStore.tabs)

watch(
  () => route.fullPath,
  () => {
    modelValue.value = route.fullPath
    const tab = {
      icon: route.meta.icon as string,
      title: route.meta.title as string,
      path: route.fullPath,
      name: route.name as string,
      closable: true,
    }
    tabsStore.add(tab)
  },
  { immediate: true },
)

const onPress = (item: any) => {
  const fullPath = item.props.name as string
  router.push(fullPath)
}

const onRemove = (path: string) => {
  tabsStore.remove(path, path == route.fullPath)
}

const ensureTitle = (item: any) => {
  if (item.title) {
    return t(item.title)
  }
  return item.title || 'unkonwk'
}
</script>
<style lang="scss" scoped>
.tabs-container {
  padding: 0 10px;
  border-top: 1px solid var(--vt-c-divider-light-2);
  background-color: #ffffff;

  :deep(.el-tabs__header) {
    margin-bottom: 0 !important;
  }
}
</style>
