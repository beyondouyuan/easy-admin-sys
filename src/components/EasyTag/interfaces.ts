export type IValue = string | number

export interface IOptions {
  value: IValue
  label: string
}

export interface ITag {
  options: IOptions[],
  multiple?: boolean,
  selectable?: boolean
}

export interface IEmits {
  (e: 'update:modelValue', value: IValue | IValue[]): void
}