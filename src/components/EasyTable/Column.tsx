import type { PropType } from 'vue'
import type { ITable } from '@/interfaces/table'
import { useColumnProps } from './hooks/use-columns'

const types = ['selection', 'index', 'expand']

const tooltipProps = {
  placement: 'top',
  effect: 'dark',
}

function renderHeader(scope: ITable.IScope, column: ITable.IColumnProps) {
  if (column.headerRender) {
    return column.headerRender(scope, column)
  }
  if (column.tips) {
    return renderToolTips(column)
  }
  return renderLabel(column)
}

function renderLabel(column: ITable.IColumnProps) {
  return <span class="easy-table__header-inner">{column.label}</span>
}

function renderDefault(scope: ITable.IScope, column: ITable.IColumnProps) {
  const { render } = column
  if (render) {
    return render(scope, column)
  }
  return <div>{scope.row[column.prop]}</div>
}

function renderToolTips(column: ITable.IColumnProps) {
  return (
    <easy-tooltip {...tooltipProps}>
      {{
        default: () => renderLabel(column),
        content: () => <div v-html={column.tips}></div>,
      }}
    </easy-tooltip>
  )
}

function renderColumn(column: ITable.IColumnProps, sourceData: any[]) {
  if (column?.children && column?.children?.length > 0) {
    return (
      <el-table-column>
        {{
          header: (scope: ITable.IScope) => renderHeader(scope, column),
          default: () =>
            column.children
              ? column.children.map((child) => renderColumn(child, sourceData))
              : null,
        }}
      </el-table-column>
    )
  }
  return renderTableColumns(column, sourceData)
}

function renderTableColumns(column: ITable.IColumnProps, sourceData: any[]) {
  const ensureColumn = useColumnProps(column, sourceData)
  if (column.type && types.includes(column.type)) {
    return <el-table-column {...ensureColumn} />
  }
  return (
    <el-table-column {...ensureColumn}>
      {{
        header: (scope: ITable.IScope) => renderHeader(scope, column),
        default: (scope: ITable.IScope) => {
          return renderDefault(scope, column)
        },
      }}
    </el-table-column>
  )
}

export default {
  name: 'Column',
  props: {
    column: {
      type: Object as PropType<ITable.IColumnProps>,
      default: () => {},
    },
    sourceData: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  },

  setup(props: any) {
    return () => renderColumn(props.column, props?.sourceData ?? [])
  },
}
