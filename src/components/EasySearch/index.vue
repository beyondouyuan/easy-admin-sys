<template>
  <div class="w-full flex-wrap easy-search-container">
    <template v-for="item in list" :key="item.field">
      <div class="easy-search-container__item">
        <component
          :is="item.componentName"
          v-model="form[item.field]"
          v-model:include="form[`${item.field}_exclude`]"
          v-model:record="recordStore[item.field]"
          v-bind="{ ...$attrs, ...item.properties, ...ensureParameters(item) }"
          :ref="(el: any) => setRefs(item.field, el)"
          @visible="(v: boolean) => onVisible(v, item)"
          @update:model-value="(v: any) => onChange(v, item)"
        >
          <template v-for="slot in item.slots" #[slot.name]="scope">
            <slot :name="slot.name" v-bind="scope">
              <component
                :is="isFunction(slot.default) ? slot.default(scope) : slot.default"
                v-bind="scope"
              />
            </slot>
          </template>
        </component>
      </div>
    </template>
    <div class="easy-search-container__item easy-search__toolbar">
      <slot name="toolbar" />
    </div>
  </div>
</template>
<script setup lang="ts" name="EasySearch">
import { reactive, ref, watch } from 'vue'
import { isFunction } from '@/shared/type'
import type { IConfig, IEmits, IForm } from './interfaces'

const props = withDefaults(defineProps<IConfig>(), {
  list: () => [],
})

const emit = defineEmits<IEmits>()

const modelValue = defineModel()
const form = ref<IForm>(modelValue)
const refs = reactive<IForm>({})
const recordStore = ref<IForm>({})

function ensureParameters(item: any) {
  if (item.params && modelValue.value) {
    if (isFunction(item.params)) {
      return {
        params: item.params(form.value),
      }
    }
    const target: any = {}
    for (const key of item.params) {
      target[key] = form.value[key]
    }
    return {
      params: target,
    }
  }
  return {}
}
function onVisible(v: boolean, target: any) {
  emit('update:visible', v, target)
}

function onChange(v: any, target: any) {
  emit('update:change', v, target)
}

// TODO update:tag-remove

function setRefs(field: any, el: any) {
  refs[field] = el
}
watch(
  () => form.value,
  () => {
    modelValue.value = resolveFrom(form.value)
    emit('update:record', recordStore.value)
  },
  { deep: true },
)

function resolveFrom(value: any) {
  const resolveFields = props.list.filter((item: any) => item.resolve)
  for (const item of resolveFields) {
    if (value[item.field]) {
      const resolveValue = item.resolve(value)
      Object.assign(value, resolveValue)
    }
  }
  return value
}

defineExpose({
  refs,
})
</script>
