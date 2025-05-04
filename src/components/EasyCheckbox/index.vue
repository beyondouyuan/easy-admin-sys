<template>
  <div class="easy-checkbox">
    <el-checkbox-group v-bind="$attrs">
      <template v-for="option in options" :key="option.value">
        <component :is="comp" :value="option.value" :label="option.value">{{
          option.label
        }}</component>
      </template>
    </el-checkbox-group>
  </div>
</template>
<script setup lang="ts" name="EasyCheckbox">
import { computed } from 'vue'
import type { ICheckboxOptions } from './interfaces'

const props = withDefaults(defineProps<ICheckboxOptions>(), {
  options: () => [],
  type: 'button',
})

const comp = computed(() => {
  return props.type === 'checkbox' ? 'el-checkbox' : 'el-checkbox-button'
})
</script>
