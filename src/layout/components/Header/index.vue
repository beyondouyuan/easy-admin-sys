<template>
  <header class="flex-align-center flex-shrink easy-layout_header">
    <div class="flex-align-center easy-space-base--left icon-size--m collapse-toolbar">
      <el-icon class="pointer easy-space-base--right icon-size--m" @click="handelToggle">
        <CollapseIcon />
      </el-icon>
      <Breadcrumb />
    </div>
    <div class="flex-1 flex-align-center flex-justify-end easy-layout_header--nav">
      <div class="flex-align-center h-full easy-layout_header--nav_list">
        <EasyDropdown :options="locales" @command="localeCommand">
          <template #default>
            <div class="pointer">{{ locale }}</div>
          </template>
        </EasyDropdown>
      </div>
      <div class="flex-align-center h-full easy-layout_header--nav_list">
        <EasyDropdown :options="options" @command="handleCommand">
          <template #default>
            <el-avatar size="small" :src="state.user.avatar" />
          </template>
        </EasyDropdown>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts" name="EasyHeader">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Expand, Fold } from '@element-plus/icons-vue'
import { useGlobalStore } from '@/stores/packages/global'

import Breadcrumb from '../Breadcrumb/index.vue'
import type { TLocale } from '@/types'
const { t } = useI18n()

const options = [
  {
    label: t('global.mine'),
    command: 'mine',
  },
  {
    label: t('global.logout'),
    command: 'logout',
  },
]

const locales = [
  {
    label: '中文',
    command: 'zh',
  },
  {
    label: 'EN',
    command: 'en',
  },
]

const state = useGlobalStore()

const locale = computed(() => (state.locale === 'zh' ? '中文' : 'EN'))
const CollapseIcon = computed(() => (state.collapse ? Expand : Fold))

const localeCommand = (command: TLocale) => {
  state.setLocale(command)
}
const handleCommand = (command: any) => {
  console.log(command)
}
const handelToggle = () => {
  state.toggle()
}
</script>
