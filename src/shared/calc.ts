export function calcTotal(arr: any[], props: string) {
  return arr.reduce((total: number, item: any) => {
    return item[props] ? total + item[props] * 1 : total
  }, 0)
}

export function calcRatio(v: number, total: number) {
  if (!v && !total) return 0
  return Math.floor((v / total) * 10000) / 10000
}
