export function getType(v: any) {
  return Object.prototype.toString.call(v).slice(8, -1)
}

function isType(v: any, type: string) {
  return getType(v) === type
}

export function isNull(v: any) {
  return isType(v, 'Null')
}
export function isUndefined(v: any) {
  return isType(v, 'Undefined')
}

export function isDef(v: any) {
  return !(isNull(v) || isUndefined(v))
}

export function isString(v: any) {
  return isType(v, 'String')
}

export function isNumber(v: any) {
  return isType(v, 'Number')
}

export function isArray(v: any) {
  return isType(v, 'Array')
}

export function isObject(v: any) {
  return isType(v, 'Object')
}

export function isFunction(v: any) {
  return isType(v, 'Function')
}

export function isBoolean(v: any) {
  return isType(v, 'Boolean')
}

export function isRegExp(v: any) {
  return isType(v, 'RegExp')
}

export function isEmptyObject(v: any) {
  for (const key in v) {
    if ({}.hasOwnProperty.call(v, key)) {
      return false
    }
  }
  return true
}

export function isObjectEqual(a: any, b: any) {
  // Of course, we can do it use for in
  // Create arrays of property names
  const aProps = Object.getOwnPropertyNames(a)
  const bProps = Object.getOwnPropertyNames(b)

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length !== bProps.length) {
    return false
  }

  for (let i = 0; i < aProps.length; i += 1) {
    const propName = aProps[i]

    // If values of same property are not equal,
    // objects are not equivalent
    if (a[propName] !== b[propName]) {
      return false
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true
}

export function isArrayEqual(arr1: any[], arr2: any[]) {
  return JSON.stringify(arr1) === JSON.stringify(arr2)
}

export function isNaN(v: any) {
  // eslint-disable-next-line no-self-compare
  return isNumber(v) && v !== v
}

// 是否为JSON字符串
export function isJsonString(v: any) {
  if (typeof v === 'string') {
    try {
      const obj = JSON.parse(v)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }
}

export function isPropInObject (obj: any, prop: string) {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}
