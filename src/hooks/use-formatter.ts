import type { TDefNumber } from '@/types'

export function useThousand(v: TDefNumber, decimal: number = 0) {
  const result = useDecimal(v, decimal)
  return ('' + result || '0').replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function useDecimal(v: TDefNumber, decimal: number = 2) {
  if (!v) {
    return (0).toFixed(decimal)
  }
  return (+v).toFixed(decimal)
}

export function usePercent(v: TDefNumber, decimal: number = 2) {
  if (!v) {
    return `${useDecimal(v, decimal)}%`
  }
  return `${useDecimal(v * 100, decimal)}%`
}

export function useCurrency(v: TDefNumber, decimal: number = 2) {
  if (!v) {
    return '-'
  }
  return `$${useDecimal(v, decimal)}`
}
