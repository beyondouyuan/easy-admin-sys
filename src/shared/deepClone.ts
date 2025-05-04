import { unref } from 'vue'
import { cloneDeep } from 'lodash-es'

export function deepClone<T>(data: T) {
  try {
    return structuredClone(unref(data))
  } catch (error) {
    return cloneDeep(unref(data))
  }
}
