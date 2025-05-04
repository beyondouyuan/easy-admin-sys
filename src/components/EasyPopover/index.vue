<template>
  <el-popover popper-class="easy-popper" v-bind="$attrs" v-model:visible="modelValue">
    <template v-for="slot in Object.keys(slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </el-popover>
</template>
<script setup lang="ts" name="EasyPopover">
import { type Slots, ref, useSlots } from 'vue'
const slots: Slots = useSlots()
const modelValue = ref(false)
const show = () => modelValue.value = true
const hide = () => modelValue.value = false

defineExpose({
  show,
  hide
})
</script>
