import Sortable from 'sortablejs'

const noop = () => {}

interface IOptions {
  onEnd?: Function
  onAdd?: Function
  [key: string]: any
}

const DEFAULT_OPTIONS: IOptions = {
  handle: '.cell_date_time',
  filter: '.filtered',
  animation: 150,
  onEnd: noop,
  onAdd: noop,
}

interface ICache {
  [key: string]: any
}

export function useDragSort(el: string, option: IOptions = {}) {
  const cache: ICache = {}
  if (cache[el]) {
    return cache[el]
  }
  const setting = Object.assign({}, DEFAULT_OPTIONS, option)
  cache[el] = Sortable.create(el, setting)
}
