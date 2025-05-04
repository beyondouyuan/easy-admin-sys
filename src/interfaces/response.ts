export interface IRes {
  code: number
  msg: string
}
export interface IResData<T = any> extends IRes {
  data: T
}
