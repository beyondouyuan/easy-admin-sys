import i18n from '@/locales'
import router from '@/router'
import { resolveValue2Label } from '@/shared/helper'
import { ElMessage, ElMessageBox } from 'element-plus'

function onEdit(row: any) {
  router.push({
    path: '/signboard/device/detail',
    query: {
      id: row.id,
    },
  })
}

function onDelete(id: number | string) {
  // if success
  ElMessage({
    type: 'success',
    message: '删除成功',
  })
}

function handleDelete(row: any) {
  ElMessageBox.confirm('此操作将会删除数据，确认继续？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      onDelete(row.id)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}

const sexSourceData = [
  {
    label: i18n.global.t('dic.sex.man'),
    value: '1',
  },
  {
    label: i18n.global.t('dic.sex.woman'),
    value: '2',
  },
]

export const columns = [
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
    render: (scope: any, column: any) => {
      return <div>{resolveValue2Label(scope.row[column.prop], sexSourceData)}</div>
    },
  },
  {
    label: i18n.global.t('table.age'),
    prop: 'age',
  },
  {
    label: i18n.global.t('table.action'),
    prop: 'action',
    render: (scope: any) => {
      return (
        <div class="flex-align-center">
          <el-button type="primary" onClick={() => onEdit(scope.row)}>
            编辑
          </el-button>
          <el-button type="danger" onClick={() => handleDelete(scope.row)}>
            删除
          </el-button>
        </div>
      )
    },
  },
]
