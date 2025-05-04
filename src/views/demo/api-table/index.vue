<template>
  <div class="easy-page easy-page__scrollbar easy-page__demo">
    <el-card>
      <div style="margin-bottom: 20px">
        <el-button @click="onPress">刷新表格</el-button>
      </div>
      <div class="desc">
        1:
        api可以是一个封装好的请求函数，也可以是请求URL，若为请求URL则需要传入请求方式、请求参数即可
        <br />
        2: params可以是一个对象也可以是一个函数方法 ex: ``` ApiEasyTable ref="tableRef"
        api="/api/uer/list" method="get or post" :params="searchPayload" ```
      </div>
      <ApiEasyTable ref="tableRef" :api="getReport" :params="tableParams">
        <template #toolbar>
          <div>
            <el-button type="success">批量操作</el-button>
            <el-button type="primary">导出</el-button>
          </div>
        </template>
      </ApiEasyTable>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { getReport } from '@/api/mock'
import { ref } from 'vue'
import { shallowRef } from 'vue'

const searchPayload = ref({})
const tableRef = shallowRef()
function onPress() {
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
