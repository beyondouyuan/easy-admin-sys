import { createI18n } from 'vue-i18n'
import type { TLocale } from '@/types'
import { storageInstance } from '@/shared/storage'

const packages = import.meta.glob('./**/!(index).ts', { eager: true })
const messages = Object.keys(packages).reduce((acc: any, path: any) => {
  const file: any = packages[path]
  const content = file.default || file
  const paths = path.split('/')
  const locale = paths[1]
  const module = paths[2].replace(/\.\w+$/, '')
  if (!acc[locale]) {
    acc[locale] = {}
  }
  acc[locale][module] = content
  return acc
}, {})

const locale: TLocale = storageInstance.get('LOCALE') || 'zh'

const i18n = createI18n({
  legacy: false,
  locale,
  messages,
})

export default i18n
