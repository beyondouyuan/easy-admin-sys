<template>
  <el-table
    ref="EasyTable"
    table-layout="auto"
    v-scroll-booster="scrollBoosterOptions"
    class="w-full easy-table"
    :data="sourceData"
    :cell-class-name="(scope: ITable.IScope) => useCellClassName(scope, columns)"
    :row-class-name="(scope: ITable.IScope) => useRowClassName(scope)"
    v-bind="$attrs"
    @sort-change="onSortChange"
  >
    <slot />
    <Column v-for="column in columns" :key="column.prop" :column="column" :sourceData="sourceData">
      <template v-for="slot in Object.keys(slots)" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </Column>
  </el-table>
</template>
<script setup lang="ts" name="EasyTable">
import { type Slots, useSlots } from 'vue'

import type { ITable } from '@/interfaces/table'

import Column from './Column'
import { useCellClassName, useRowClassName } from './hooks/use-columns'
import vScrollBooster from './directive/scrollbooster/scrollbooster'

withDefaults(
  defineProps<{
    columns: ITable.IColumnProps[]
    sourceData: any[]
    loading?: boolean
    dragable?: boolean
    selection?: boolean
    scrollBoosterOptions?: any
  }>(),
  {
    columns: () => [],
    sourceData: () => [],
    loading: false,
    dragable: false,
    selection: false,
    scrollBoosterOptions: () => ({
      viewport: '.el-table__body-wrapper .el-scrollbar__wrap',
      content: '.el-table__body',
    }),
  },
)

const slots: Slots = useSlots()

function onSortChange(evt: any) {
  const map: any = {
    ascending: 'asc',
    descending: 'desc',
  }
  const order = evt.order ? map[evt.order] : null
  const data = {
    prop: evt.prop,
    order: order,
  }
  return data
}
</script>
