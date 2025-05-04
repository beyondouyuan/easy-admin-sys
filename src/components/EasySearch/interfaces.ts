export interface IEmits {
  (e: 'update:visible', value: boolean, target: any): void
  (e: 'update:change', value: boolean, target: any): void
  (e: 'update:record', value: any): void
}

export interface IForm {
  [key: string]: any
}

export interface IConfig {
  list: IForm[]
}