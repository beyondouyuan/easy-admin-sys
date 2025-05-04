<template>
  <div class="easy-radio">
    <el-radio-group v-bind="{ ...TRANSPARENT_RADIO_BUTTON, ...$attrs }" v-model="modelValue">
      <template v-for="option in options" :key="option.value">
        <component :is="comp" :value="option.value">{{ option.label }}</component>
      </template>
    </el-radio-group>
  </div>
</template>
<script setup lang="ts" name="EasyRadio">
import { computed } from 'vue'
import type { IRadio } from './interfaces'
import { TRANSPARENT_RADIO_BUTTON } from '@/constants/global'

const props = withDefaults(defineProps<IRadio>(), {
  options: () => [],
  type: 'button',
})

const modelValue = defineModel()
const comp = computed(() => {
  return props.type === 'radio' ? 'el-radio' : 'el-radio-button'
})
</script>
