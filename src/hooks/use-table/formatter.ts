import type { ITable } from '@/interfaces/table'

import { usePercent, useThousand, useCurrency } from '../use-formatter'

export function useTableThousand(scope: ITable.IScope, column: ITable.IColumnProps) {
  return useThousand(scope.row[column.prop])
}

export function useTablePercent(scope: ITable.IScope, column: ITable.IColumnProps) {
  return usePercent(scope.row[column.prop])
}

export function useTableCurrency(scope: ITable.IScope, column: ITable.IColumnProps) {
  return useCurrency(scope.row[column.prop])
}
