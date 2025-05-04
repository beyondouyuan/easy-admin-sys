import { deepClone } from '@/shared/deepClone'
import { isDef, isEmptyObject, isObject } from '@/shared/type'

export function merge(source: any, target: any, overwrite: boolean = true) {
  if (!target) return source
  if (isEmptyObject(target)) return source
  const cloneSource = deepClone(source)
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      // 如果 source 已存在该属性且不是 undefined|null，直接跳过，否则需要覆盖
      if (!overwrite && key in source && !isDef(source[key])) {
        continue
      }
      if (isObject(target[key])) {
        cloneSource[key] = merge(cloneSource[key] || {}, target[key], overwrite)
      } else {
        cloneSource[key] = target[key]
      }
    }
  }

  return cloneSource
}
