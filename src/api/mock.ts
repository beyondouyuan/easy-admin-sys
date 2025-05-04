import i18n from '@/locales'
interface IRes {
  code: number
  msg: string
  data: any
}
const mockData = [
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

const mockHeaders = [
  {
    label: 'ID',
    prop: 'id',
  },
  {
    label: i18n.global.t('table.name'),
    prop: 'name',
  },
  {
    label: i18n.global.t('table.sex'),
    prop: 'sex',
  },
  {
    label: i18n.global.t('table.age'),
    prop: 'age',
  },
]

const reportRes: IRes = {
  code: 0,
  msg: 'success',
  data: {
    total: 100,
    page: 1,
    size: 10,
    list: mockData,
    header: mockHeaders,
  },
}
export function getReport(params: any = {}) {
  console.log('request params', params)
  return new Promise((resolve) => {
    resolve(reportRes)
  })
}
