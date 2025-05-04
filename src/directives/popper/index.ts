/**
 * ensure el-select poppper with enhancer
 */
import type { Directive, DirectiveBinding } from 'vue'

interface IPopper {
  enhanced: boolean,
  ref?: any
}

function getParent (el: HTMLElement | null, classname: string): HTMLElement | null {
  if (!el) {
    return null
  }
  let parent = el.parentElement
  while (parent && !parent.classList.contains(classname)) {
    parent = parent.parentElement
  }
  return parent
}

function create(el: any, binding: DirectiveBinding) {
  const options: IPopper = binding.value ?? {}
  if (!options.enhanced) {
    return
  }
  requestIdleCallback(
    () => {
      const reference = el.querySelector('.el-select__input')
      const style = getComputedStyle(el)
      // FIXME: tree需要通过popperId查询，设置样式时需要对dropdown也做特殊处理
      const popperId = reference.getAttribute('aria-controls')
      const popperIdParent = getParent(document.querySelector(`#${popperId}`), 'el-popper')
      const popper: any = options?.ref?.popperRef || popperIdParent
      if (!popper) {
        return
      }
      popper.style.width = (parseInt(style.width) || 300) * 2 + 'px'
      el.__instance__popper__ = popper
      if (popperIdParent) {
        const dropdown = getParent(document.querySelector(`#${popperId}`), 'el-select-dropdown')
        if (dropdown) {
          dropdown.style.width = style.width
        }
      }
    },
    { timeout: 60 }
  )
}

function destroy(el: any): void {
  if (!el.__instance__popper__) {
    return
  }
  el.__instance__popper__ = null
}

const popper: Directive = {
  updated(el, binding) {
    create(el, binding)
  },

  unmounted(el) {
    destroy(el)
  }
}

export default popper
