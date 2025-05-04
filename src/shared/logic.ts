import { isArray, isObject, isBoolean, isFunction, isDef, isString } from '@/shared/type'
import * as LOGIC from '@/constants/logic'
import { resolveExpression, resolveProperty } from '@/shared/helper'

/**
 * 逻辑处理
 * @param rules 逻辑规则配置
 * @param payload 上下文参数 (form当前表单绑定的v-model + params外部参数)
 * @returns boolean
 */
export function resolveLogic(rules: any, payload: any, dimension?: string): any {
  // 未定义，即无任何逻辑，无逻辑默认为true or 可传入默认值
  if (!isDef(rules)) {
    return true
  }
  // 布尔值，直接返回
  if (isBoolean(rules)) {
    return rules
  }
  // 自定义函数，返回函数结果
  if (isFunction(rules)) {
    return rules(payload)
  }
  // 字符串表达式 ex: 'age > 30'
  if (isString(rules)) {
    return resolveExpression(rules, payload)
  }
  // 数组
  if (isArray(rules)) {
    return rules.every((rule: any) => resolveLogic(rule, payload, dimension))
  }
  if (isObject(rules)) {
    const { logic, rules: nestedRules, field, value } = rules
    const resolveField = (dimension && field?.indexOf('.') < 0) ? `${dimension}.${field}` : field
    const fieldValue = resolveProperty(payload, resolveField)
    switch (logic) {
      // 顶层逻辑: 仅支持与或非三种
      case LOGIC.AND:
        return nestedRules.every((rule: any) => resolveLogic(rule, payload, dimension))
      case LOGIC.OR:
        return nestedRules.some((rule: any) => resolveLogic(rule, payload, dimension))
      case LOGIC.NOT:
        return !resolveLogic(nestedRules[0], payload, dimension)
      // 内层逻辑运算符
      case LOGIC.EQ:
        return isDef(fieldValue) && fieldValue === value
      case LOGIC.NEQ:
        return isDef(fieldValue) && fieldValue !== value
      case LOGIC.LT:
        return isDef(fieldValue) && fieldValue < value
      case LOGIC.LTE:
        return isDef(fieldValue) && fieldValue <= value
      case LOGIC.GT:
        return isDef(fieldValue) && fieldValue > value
      case LOGIC.GTE:
        return isDef(fieldValue) && fieldValue >= value
      case LOGIC.STARTS_WITH:
        return isDef(fieldValue) && fieldValue.startsWith(value)
      case LOGIC.ENDS_WITH:
        return isDef(fieldValue) && fieldValue.endsWith(value)
      case LOGIC.INCLUDE:
        return isDef(fieldValue) && value.includes(fieldValue)
      case LOGIC.EXCLUDE:
        return isDef(fieldValue) && !value.includes(fieldValue)
      // 配置了，但是不生效，统一隐藏
      default:
        return false
    }
  }
}
