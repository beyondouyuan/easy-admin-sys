import i18n from '@/locales'

// 过去n天: 从昨天(-1)开始，总计n天 [end, start]
export const QUICK_TIME_OPTS = new Map([
  [0, [[0, 0], i18n.global.t('global.today')]],
  [1, [[-1, -1], i18n.global.t('global.yesterday')]],
  [7, [[-7, -1], i18n.global.t('global.lastDay', { n: 7 })]],
  [14, [[-14, -1], i18n.global.t('global.lastDay', { n: 14 })]],
  [30, [[-30, -1], i18n.global.t('global.lastDay', { n: 30 })]],
])

// 选择器placeholder
export const SELECTOR_PLACEHOLDER = i18n.global.t('global.selector')
// 输入框placeholder
export const ENTER_PLACEHOLDER = i18n.global.t('global.enter')

// 通用开关值
export const SWITCH_VALUE = {
  activeValue: 2,
  inActiveValue: 1,
}

// 半透明的radio-button
export const TRANSPARENT_RADIO_BUTTON = {
  fill: 'var(--easy-color-primary-light)',
  textColor: 'var(--easy-color-primary)',
}

export const CHARTS_COLOR = [
  '#2665F5',
  '#FAC72F',
  '#FF7E07',
  '#15B9FF',
  '#1DD27B',
  '#9969FF',
  '#FF66C1',
  '#34D2CA',
  '#EB6658',
  '#FFAA1F',
  '#C296EE',
  '#FCC49E',
  '#FFDD7C',
  '#F2A1E8',
  '#5EDACB',
  '#FF937F',
  '#C5E67C',
]

export const OPERATE_ADD = 'add'
export const OPERATE_EDIT = 'edit'
export const OPERATE_COPY = 'copy'
export const OPERATE_DELETE = 'delete'
