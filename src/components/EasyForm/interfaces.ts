interface IConfig {
  [key: string]: any,
  list: any[]
}

export interface IForm {
  configure: IConfig,
  disabled?: boolean
}
