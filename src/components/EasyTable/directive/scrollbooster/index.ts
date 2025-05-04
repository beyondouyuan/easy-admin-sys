import type { App } from 'vue'
import scrollBooster from './scrollbooster'
export const directives: any = {
  scrollBooster,
}
export const setupDirectives = (app: App) => {
  Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key])
  })
}
