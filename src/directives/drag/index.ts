import type { Directive, DirectiveBinding } from 'vue'
import Sortable from 'sortablejs'

interface IDrag {
  [key: string]: any
}

interface IElement extends HTMLElement {
  __instance__: any
}

const noop = () => {}

const defaultOptions = {
  group: {
    name: 'shared',
    put: true,
    pull: true
  },
  filter: '.filtered', // 'filtered' class is not draggable
  animation: 150,
  onEnd: noop,
  onAdd: noop
}

function create(el: IElement, binding: DirectiveBinding) {
  const options: IDrag = binding.value ?? {}
  destroy(el)
  requestIdleCallback(
    () => {
      const setting = Object.assign({}, defaultOptions, options)
      let sortableEl = el
      // 指定容器？否则容器为el
      if (options?.parent) {
        if (typeof options.parent === 'string') {
          sortableEl = document.querySelector(options.parent) as IElement
        }
      }
      if (!sortableEl) {
        return
      }
      el.__instance__ = Sortable.create(sortableEl, setting)
    },
    { timeout: 60 }
  )
}

function destroy(el: any): void {
  if (!el.__instance__) {
    return
  }
  el.__instance__ = null
}

const drag: Directive = {
  mounted(el, binding) {
    create(el, binding)
  },

  updated(el, binding) {
    create(el, binding)
  },

  unmounted(el) {
    destroy(el)
  }
}

export default drag
