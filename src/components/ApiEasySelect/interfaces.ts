import type { IMeta } from '@/interfaces/meta'
import type { TMethod, TSelector } from '@/types'

interface IParams {
  [key: string]: any
}

type TContent = string | Function

type TLayout = 'prefix' | 'suffix' | 'prepend' | 'append'

export interface ISelector {
  api?: Function | string
  options?: IMeta.IAttrs[]
  selector?: TSelector
  render?: Function | IRender[]
  headers?: string[]
  prefix?: any
  enhancer?: boolean
  params?: Function | IParams
  method?: TMethod
  immediate?: boolean
  default?: boolean
}

export interface IRender {
  field: string
  layout?: TLayout
  content?: TContent
  children?: IRender[]
}

export interface IScope {
  item: IMeta.IAttrs
  render: Function | IRender[]
}

export interface ISelectorScope {
  render?: Function | IRender[]
  options: IMeta.IAttrs[]
}
