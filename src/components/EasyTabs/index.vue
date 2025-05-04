<template>
  <el-tabs v-bind="$attrs" class="easy-tabs">
    <template v-for="item in options" :key="item[value]">
      <el-tab-pane :name="item[value]" :closable="item.closable">
        <template #label>
          <slot name="label" v-bind="item" />
        </template>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>
<script setup lang="ts" name="EasyTabs">
import type { ITabs } from './interfaces'

withDefaults(defineProps<ITabs>(), {
  options: () => [],
  value: 'value',
  label: 'label',
})
</script>
