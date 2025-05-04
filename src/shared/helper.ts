// 属性值读取 - 支持无限级
export function resolveProperty(context: any, field: string) {
  if (!field) {
    return null
  }
  return field.split('.').reduce((acc, key) => acc && acc[key], context)
}

// 执行动态表达式
export function resolveExpression(expression: string, context: any): any {
  return new Function(...Object.keys(context), `return ${expression}`)(...Object.values(context))
}

export function resolveValue2Label(v: string | number, source: any[]) {
  const target = source.find((item) => item.value === v)
  return target?.label ?? ''
}

export function guid() {
  const url = URL.createObjectURL(new Blob([]))
  const uid = url.substring(url.lastIndexOf('/') + 1)
  URL.revokeObjectURL(url)
  return uid
}

export function resolveImageError(e: any, uri: any) {
  e.target.src = uri
  e.target.onerror = null
}
