import { useUser } from '@/hooks/use-store'

import type { Directive, DirectiveBinding } from 'vue'
interface IElement extends HTMLElement {
  __permission__: any
}

function main (el: IElement, binding: DirectiveBinding) {
  if (!checkPermission(binding)) {
    remove(el)
  }
}

function checkPermission (binding: DirectiveBinding) {
  const { state: { permissions = [] } } = useUser()
  const values = binding.value
  if (!values) {
    throw new Error('permissions must be provided')
  }
  const hasPermission = values.some((v: any) => permissions.includes(v))
  return hasPermission
}

function remove (el: IElement) {
  el?.parentNode?.removeChild(el)
}

const permission: Directive = {
  mounted(el, binding) {
    main(el, binding)
  },
  updated(el, binding) {
    main(el, binding)
  }
}

export default permission
