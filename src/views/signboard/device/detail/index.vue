<template>
  <div class="easy-page easy-page__scrollbar">
    <el-card>
      <EasyForm :configure="configure" v-model="formData" />
      <footer>
        <el-button type="primary" @click="onConfirm">{{ $t('global.submit') }}</el-button>
      </footer>
    </el-card>
  </div>
</template>
<script setup lang="ts" name="SignboardDevice">
import { ref } from 'vue'
import { onMounted } from 'vue'

const formData = ref({})

const configure = {
  list: [
    {
      prop: 'name',
      formItemProps: {
        label: '名字',
      },
      componentProps: {
        componentName: 'el-input',
        properties: {
          placeholder: '请输入名字',
          class: 'easy-input',
        },
        value: '',
      },
    },
    {
      prop: 'age',
      formItemProps: {
        label: '年龄',
      },
      componentProps: {
        componentName: 'el-input',
        properties: {
          placeholder: '请输入年龄',
          class: 'easy-input',
        },
        value: '',
      },
    },
    {
      prop: 'sex',
      formItemProps: {
        label: '性别',
      },
      componentProps: {
        componentName: 'EasySelect',
        properties: {
          placeholder: '请选择性别',
          options: [
            {
              label: '男',
              value: 1,
            },
            {
              label: '女',
              value: '2',
            },
          ],
        },
        value: '',
      },
    },
  ],
}

const onConfirm = () => {
  console.log('formData', formData.value)
}

onMounted(() => {
  console.log('device detail page mounted')
})
</script>
