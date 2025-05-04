import type { Directive, DirectiveBinding } from 'vue'
import Clipboard from 'clipboard'
import { ElMessage } from 'element-plus'

interface IElement extends HTMLElement {
  __clipboard__: any
  __clipboard_success__: any
  __clipboard_error__: any
}

const clipboard: Directive = {
  mounted(el: IElement, binding: DirectiveBinding) {
    if (binding.arg === 'success') {
      el.__clipboard_success__ = binding.value
    } else if (binding.arg === 'error') {
      el.__clipboard_error__ = binding.value
    } else {
      const clipboard = new Clipboard(el, {
        text() { return binding.value },
        // action() { return binding.arg === 'cut' ? 'cut' : 'copy' }
        action() { return 'copy' }
      })
      clipboard.on('success', e => {
        const callback = el.__clipboard_success__
        ElMessage({
          message: `复制成功`,
          type: 'success',
          offset: 100,
          duration: 1500
        })
        callback && callback(e)
      })
      clipboard.on('error', e => {
        const callback = el.__clipboard_error__
        callback && callback(e)
      })
      el.__clipboard__ = clipboard
    }
  },

  updated(el: IElement, binding: DirectiveBinding) {
    if (binding.arg === 'success') {
      el.__clipboard_success__ = binding.value
    } else if (binding.arg === 'error') {
      el.__clipboard_error__ = binding.value
    } else {
      el.__clipboard__.text = function () { return binding.value }
      // el.__clipboard__.action = function () { return binding.arg === 'cut' ? 'cut' : 'copy' }
      el.__clipboard__.action = function () { return 'copy' }
    }
  },

  unmounted(el: IElement, binding: DirectiveBinding) {
    if (binding.arg === 'success') {
      delete el.__clipboard_success__
    } else if (binding.arg === 'error') {
      delete el.__clipboard_error__
    } else {
      el.__clipboard__.destroy()
      delete el.__clipboard__
    }
  }
}

export default clipboard
