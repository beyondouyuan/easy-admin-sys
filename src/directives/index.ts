import type { App } from 'vue'
// glob自动加载
import copy from './copy'
import drag from './drag'
import lazy from './lazy'
import permission from './permission'
import popper from './popper'
import track from './track'

export const directives: any = {
  copy,
  drag,
  lazy,
  permission,
  popper,
  track
}

export const setupDirectives = (app: App) => {
  Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key])
  })
}

export default {
  install(app: App) {
    setupDirectives(app)
  }
}