import type { Directive, DirectiveBinding } from 'vue'
import ScrollBooster from 'scrollbooster'

interface IElProps extends HTMLElement {
  __instance__: any
  __resize__observer__: any
}

const defaultOptions = {
  scrollMode: 'native',
  direction: 'horizontal',
  textSelection: true,
  shouldScroll: (state: any, event: any) => {
    return !event.target.closest('.icon-drag')
  }
}

function create(el: IElProps, bidding: DirectiveBinding) {
  destroy(el)
  requestIdleCallback(
    () => {
      const { value } = bidding
      let viewportEl = value.viewport
      let scrollEl = value.content
      // 参数不传入则当作“禁用”
      if (!(viewportEl || scrollEl)) {
        return
      }
      if (typeof value.viewport === 'string') {
        viewportEl = el.querySelector(value.viewport)
      }
      if (typeof value.content === 'string') {
        scrollEl = el.querySelector(value.content)
      }

      // 查询不到则则不处理
      if (!(viewportEl || scrollEl)) {
        return
      }
      if (scrollEl.scrollWidth > viewportEl.clientWidth) {
        const instance = new ScrollBooster({
          ...defaultOptions,
          ...value,
          viewport: viewportEl,
          content: scrollEl
        })
        viewportEl.style.cursor = 'move'
        el.__instance__ = instance
      } else {
        viewportEl.style.cursor = ''
      }
    },
    { timeout: 300 }
  )
}

function destroy(el: IElProps): void {
  if (!el.__instance__) {
    return
  }
  el.__instance__.destroy && el.__instance__.destroy()
  el.__instance__ = null
}

const scrollBooster: Directive = {
  mounted(el, bidding) {
    create(el, bidding)
    const resizeObserver = new ResizeObserver(() => {
      create(el, bidding)
    })
    el.__resize__observer__ = resizeObserver
    resizeObserver.observe(el)
  },

  unmounted(el) {
    destroy(el)
    el.__resize__observer__ && el.__resize__observer__.disconnect(el)
  }
}

export default scrollBooster
