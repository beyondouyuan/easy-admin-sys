import type { TStorage } from '@/types'
import { isArray, isDef, isJsonString, isObject } from './type'

const PREFIX: string = (import.meta.env.VITE_PROJECT_NAME || 'local').toUpperCase()

function prefix(k: string): string {
  if (k.indexOf(PREFIX) >= 0) {
    return k
  }
  return `${PREFIX}_${k}`
}

class Storage {
  private storage: any = null
  private retry: number = 0
  constructor(name: TStorage = 'localStorage') {
    this.storage = window[name]
    this.init()
  }

  private init(): void {
    const reg = new RegExp('__expires__')
    const data = this.storage
    const list = Object.keys(data)
    this.retry = 0
    if (list.length > 0) {
      list.map((k) => {
        if (!reg.test(k)) {
          const now = Date.now()
          const expires = data[`${k}__expires__`] || Date.now() + 1
          if (now > expires) {
            this.remove(k)
          }
        }
        return k
      })
    }
  }

  get(k: string) {
    if (!isDef(k)) return
    const value = this.storage.getItem(prefix(k))
    return isJsonString(value) ? JSON.parse(value) : value
  }

  set(k: string, v: any, expired?: any) {
    if (!isDef(v)) return
    const key = prefix(k)
    const value = isArray(v) || isObject(v) ? JSON.stringify(v) : v
    try {
      this.storage.setItem(key, value)
      if (expired) {
        this.storage[`${key}__expires__`] = Date.now() + 1000 * 60 * Number(expired)
      }
    } catch (error: any) {
      const isExceed = ['QuotaExceededError', 'QUOTA_EXCEEDED_ERR'].includes(error.name)
      if (isExceed) {
        const data = this.storage
        for (const item in data) {
          // 内存溢出，浏览器不会清空，需要手动进行清空
          if (Object.prototype.hasOwnProperty.call(data, item)) {
            this.storage.removeItem(item)
          }
        }
        if (this.retry > 0) return
        try {
          this.storage.setItem(key, value)
          if (expired) {
            this.storage[`${key}__expires__`] = Date.now() + 1000 * 60 * Number(expired)
          }
          this.retry++
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  remove(k: string) {
    if (!isDef(k)) return
    const key = prefix(k)
    this.storage.removeItem(key)
    const data = this.storage
    delete data[key]
    delete data[`${key}__expires__`]
  }

  clear() {
    this.storage.clear()
  }
}

const sessionInstance = new Storage('sessionStorage')

const storageInstance = new Storage('localStorage')

export { storageInstance, sessionInstance }

export default Storage
