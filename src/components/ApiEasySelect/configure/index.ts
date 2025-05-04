import type { TMethod, TSelector } from '@/types'

export const API_SELECT_DEFAULT_PROPS = {
  options: () => [],
  api: () => '',
  selector: 'selector' as TSelector,
  prefix: '',
  enhancer: false,
  params: () => ({}),
  method: 'get' as TMethod,
  immediate: false,
  default: false
}