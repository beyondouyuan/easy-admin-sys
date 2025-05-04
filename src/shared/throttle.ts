export function throttle(func: Function, wait: number = 200) {
  let lastTime = 0
  return function (...args: any[]) {
    const now = Date.now()
    if (now - lastTime >= wait) {
      func(...args)
      lastTime = now
    }
  }
}

export function debounce(func: Function, wait: number = 200) {
  let timeout: any = null
  return function (...args: any[]) {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}
