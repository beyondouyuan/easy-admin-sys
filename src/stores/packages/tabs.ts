import { defineStore } from 'pinia'
import piniaPersistConfigure from '@/stores/helper/persist'
import type { ITabsMenuProps, ITabsState } from '@/stores/interface/global'
import router from '@/router'

export const useTabsStore = defineStore('easy-tabs', {
  state: (): ITabsState => ({
    tabs: [],
  }),
  getters: {},
  actions: {
    add(tab: ITabsMenuProps) {
      if (this.tabs.every((item) => item.path !== tab.path)) {
        this.tabs.push(tab)
      }
    },
    remove(path: string, current: boolean) {
      if (current) {
        this.tabs.forEach((item, index) => {
          if (item.path !== path) return
          const next = this.tabs[index + 1] ?? this.tabs[index - 1]
          if (!next) return
          router.push(next.path)
        })
      }

      this.tabs = this.tabs.filter((item) => item.path !== path)
    },
  },
  persist: piniaPersistConfigure('easy-tabs'),
})
