import type { Directive, DirectiveBinding } from 'vue'

interface IElement extends HTMLElement {
  __track__: any
}

function main (el: IElement, binding: DirectiveBinding) {
  const params = ensureParams(el, binding)
  el.addEventListener('click', () => {
    params.payload.type = 'click'
    send(params)
  })
}

function ensureParams (el: IElement, binding: DirectiveBinding) {
  const value = binding.value
  const params = {
    element: `${el.tagName.toLowerCase()}_${el.className}`,
    timestamp: Date.now(),
    payload: {
      ...value
    }
  }
  return params
}

function send (params: any) {
  console.log('send track params', params)
}

const track: Directive = {
  mounted(el, binding) {
    main(el, binding)
  },
  updated(el, binding) {
    main(el, binding)
  }
}

export default track
