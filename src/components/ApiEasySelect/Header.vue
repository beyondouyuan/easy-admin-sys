<template>
  <Header :headers="headers" />
</template>
<script setup lang="tsx" name="Header">
import { useI18n } from 'vue-i18n'
import { CLUDE_DIC } from '@/constants/dictionaries';
import { isFunction } from '@/shared/type'
import type { IRender } from './interfaces'

const { t } = useI18n()

defineProps<{ headers?: string[] | IRender[] }>()

const emits = defineEmits(['update:select', 'update:clear'])

const renderTypes: Record<string, Function> = {
  include: renderInclude,
  all: renderAll
}

const modelValue = defineModel()

function onSelect() {
  emits('update:select')
}

function onClear() {
  emits('update:clear')
}

function renderAll() {
  return (
    <div class="flex-align-center flex-1 flex-justify-end">
      <el-text class="pointer" onClick={onSelect} type="primary">
        {t('global.all')}
      </el-text>
      <el-text class="easy-space-base--left pointer" onClick={onClear} type="danger">
        {t('global.clear')}
      </el-text>
    </div>
  )
}

function renderInclude() {
  return (
    <div class="flex-align-center flex-1">
      <easy-radio
        v-model={modelValue.value}
        options={CLUDE_DIC}
        type="radio"
        class="flex-align-center flex-no-wrap"
      />
    </div>
  )
}

function renderHeaders(headers: IRender[]) {
  return headers?.length ? (
    <div class="flex-align-center flex-space-between easy-select--header">
      {headers.map((item: any) => {
        const render = renderTypes[item] ? renderTypes[item] : item
        return isFunction(render) ? render() : render
      })}
    </div>
  ) : null
}

const Header = (props: any) => {
  return renderHeaders(props.headers)
}
</script>
