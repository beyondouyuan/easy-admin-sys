import i18n from '@/locales'
import { isArray, isPropInObject } from './type'
import { isPlainObject } from 'lodash-es'

type TValue = string | number
type TData = {
  label: string
  value: TValue
}
type TType = 'include' | 'exclude'

/**
 * 从数组中获取指定数据 按source顺序返回
 * @param source 源数组
 * @param target 目标数组
 * @param type 求集类型 => 'include' 包含, 'exclude' 排除
 * @returns array
 */
export function pick(source: TData[], target: TValue[], type: TType = 'include') {
  if (type === 'exclude') {
    return differenceArray(source, target, 'value')
  }
  return intersectArray(source, target, 'value')
}

/**
 * 从数组中获取指定数据，交集按target顺序返回
 * @param source 源数组
 * @param target 目标数组
 * @param type 求集类型 => 'include' 包含, 'exclude' 排除
 * @returns array
 */
export function cherry(source: TData[], target: TValue[], type: TType = 'include'): TData[] {
  if (type === 'exclude') {
    return differenceArray(source, target, 'value')
  }
  const result: TData[] = []
  const sourceMap = new Map<TValue, TData>()

  // 构建source的value到item的映射
  for (const item of source) {
    const value = typeof item === 'object' ? item.value : item
    sourceMap.set(value, item)
  }

  // 按照target顺序收集结果
  for (const value of target) {
    if (sourceMap.has(value)) {
      result.push(sourceMap.get(value)!)
    }
  }

  return result
}

export function flattenArray(array: any[], prop: string = 'children'): any[] {
  return array.reduce((acc: any[], item: any) => {
    if (isArray(item[prop])) {
      acc.push(...flattenArray(item[prop], prop))
    } else {
      acc.push(item)
    }
    return acc
  }, [])
}

// 差集
export function differenceArray(array1: any[], array2: any[], prop?: string): any[] {
  return [
    ...new Set(
      [...array1].filter((item) => {
        const value = prop ? item[prop] : item
        return !new Set([...array2]).has(value)
      })
    )
  ]
}

// 交集
export function intersectArray(array1: any[], array2: any[], prop?: string): any[] {
  return [
    ...new Set(
      [...array1].filter((item) => {
        const value = prop ? item[prop] : item
        return new Set([...array2]).has(value)
      })
    )
  ]
}

/**
 * 快速创建从start到end区间数组 [start, end]
 * @param end 区间截止数
 * @param start 区间起始数 => 不传则从0开始
 * @returns array
 */
export const quickArray = (end: number, start: number = 0) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i)

/**
 * 快速创建国际化字典
 * @param arr 数组
 * @param prefix 前缀
 * @returns array => [{ value: 1, label: i18n.global.t('global.week.full.1')}, { value: 2, label: i18n.global.t('global.week.full.2')}]
 */
export const quickI18nDictionary = (arr: number[] | string[], prefix: string) => {
  return arr.map((item) => {
    return {
      label: `${i18n.global.t(`${prefix}.${item}`)}`,
      value: item
    }
  })
}

/**
 * 快速创建基础字典
 * @param arr 数组
 * @param prefix 前缀
 * @returns array => [{ value: 1, label: 'option1'}, { value: 2, label: 'option2'}]
 */
export function quickDictionary(arr: number[] | string[], prefix?: string) {
  return arr.map((item) => {
    const label = prefix ? `${prefix} ${item}` : item
    return {
      label,
      value: item
    }
  })
}

/**
 * 转换数组元素的指定属性或元素本身的类型
 * @param {Array} arr - 要转换的数组
 * @param {'string' | 'number'} type - 目标类型 ('string' 或 'number')
 * @param {string} [prop] - 可选，要转换的属性名（如 'value'）
 * @returns {Array} - 转换后的新数组
 */
export function convertArrayType(arr: any[], type: string, prop?: string) {
  if (!isArray(arr)) {
    return arr
  }
  return arr.map((item) => {
    if (prop && isPlainObject(item) && isPropInObject(item, prop)) {
      return {
        ...item,
        [prop]: type === 'string' ? String(item[prop]) : Number(item[prop])
      }
    }
    // 如果没有 prop，则直接转换数组元素
    return type === 'string' ? String(item) : Number(item)
  })
}
