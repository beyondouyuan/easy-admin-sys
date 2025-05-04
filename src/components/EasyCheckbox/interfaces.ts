interface ICheckbox {
  value: string | number
  label: string
}

type TType = 'checkbox' | 'button'

export interface ICheckboxOptions {
  options: ICheckbox[],
  type?: TType
}