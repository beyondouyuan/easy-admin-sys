<template>
  <el-tree-select
    v-model="treeModel"
    v-bind="$attrs"
    v-popper="{ enhanced }"
    v-lazy="onLazy"
    :data="options"
    ref="treeRef"
    :fallback-placements="['bottom-start']"
    :popper-options="popperOptions"
  >
    <template v-for="slot in Object.keys(slots)" #[slot]="scope">
      <slot :name="slot" v-bind="{ ...scope, item: scope.data }" />
    </template>
  </el-tree-select>
</template>
<script setup lang="ts" name="Tree">
import { type Slots, useAttrs, shallowRef, ref, computed, watch, useSlots } from 'vue'
import { uniq } from 'lodash-es'
import { flattenArray, differenceArray } from '@/shared/array'
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
const treeModel = ref<any[]>([])

const treeRef = shallowRef()
const options = computed(() => attrs.options)
const enhanced = computed(() => attrs.enhanced)

function onLazy(atBottom: boolean) {
  if (atBottom) {
    emit('update:lazy', atBottom)
  }
}
function resolveAddNode(values: any[]) {
  const checkedList = flattenArray(options.value).filter((item) => values.includes(item.value))
  setTimeout(() => {
    treeRef.value.setCheckedNodes(checkedList, false)
  }, 30)
}

function resolveAddValue(array: any[]) {
  const values = []
  for (const item of array) {
    const target = flattenArray(options.value).find((opt: any) => {
      return opt.__uuid__ === item
    })
    if (target) {
      values.push(target.value)
    }
  }
  const res = uniq(values)

  resolveAddNode(values)

  return res
}

function resolveRemoveValue(array: any[]) {
  const values: any[] = []
  for (const item of array) {
    const target = flattenArray(options.value).find((opt: any) => {
      return opt.__uuid__ === item
    })
    if (target) {
      values.push(target.value)
    }
  }
  return differenceArray(modelValue.value as any[], values)
}

function resolveTree(newVal: any[], oldVal: any[]) {
  if (newVal.length > oldVal.length) {
    return resolveAddValue(newVal)
  }
  const differences = differenceArray(oldVal, newVal)
  return resolveRemoveValue(differences)
}

watch(
  treeModel,
  (newVal, oldVal) => {
    modelValue.value = resolveTree(newVal, oldVal)
  },
  { deep: true },
)
</script>
