<template>
  <div class="easy-page easy-page__scrollbar easy-page__demo">
    <el-card>
      <EasySearch :list="configure" v-model="searchPayload">
        <template #toolbar>
          <div>
            <el-button type="danger" @click="onClear">清空</el-button>
            <el-button type="primary" @click="onPress">搜索</el-button>
          </div>
        </template>
      </EasySearch>
      <EasyTable :columns="columns" :sourceData="sourceData"></EasyTable>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { configure } from './search'
import { ref } from 'vue'
import { getReport } from '@/api/mock'

const searchPayload = ref({})

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
const sourceData = ref([
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
])

const onPress = () => {
  fetchData()
}

const onClear = () => {
  searchPayload.value = {}
}

async function fetchData() {
  const res: any = await getReport({
    ...searchPayload.value,
  })
  sourceData.value = res.data.list
}
</script>
