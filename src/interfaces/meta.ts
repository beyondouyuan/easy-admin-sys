export namespace IMeta {
  export interface IAttrs {
    [key: string]: any
    label: string
    value: string | number
  }

  export interface IResultWithList {
    list: IAttrs[]
    page_no: number
    total: number
  }

  export type IResultWithoutList = IAttrs[]

  export type IResult = IResultWithList & IResultWithoutList
}
