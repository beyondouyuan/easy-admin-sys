export namespace IReport {
  export interface IHeader {
    [key: string]: any
    label?: string
    name?: string
  }
  export interface IRow {
    [key: string]: any
  }
  export interface IResult {
    header: IHeader[]
    list: IRow[]
  }
}
