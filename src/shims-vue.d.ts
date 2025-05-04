import { ComponentCustomProperties } from 'vue'
import { I18n } from 'vue-i18n'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: I18n['t'] // 模板中的 $t 方法
    $i18n: I18n // i18n 实例
  }
}
