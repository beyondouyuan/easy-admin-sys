import type { TMethod } from '@/types'

type TObject = {
  [key: string]: any
}

type TAlign = 'left' | 'center' | 'right'
type TFixed = 'left' | 'right' | boolean
type TSortable = 'custom' | boolean

export namespace ITable {
  export interface IColumnProps {
    [key: string]: any
    label: string
    prop: string
    type?: string
    property?: string
    fixed?: TFixed
    align?: TAlign
    sortable?: TSortable
    tips?: string
    width?: number
    'min-width'?: number
    maxWidth?: number
    headerRender?: Function
    render?: Function
    cellClassName?: Function
    sourceData?: any[]
    children?: IColumnProps[]
  }
  export interface IColumnRender {
    props: string[]
    render: Function
  }

  export interface IColumnFixed {
    left?: string[]
    right?: string[]
  }

  export interface IColumnAlign {
    left?: string[]
    right?: string[]
    center?: string[]
  }

  export interface IMapping {
    [key: string]: string
  }

  export interface IColumnsConfig {
    locale?: string
    namespace?: string
    mappings?: IMapping[]
    sortables?: string[]
    tips?: string[]
    renders?: IColumnRender[]
    fixeds?: IColumnFixed
    aligns?: IColumnAlign
    binds?: any
  }

  export interface IApiTableProps {
    api: Function | string
    immediate?: boolean
    columns?: IColumnProps[]
    params: Function | TObject
    method?: TMethod
    columnsConfig?: IColumnsConfig
    toolbarConfig?: TObject
    resolveColumns?: Function
    resolveResponse?: Function
    sizes?: number[]
    size?: number
  }

  export interface IScope {
    row: TObject
    rowIndex: number
    column: IColumnProps
    columnIndex: number
    $index: number
  }
}
