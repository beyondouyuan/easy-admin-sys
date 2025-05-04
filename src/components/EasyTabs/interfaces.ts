interface IOptions {
  [key: string]: any
  label: string
  value: string | number
}

export interface ITabs {
  options: IOptions[]
  value: string
  label: string
}
