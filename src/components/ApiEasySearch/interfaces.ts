interface IConfig {
  [key: string]: any
  list: any[]
}

export interface IConfigure {
  configure: IConfig
  toolbars?: any[]
  toolbar?: boolean
}

export interface IEmits {
  (e: 'update:search', value: boolean): void
  (e: 'update:press', value: string): void
}
