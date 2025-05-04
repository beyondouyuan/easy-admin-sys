import { quickDictionary } from '@/shared/array'

export const configure = [
  {
    componentName: 'el-input',
    field: 'id',
    properties: {
      placeholder: '请输入id',
    },
    slots: [
      {
        name: 'prefix',
        default: () => <span>ID</span>,
      },
    ],
  },
  {
    componentName: 'el-input',
    field: 'age',
    properties: {
      placeholder: '请输入年龄',
    },
    slots: [
      {
        name: 'prefix',
        default: () => <span>年龄</span>,
      },
    ],
  },
  {
    componentName: 'el-input',
    field: 'sex',
    properties: {
      placeholder: '请输入性别',
    },
    slots: [
      {
        name: 'prefix',
        default: () => <span>性别</span>,
      },
    ],
  },
  {
    componentName: 'EasySelect',
    field: 'name',
    properties: {
      placeholder: '请输选择名称',
      options: quickDictionary([1, 2, 3, 4]),
    },
    slots: [
      {
        name: 'prefix',
        default: () => <span>Name</span>,
      },
    ],
  },
  {
    componentName: 'EasySelect',
    field: 'cat',
    properties: {
      placeholder: '请输选择分类',
      options: quickDictionary([1, 2, 3, 4]),
    },
    slots: [
      {
        name: 'prefix',
        default: () => <span>分类</span>,
      },
    ],
  },
]
