import { isArray, isFunction } from '@/shared/type'
import { deepClone } from '@/shared/deepClone'
import type { ITable } from '@/interfaces/table'

const DEFAULT_FONT_SIZE = 16
const DEFAULT_SORT_WIDTH = 24
const DEFAULT_COL_WIDTH = 80
const CELL_CLASS = `easy-table__cell`
const ROW_CLASS = `easy-table__row`

export function useColumnProps(column: ITable.IColumnProps, sourceData: any[] = []) {
  const cloneColumn = deepClone(column)
  const minWidth = useColumnWidth(column, sourceData)
  cloneColumn['min-width'] = minWidth
  delete cloneColumn['children']
  delete cloneColumn['render']
  delete cloneColumn['sourceData']
  return cloneColumn
}

/**
 * 列宽
 * @param {string} column 列
 * @param {array} sourceData 元数据
 * @returns number
 */
export function useColumnWidth(column: ITable.IColumnProps, sourceData: any[] = []) {
  const { width = 0, label, sortable } = column
  if (width) {
    return width
  }
  const headerWidth = useCanvasTextWidth(label)
  const contentWidth = sourceData?.length
    ? useContentMaxWidth(column, sourceData)
    : DEFAULT_COL_WIDTH
  let columnWidth = headerWidth > contentWidth ? headerWidth : contentWidth
  columnWidth += DEFAULT_FONT_SIZE

  if (sortable) {
    columnWidth += DEFAULT_SORT_WIDTH
  }
  return columnWidth > DEFAULT_COL_WIDTH ? columnWidth : DEFAULT_COL_WIDTH
}
type optionsProps = {
  size: number
  family: string
}

const defaultCanvasOptions: optionsProps = {
  size: DEFAULT_FONT_SIZE,
  family: 'Microsoft YaHei',
}

export function useCanvasTextWidth(
  text: string,
  options: optionsProps = defaultCanvasOptions,
): number {
  const { size = DEFAULT_FONT_SIZE, family = 'Microsoft YaHei' } = options
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  ctx.font = `${size}px ${family}`
  const metrics = ctx.measureText(text)
  const actual = Math.abs(metrics.actualBoundingBoxLeft) + Math.abs(metrics.actualBoundingBoxRight)
  return Math.ceil(Math.max(metrics.width, actual))
}

export function useContentMaxWidth(column: ITable.IColumnProps, sourceData: any[] = []) {
  const { prop, render } = column
  const targetList = []
  for (const data of sourceData) {
    let content = data[prop]
    // TODO 待优化
    if (render && isFunction(render)) {
      const result = render({ row: data }, column)
      content = result && isArray(result.children) ? result.children[0] : (result?.children ?? '-')
    }
    const target = useCanvasTextWidth(content)
    targetList.push(target)
  }
  return Math.ceil(Math.max(...targetList))
}

export function useCellClassName(scope: ITable.IScope, columns: ITable.IColumnProps[]) {
  const { column, row, rowIndex, columnIndex } = scope
  if (!columns?.length) {
    return
  }
  const col = columns.find((col: ITable.IColumnProps) => col.prop === column.property)

  if (col?.cellClassName) {
    return isFunction(col.cellClassName)
      ? col.cellClassName(row, rowIndex, column, columnIndex)
      : col.cellClassName
  }

  return CELL_CLASS
}

export function useRowClassName(scope: ITable.IScope) {
  const { column, row, rowIndex, columnIndex } = scope

  if (row?.rowClassName) {
    return isFunction(row.rowClassName)
      ? row.rowClassName(row, rowIndex, column, columnIndex)
      : row.rowClassName
  }

  return ROW_CLASS
}
