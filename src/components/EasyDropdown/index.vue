<template>
  <el-dropdown class="easy-dropdown" popper-class="easy-dropdown--popper" v-bind="$attrs">
    <slot name="default">
      <el-button type="primary">{{ text }}</el-button>
    </slot>
    <template #dropdown>
      <el-dropdown-menu>
        <template v-for="item in options" :key="item.command">
          <el-dropdown-item v-bind="item">
            <slot name="label" :scope="item">
              <div>{{ item.label }}</div>
            </slot>
          </el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts" name="EasyDropdown">
import type { IDropdown } from './interfaces'

withDefaults(defineProps<IDropdown>(), {
  options: () => [],
  text: ''
})
</script>