<template>
  <el-tooltip popper-class="easy-tooltip" v-bind="$attrs">
    <template v-for="slot in Object.keys(slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </el-tooltip>
</template>
<script setup lang="ts" name="EasyTooltip">
import { type Slots, useSlots } from 'vue'
const slots: Slots = useSlots()
</script>
