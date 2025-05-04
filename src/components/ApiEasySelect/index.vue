<template>
  <EasySelect
    v-bind="$attrs"
    v-model="modelValue"
    :loading="loading"
    :remote="remote"
    :options="sourceData"
    :selector="selector"
    :enhanced="enhanced"
    popper-class="easy-select--popper"
    @visible-change="onVisible"
    @update:lazy="onLazy"
  >
    <template v-if="prefix" #prefix>
      <span>{{ prefix }}</span>
    </template>
    <template v-if="headers?.length" #header>
      <Header
        v-model="include"
        :headers="headers"
        @update:model-value="onChange"
        @update:clear="onClear"
        @update:select="selectAll"
      />
    </template>
    <template #label="item">
      <Default :scope="{ item: ensureScope(item), render }" />
    </template>
    <template #default="{ item }">
      <Default :scope="{ item, render }" />
    </template>
    <template v-if="enhanced" #footer>
      <Enhancer
        :scope="{ render, options: selectRecord as IMeta.IAttrs[] }"
        :selectedEnhancer="selectedEnhancer"
        @update:delete="onDelete"
      />
    </template>
    <template v-for="slot in Object.keys(slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </EasySelect>
</template>
<script setup lang="ts" name="ApiEasySelect">
import { type Slots, onMounted, watch, computed, useAttrs, useSlots } from 'vue'
import Header from './Header.vue'
import Enhancer from './Enhancer.vue'
import Default from './Default'

import useSelect from './hooks'
import { API_SELECT_DEFAULT_PROPS } from './configure'
import { type ISelector } from './interfaces'
import type { IMeta } from '@/interfaces/meta'

interface IEmits {
  (e: 'visible', value: boolean): void
  (e: 'update:include', value: number): void
  (e: 'update:record', value: any): void
}

const props = withDefaults(defineProps<ISelector>(), API_SELECT_DEFAULT_PROPS)

const slots: Slots = useSlots()
const attrs = useAttrs()
const modelValue = defineModel<any>()

const emit = defineEmits<IEmits>()

const {
  loading,
  include,
  remote,
  sourceData,
  selectRecord,
  selectedEnhancer,
  ensureScope,
  onLazy,
  initialize,
  dispatch,
  onClear,
  selectAll,
  onDelete,
} = useSelect(props, modelValue)

function onVisible(v: boolean) {
  emit('visible', v)
  if (v) {
    initialize()
  }
}

function onChange(v: number) {
  emit('update:include', v)
}

const enhanced = computed<boolean>((): boolean => {
  return props.enhancer && Boolean(attrs.multiple)
})

watch(
  () => selectRecord.value,
  () => {
    updateRecord(selectRecord.value)
  },
  { deep: true },
)

// 将完整的筛选数据字段暴露出去
function updateRecord(value: any) {
  if (!attrs.record) {
    return
  }
  let data = value
  if (!attrs.multiple) {
    data = value[0]
  }
  emit('update:record', data)
}

onMounted(() => {
  if (props.immediate) {
    initialize()
  }
})

defineExpose({
  dispatch,
})
</script>
