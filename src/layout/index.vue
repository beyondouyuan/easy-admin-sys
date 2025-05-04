<template>
  <div class="w-full h-full flex easy-layout" :class="layout">
    <div class="flex-y easy-layout_sidebar">
      <EasyLogo />
      <EasySidebar :collapse="state.collapse" />
    </div>
    <div class="easy-layout_body">
      <EasyHeader />
      <EasyTabs />
      <RouterView v-slot="{ Component }">
        <transition appear name="fade-transform" mode="in-out">
          <component :is="Component" />
        </transition>
      </RouterView>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useGlobalStore } from '@/stores/packages/global'

import EasySidebar from './components/Sidebar/index.vue'
import EasyHeader from './components/Header/index.vue'
import EasyLogo from './components/Logo/index.vue'
import EasyTabs from './components/Tabs/index.vue'

const state = useGlobalStore()

const layout = computed(() => {
  const classname = state.collapse ? 'collapse' : 'expand'
  return `easy-layout--${classname}`
})
</script>
