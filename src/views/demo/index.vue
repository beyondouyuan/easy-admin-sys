<template>
  <div class="easy-page easy-page__scrollbar easy-page__demo">
    <el-card>
      <EasySearch :list="configure" v-model="searchPayload" />
      <EasyTable :columns="columns" :sourceData="sourceData"></EasyTable>
    </el-card>
    <el-card style="margin-top: 20px">
      <ApiEasySearch
        :configure="{
          list: configure,
        }"
        toolbar
        v-model="searchPayload"
        @update:press="onPress"
      />
      <div style="margin-top: 20px">
        <ApiEasyTable ref="tableRef" :api="getReport" :params="tableParams">
          <template #toolbar>
            <!-- class="w-full flex-justify-end" -->
            <div>
              <el-button type="success">批量操作</el-button>
              <el-button type="primary">导出</el-button>
            </div>
          </template>
        </ApiEasyTable>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { getReport } from '@/api/mock'
import { configure } from './search'
import { ref } from 'vue'
import { shallowRef } from 'vue'

const searchPayload = ref({})
const tableRef = shallowRef()

const columns = [
  {
    label: 'id',
    prop: 'id',
  },
  {
    label: 'name',
    prop: 'name',
  },
]
const sourceData = [
  {
    id: 1,
    name: 'test',
  },
  {
    id: 2,
    name: 'test',
  },
  {
    id: 3,
    name: 'test',
  },
]
function onPress(value: string) {
  if (value === 'clear') {
    searchPayload.value = {}
    return
  }
  dispatchTable()
}

function tableParams() {
  return {
    ...searchPayload.value,
  }
}

function dispatchTable() {
  tableRef?.value.dispatch()
}
</script>
