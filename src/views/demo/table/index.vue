<template>
  <div class="easy-page easy-page__scrollbar easy-page__demo">
    <el-card>
      <EasyTable :columns="columns" :sourceData="sourceData"></EasyTable>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { columns } from './configure'

const sourceData = [
  {
    id: 1,
    name: '张三',
    sex: '1',
    age: 11,
  },
  {
    id: 2,
    name: '李四',
    sex: '2',
    age: 22,
  },
  {
    id: 3,
    name: '王五',
    sex: '2',
    age: 33,
  },
]
</script>
