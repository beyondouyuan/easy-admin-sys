<template>
  <div class="easy-layout_logo flex-align-center">
    <div class="img"></div>
    <template v-if="show">
      <div style="font-size: 18px; padding-left: 10px">Easy Admin</div>
    </template>
  </div>
</template>
<script setup lang="ts" name="EasyLogo">
import { computed } from 'vue'
import { useGlobalStore } from '@/stores/packages/global'
const state = useGlobalStore()
const show = computed(() => !state.collapse)
</script>
