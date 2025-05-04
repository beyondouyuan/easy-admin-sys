<template>
  <el-switch class="easy-switch" size="small" v-bind="$attrs" @change="onChange"></el-switch>
</template>
<script setup lang="ts" name="EasySwitch">
interface IEmits {
  (e: 'change', value: any): void
}
const emit = defineEmits<IEmits>()
function onChange(v: any) {
  emit('change', v)
}
</script>
