<template>
  <el-dialog destroy-on-close append-to-body align-center v-bind="$attrs" v-model="visible" class="easy-dialog">
    <template #header></template>
    <div class="easy-dialog_body">
      <slot />
    </div>
    <template #footer>
      <div class="flex-align-center flex-justify-end">
        <el-button type="danger" @click="onClose">{{ $t('global.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{ $t('global.confirm') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts" name="EasyDialog">
import { ref } from 'vue'

interface IEmits {
  (e: 'close', value: boolean): void
  (e: 'confirm', value: boolean): void
}

const emit = defineEmits<IEmits>()

const visible = ref<boolean>(false)

const show = () => {
  visible.value = true
}
const hide = () => {
  visible.value = false
}
const onClose = () => {
  hide()
  emit('close', true)
}
const onConfirm = () => {
  hide()
  emit('confirm', true)
}
defineExpose({
  visible,
  show,
  close
})
</script>
