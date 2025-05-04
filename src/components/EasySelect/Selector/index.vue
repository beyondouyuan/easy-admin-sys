<template>
  <el-select-v2
    v-model="modelValue"
    v-bind="$attrs"
    v-popper="{ ref: selectRef, enhanced }"
    v-lazy="[onLazy, selectRef]"
    ref="selectRef"
    :fallback-placements="['bottom-start']"
    :popper-options="popperOptions"
  >
    <template v-for="slot in Object.keys(slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </el-select-v2>
</template>
<script setup lang="ts" name="Selector">
import { type Slots, computed, shallowRef, useAttrs, useSlots } from 'vue'
const popperOptions = {
  placement: 'bottom-start',
  modifiers: [
    {
      name: 'preventOverflow',
      options: {
        boundary: 'viewport',
        padding: 0,
      },
    },
    {
      name: 'flip',
      options: {
        boundary: 'viewport',
        padding: 0,
        flipVariations: false,
      },
    },
  ],
}

interface IEmits {
  (e: 'update:lazy', value: any): void
}

const emit = defineEmits<IEmits>()

const slots: Slots = useSlots()
const attrs: any = useAttrs()
const modelValue = defineModel()

const selectRef = shallowRef()
const enhanced = computed(() => attrs.enhanced)

function onLazy(atBottom: boolean) {
  if (atBottom) {
    emit('update:lazy', atBottom)
  }
}
</script>
