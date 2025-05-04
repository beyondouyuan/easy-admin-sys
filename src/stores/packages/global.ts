import { defineStore } from 'pinia'
import piniaPersistConfigure from '@/stores/helper/persist'
import { storageInstance } from '@/shared/storage'
import type { IGlobalState } from '@/stores/interface/global'
import type { TLocale } from '@/types'
const KEY = 'LOCALE'

export const useGlobalStore = defineStore('easy-global', {
  state: (): IGlobalState => ({
    locale: storageInstance.get(KEY) || 'zh',
    collapse: true,
    primary: 'primary',
    user: {
      avatar: '',
    },
  }),
  getters: {},
  actions: {
    setLocale(v: TLocale) {
      this.locale = v
      storageInstance.set(KEY, v)
      window.location.reload()
    },
    toggle() {
      this.collapse = !this.collapse
    },
  },
  persist: piniaPersistConfigure('easy-global'),
})
