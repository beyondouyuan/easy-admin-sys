<template>
  <div class="h-full flex-y easy-api-select-enhancer">
    <header class="flex-align-center easy-api-select-enhancer--header">
      <div class="toolbar flex-align-center">
        {{ selectedEnhancer }}
      </div>
    </header>
    <div class="flex-1 easy-api-select-enhancer--content">
      <el-scrollbar tag="ul" class="easy-api-select-enhancer--list">
        <li
          class="pointer easy-api-select-enhancer--item"
          v-for="item in scope.options"
          :key="item.value"
        >
          <div class="h-full flex-align-center">
            <Default :scope="{ item, render: scope.render }" class="flex-1" />
            <i
              class="iconfont icon-close--o pointer easy-space-base--left"
              @click="onPress(item)"
            />
          </div>
        </li>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup lang="ts" name="EasySelectEnhancer">
import Default from './Default'
import type { ISelectorScope } from './interfaces'

const emits = defineEmits(['update:delete', 'update:clear'])

defineProps<{ scope: ISelectorScope; selectedEnhancer: string }>()

function onPress(item: any) {
  emits('update:delete', item)
}
</script>
