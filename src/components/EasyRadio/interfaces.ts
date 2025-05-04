interface IOptions {
  value: string | number
  label: string
}

type TType = 'radio' | 'button'

export interface IRadio {
  options: IOptions[]
  type?: TType
}