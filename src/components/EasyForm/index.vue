<template>
  <el-form class="easy-form" v-bind="$attrs" :model="modelValue">
    <template v-for="item in configure.list" :key="item.prop">
      <template v-if="formItemVisible(item)">
        <EasyFormItem v-bind="{ ...formItemProps(item), prop: getFullPropPath(item) }">
          <template v-if="item.dimension">
            <component
              :is="item.componentProps.componentName"
              v-bind="componentProps(item)"
              v-model="modelValue[item.dimension][item.prop]"
            >
              <template
                v-for="slot in item.componentProps.slots"
                #[slot.name]="scope"
                :key="slot.name"
              >
                <component :is="slot.default" v-bind="{ ...scope, ...item.componentProps }" />
              </template>
            </component>
          </template>
          <template v-else>
            <component
              :is="item.componentProps.componentName"
              v-bind="componentProps(item)"
              v-model="modelValue[item.prop]"
            >
              <template
                v-for="slot in item.componentProps.slots"
                #[slot.name]="scope"
                :key="slot.name"
              >
                <component :is="slot.default" v-bind="{ ...scope, ...item.componentProps }" />
              </template>
            </component>
          </template>
        </EasyFormItem>
      </template>
    </template>
  </el-form>
</template>
<script setup lang="ts" name="EasyForm">
import { useAttrs } from 'vue'
import { useFormItemVisible, useFormItemProps, useComponentProps } from '@/hooks/use-form'
import type { IForm } from './interfaces'

withDefaults(defineProps<IForm>(), {
  configure: () => ({
    list: [],
  }),
  disabled: false,
})

const modelValue = defineModel<any>({ required: true })
const attrs = useAttrs()

function ensurePayload() {
  return attrs.payload || {}
}

// TODO 接受传入自定义的resolveForeItemVisible函数
function formItemVisible(item: any) {
  const payload = ensurePayload()
  return useFormItemVisible(item, modelValue, payload)
}

// TODO 接受传入自定义的resolveForeItemProps函数
function formItemProps(item: any) {
  const payload = ensurePayload()
  return useFormItemProps(item, modelValue, payload)
}

// TODO 接受传入自定义的resolveComponentProps函数
function componentProps(item: any) {
  const payload = ensurePayload()
  return useComponentProps(item, modelValue, payload)
}

// 获取完整的属性路径（支持分组）
function getFullPropPath(item: any) {
  return item.dimension ? `${item.dimension}.${item.prop}` : item.prop
}
</script>
