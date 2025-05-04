import type { TLocale } from '@/types'

/* GlobalState */
export interface IGlobalState {
  locale: TLocale
  primary: string
  collapse: boolean
  user: any
}

/* UserState */
export interface IUserState {
  token: string
  userInfo: { name: string }
}

/* tabsMenuProps */
export interface ITabsMenuProps {
  icon?: string
  title: string
  path: string
  name: string
  closable?: boolean
  keepAlive?: boolean
}

/* TabsState */
export interface ITabsState {
  tabs: ITabsMenuProps[]
}

export type ObjToKeyValArray<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]
