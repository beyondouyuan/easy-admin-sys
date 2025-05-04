<template>
  <component :is="selectorComponent" ref="selectRef" class="easy-select" :placeholder="SELECTOR_PLACEHOLDER" v-model="modelValue" v-bind="$attrs">
    <template v-for="slot in Object.keys(slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </component>
</template>
<script setup lang="ts" name="EasySelect">
import { type Slots, computed, shallowRef, useSlots } from 'vue'
import { SELECTOR_PLACEHOLDER } from '@/constants/global'

import Selector from './Selector/index.vue'
import Cascader from './Cascader/index.vue'
import Calendar from './Calendar/index.vue'
import Tree from './Tree/index.vue'

import type { TSelector } from '@/types'

const props = withDefaults(defineProps<{ selector?: TSelector }>(), {
  selector: 'selector'
})
const slots: Slots = useSlots()
const selectRef = shallowRef()
const modelValue = defineModel()

const selectorMap = {
  selector: Selector,
  cascader: Cascader,
  calendar: Calendar,
  tree: Tree
}

const selectorComponent = computed(() => {
  return selectorMap[props.selector]
})

defineExpose({
  selectRef
})
</script>
