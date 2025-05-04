import { isFunction } from '@/shared/type'
import { resolveLogic } from '@/shared/logic'
import { resolveLinkage } from '@/shared/linkage'
const dimensions = ['remote_unit', 'auth_content', 'app_auth_content']

export function useFormFields(source: any[]) {
  const target: any = {}
  // 初始化所有已知维度
  dimensions.forEach((dim) => {
    target[dim] = {}
  })
  for (const item of source) {
    const { prop, componentProps = {}, value, dimension } = item
    // 也支持将value配置在配置项中而非componentProps中，但不推荐，定义在componentProps更适合联动处理
    const fieldValue = componentProps?.value ?? value ?? null
    if (dimension) {
      // 确保维度对象存在
      if (!target[dimension]) {
        target[dimension] = {}
      }
      // 设置维度字段值
      target[dimension][prop] = fieldValue
    } else {
      target[prop] = fieldValue
    }
  }
  // 处理空维度对象
  dimensions.forEach((dim) => {
    if (Object.keys(target[dim]).length === 0) {
      delete target[dim]
    }
  })
  return target
}

/**
 * 表单项可见性处理
 * @param item 表单项
 * @param modelValue 表单项值
 * @param payload 外部参数
 * @returns boolean
 */
export function useFormItemVisible(item: any, modelValue: any, payload: any) {
  const mergePayload = Object.assign({}, modelValue.value, payload)
  return resolveLogic(item.visible, mergePayload, item.dimension)
}

/**
 * 表单项属性联动处理
 * @param item 当前表单项
 * @param modelValue 表单项值
 * @param params 外部参数
 * @returns object
 */
export function useFormItemProps(item: any, modelValue: any, payload: any) {
  // 闭包
  if (isFunction(item.formItemProps)) {
    return item.formItemProps(modelValue, payload)
  }
  return resolveLinkage({
    rules: item.linkageFormItem,
    prop: item.prop,
    modelValue,
    payload,
    original: item?.formItemProps ?? {},
    configure: item
  })
}

/**
 * 表单项内容联动处理
 * @param item 当前表单项
 * @param modelValue 表单项值
 * @param payload 外部参数
 * @returns object
 */
export function useComponentProps(item: any, modelValue: any, payload: any) {
  // 闭包
  if (isFunction(item.componentProps?.properties)) {
    const staticProps = item.componentProps?.staticProps ?? {}
    const properties = item.componentProps.properties(modelValue, payload)
    return {
      ...staticProps,
      ...properties
    }
  }
  return resolveLinkage({
    rules: item.linkageProps,
    prop: item.prop,
    modelValue,
    payload,
    original: item.componentProps?.properties ?? {},
    configure: item
  })
}

export function useUniqueFields (list: any) {
  return list.filter((item: any) => {
    return item.unique
  })
}