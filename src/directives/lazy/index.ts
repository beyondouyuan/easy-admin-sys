/**
 * el-select-v2 & el-select-tree lazyload
 */
import { debounce } from '@/shared/throttle'
import { isArray } from '@/shared/type'
import type { Directive, DirectiveBinding } from 'vue'

function create(el: any, binding: DirectiveBinding) {
  const args: any = binding.value
  let callback: any = null
  let ref: any = null
  if (isArray(args)) {
    callback = args[0]
    ref = args[1]
  } else {
    callback = args
  }

  if (!callback) {
    return
  }

  if (el.__instance__scrollbar__) {
    return
  }

  function onScroll(event: any) {
    const { scrollTop, scrollHeight, clientHeight } = event.target
    const atBottom = scrollTop + clientHeight + 64 >= scrollHeight
    if (atBottom) {
      callback(atBottom)
    }
  }

  const debouncedScroll = debounce(onScroll)
  const reference = el.querySelector('.el-select__input')
  const popperId = reference.getAttribute('aria-controls')
  const popper: any = ref?.popperRef || document.querySelector(`#${popperId}`)
  if (!popper) {
    return
  }
  const scrollbar = popper.querySelector('.el-select-dropdown__list')
  if (!scrollbar) {
    return
  }
  scrollbar.addEventListener('scroll', debouncedScroll)
  el.__instance__lazy__ = debouncedScroll
  el.__instance__scrollbar__ = scrollbar
}

function destroy(el: any): void {
  if (!el.__instance__scrollbar__) {
    return
  }
  el.__instance__scrollbar__.removeEventListener('scroll', el.__instance__lazy__)
  el.__instance__lazy__ = null
  el.__instance__scrollbar__ = null
}

const lazy: Directive = {
  updated(el, binding) {
    create(el, binding)
  },

  unmounted(el) {
    destroy(el)
  }
}

export default lazy
