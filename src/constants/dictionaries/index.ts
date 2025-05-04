import i18n from '@/locales'
import { quickArray, quickI18nDictionary } from '@/shared/array'

const weeks = quickArray(7, 1)
// 西区
const utc1 = quickArray(-1, -12)
// 东区
const utc2 = quickArray(12, 1)
// 所有时区
const timezone = [...utc1, 0, ...utc2]

export const TOOLBAR_DIC = [
  {
    label: i18n.global.t('global.clear'),
    value: 'clear',
    type: 'danger',
  },
  {
    label: i18n.global.t('global.search'),
    value: 'search',
    type: 'primary',
  },
]

export const CLUDE_DIC = [
  {
    value: 0,
    label: i18n.global.t('global.include'),
  },
  {
    value: 1,
    label: i18n.global.t('global.exclude'),
  },
]

export const TIMEZONE_DIC = quickI18nDictionary(timezone, 'global.utc')

export const WEEK_DIC = quickI18nDictionary(weeks, 'global.week.local')

export const CURRENCY_DIC = [
  {
    value: 'USD',
    label: i18n.global.t('dic.currency.usd'),
  },
  {
    value: 'CNY',
    label: i18n.global.t('dic.currency.cny'),
  },
]
