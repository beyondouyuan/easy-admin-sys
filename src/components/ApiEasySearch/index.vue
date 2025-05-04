<template>
  <div class="easy-api-search">
    <div class="body">
      <div class="content">
        <slot v-if="configure.header" name="header">
          <header class="easy-api-search__header">{{ configure.header }}</header>
        </slot>
        <section class="flex">
          <slot v-if="configure.label" name="label">
            <aside class="flex-align-center easy-api-search__label">{{ configure.label }}</aside>
          </slot>
          <div class="flex-1">
            <EasySearch
              v-bind="$attrs"
              :list="configure.list"
              v-model="modelValue"
              :ref="setRefs"
              @update:visible="onUpdateVisible"
              @update:change="onUpdateChange"
            >
              <template #toolbar>
                <slot name="toolbar">
                  <template v-if="toolbar">
                    <template v-for="item in toolbars" :key="item.value">
                      <el-button :type="item.type" @click="onPress(item.value)">{{
                        item.label
                      }}</el-button>
                    </template>
                  </template>
                </slot>
              </template>
              <template v-for="slot in configure.slots" #[slot.name]="scope" :key="slot.name">
                <component :is="slot.default" v-bind="scope" />
              </template>
            </EasySearch>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="ApiEasySearch">
import { nextTick, ref } from 'vue'
import { TOOLBAR_DIC } from '@/constants/dictionaries'
import useApiSearcher from './hooks'
import type { IConfigure, IEmits } from './interfaces'

withDefaults(defineProps<IConfigure>(), {
  configure: () => ({
    list: [],
    label: '',
    header: '',
  }),
  toolbar: false,
  toolbars: () => TOOLBAR_DIC,
})

const emit = defineEmits<IEmits>()

const namespace = 'EasySearch'

const modelValue = defineModel()
const hasSelectorVisible = ref<boolean>(false)

const { schedulerJobs, setRefs } = useApiSearcher(namespace)

async function onUpdateVisible(v: boolean, target: any) {
  hasSelectorVisible.value = v
  if (!v) {
    if (!(target && target.properties.multiple)) {
      return
    }
    await schedulerJobs(target)
    emit('update:search', true)
  }
}
async function onUpdateChange(v: any, target: any) {
  await nextTick()
  if (!target) {
    return
  }
  if (target?.properties?.multiple && hasSelectorVisible.value) {
    return
  }
  await schedulerJobs(target)
  if (target?.linkages?.length > 0) {
    return
  }
  emit('update:search', true)
}

function onPress(value: string) {
  emit('update:press', value)
}
</script>
