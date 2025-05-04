<template>
  <div class='easy-tag'>
    <template v-for="item in options" :key="item.value">
      <component :is="componentName" :checked="records.includes(item.value)" @change="(v: boolean) => onChange(item, v)"
        v-bind="{ ...$attrs, ...item }">
        <slot :scope="item">
          <span>{{ item.label }}</span>
        </slot>
      </component>
    </template>
  </div>
</template>

<script setup lang="ts" name="EasyTag">
import { ref } from 'vue'
import { isArray } from '@/shared/type'
import type { ITag, IValue, IOptions, IEmits } from './interfaces'

const props = withDefaults(defineProps<ITag>(), {
  options: () => [],
  multiple: false,
  selectable: false
})

const componentName = props.selectable ? 'el-check-tag' : 'el-tag'

const emit = defineEmits<IEmits>()

const records = ref<IValue[]>([])
const modelValue = defineModel<any>()
records.value = isArray(modelValue.value) ? modelValue.value : [modelValue.value]

function onChange(item: IOptions, status: boolean) {
  if (props.multiple) {
    selectMultiple(item, status)
  } else {
    selectSingle(item, status)
  }

  updateModelValue()
}

function selectSingle(item: IOptions, status: boolean) {
  if (status) {
    const idx = records.value.findIndex((v: string | number) => v === item.value)
    if (idx > -1) {
      records.value.splice(idx, 1)
    } else {
      records.value = [item.value]
    }
  } else {
    records.value = []
  }
}

function selectMultiple(item: IOptions, status: boolean) {
  if (status) {
    records.value.push(item.value)
  } else {
    const idx = records.value.findIndex((v: string | number) => v === item.value)
    records.value.splice(idx, 1)
  }
}

function updateModelValue() {
  if (props.multiple) {
    modelValue.value = records.value
  } else {
    modelValue.value = records.value[0]
  }
  emit('update:modelValue', modelValue.value)
}

</script>