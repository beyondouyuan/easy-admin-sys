import { isArray, isDef } from '@/shared/type'
import { merge } from '@/shared/merge'
import { deepClone } from '@/shared/deepClone'
import { resolveLogic } from '@/shared/logic'
import { isFunction, map } from 'lodash-es'

interface ILinkage {
  rules: any
  payload: any
  modelValue: any
  original: any
  prop: string,
  configure: any
}

/**
 * 联动处理
 * @param rules 联动规则
 * @param modelValue 表单项值
 * @param payload 外部参数
 * @param original 原始配置
 * @returns object
 */
export function resolveLinkage({ rules, prop, payload, modelValue, original, configure }: ILinkage) {
  // 未定义，无联动需要处理，走短路提前返回原始配置
  if (!isDef(rules)) {
    return original
  }
  const linkages = isArray(rules) ? rules : [rules]
  const mergePayload = Object.assign({}, modelValue.value, payload)
  const linkage = linkages.find((rule: any) => {
    return resolveLogic(rule, mergePayload, configure.dimension)
  })
  if (!linkage) {
    return original
  }
  if (!linkage?.properties) {
    return original
  }
  const properties = isFunction(linkage.properties) ? linkage.properties(payload, modelValue, original, configure) : linkage.properties
  const options = properties.options || []
  // 若更改的是value，则需联动处理modelValue
  // TODO modelValue只能修改一次，否则会导致死循环
  if (isDef(properties.value) && options.length) {
    const values = map(options, 'value')
    if (configure.dimension) {
      const value = modelValue.value[configure.dimension][prop]
      if (!values.includes(value)) {
        modelValue.value[configure.dimension][prop] = properties.value
      }
    } else {
      const value = modelValue.value[configure.dimension][prop]
      if (!values.includes(value)) {
        modelValue.value[prop] = properties.value
      }
    }
  }
  const clone = deepClone(properties)
  delete clone.value
  return merge(original, clone)
}
