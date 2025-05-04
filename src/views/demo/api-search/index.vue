<template>
  <div class="easy-page easy-page__scrollbar easy-page__demo">
    <el-card>
      <ApiEasySearch
        :configure="{
          list: configure,
        }"
        v-model="searchPayload"
        @update:search="onUpdate"
      />
      <div style="margin-top: 20px">
        <ApiEasyTable ref="tableRef" :api="getReport" :params="tableParams">
          <template #toolbar>
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

function onUpdate() {
  // 自动刷新 => 可以增加一个节流用以优化
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
