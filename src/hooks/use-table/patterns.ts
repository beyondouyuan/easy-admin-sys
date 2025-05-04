import type { ITable } from '@/interfaces/table'

export function useIncludes(prop: string, props: string[] = []) {
  return props.includes(prop)
}

// 固定列
export function usePropFixed(prop: string, options: ITable.IColumnFixed = { left: [], right: [] }) {
  return useIncludes(prop, options.right) ? 'right' : !!useIncludes(prop, options.left)
}

// 对齐
export function usePropAlign(
  prop: string,
  options: ITable.IColumnAlign = { center: [], right: [] }
) {
  return useIncludes(prop, options.center)
    ? 'center'
    : useIncludes(prop, options.right)
      ? 'right'
      : 'left'
}
