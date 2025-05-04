<template>
  <div class="easy-api-table">
    <slot name="header"></slot>
    <Toolbar>
      <slot name="toolbar" />
    </Toolbar>
    <EasyTable
      ref="ApiEasyTable"
      v-bind="$attrs"
      v-loading="loading"
      :source-data="sourceData"
      :columns="localColumns"
      :key="key"
    >
      <slot />
    </EasyTable>
    <slot name="footer"></slot>
    <div class="easy-api-table__pagination">
      <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :total="page.total"
        :page-sizes="sizes"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="onCurrentChange"
        @size-change="onSizeChange"
      />
    </div>
  </div>
</template>
<script setup lang="ts" name="ApiEasyTable">
import { onMounted } from 'vue'
import type { ITable } from '@/interfaces/table'
import { API_TABLE_DEFAULT_PROPS } from './configure'
import useTable from './hooks'
import Toolbar from './Toolbar'

const props = withDefaults(defineProps<ITable.IApiTableProps>(), API_TABLE_DEFAULT_PROPS)

const {
  loading,
  sourceData,
  localColumns,
  page,
  key,
  initialize,
  refresh,
  fetchData,
  onSizeChange,
  onCurrentChange,
} = useTable(props)

onMounted(() => {
  initialize()
})

defineExpose({
  dispatch: fetchData,
  freshColumns: refresh,
})
</script>
