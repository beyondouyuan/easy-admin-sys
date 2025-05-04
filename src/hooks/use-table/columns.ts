import i18n from '@/locales'
import { isObject } from '@/shared/type'
import { merge } from '@/shared/merge'
import type { ITable } from '@/interfaces/table'
import { useIncludes, usePropAlign, usePropFixed } from './patterns'

function ensureRender(prop: string, options: ITable.IColumnRender[] = []) {
  if (!options.length) {
    return null
  }
  const target = options.find((opt: any) => opt.props.includes(prop))
  if (target) {
    return target['render'] || null
  }
  return null
}

function ensureProp (prop: string) {
  return prop.replace(/^(--)/g, '')
}

/**
 * 生成列：格式化各个列数据
 * @param {array} columns 表头
 * @param {object} config 列配置项
 * @returns array
 */
export default function useColumns(
  columns: ITable.IColumnProps[] | string[] = [],
  config: ITable.IColumnsConfig = {}
) {
  const targetList = []
  for (const column of columns) {
    // 若column是一个对象，包含label\value(或者label\prop)等属性，此时需要做针对处理
    let target: ITable.IColumnProps = {
      prop: '',
      label: '',
      tips: '',
      type: '',
      children: []
    }
    if (isObject(column)) {
      target = merge(target, column)
    } else {
      const prop = column as string
      const namespace = config?.namespace ?? 'table'
      target['prop'] = prop
      target['label'] = i18n.global.t(`${namespace}.${ensureProp(prop)}`)
    }
    const { prop } = target

    if (config.aligns) {
      target.align = usePropAlign(prop, config.aligns)
    }
    if (config.fixeds) {
      target.fixed = usePropFixed(prop, config.fixeds)
    }

    const target2 = config?.binds?.find((opt: any) => opt.props.includes(prop))
    if (target2 && target2['value']) {
      for (const val of target2['value']) {
        const k = val[0]
        const v = val[1]
        target[k] = v
      }
    }

    if (useIncludes(prop, config.sortables)) {
      target['sortable'] = 'custom'
    }
    if (useIncludes(prop, config.tips)) {
      target['tips'] = i18n.global.t(`tips.${ensureProp(prop)}`)
    }
    const render = ensureRender(prop, config.renders)
    if (render) {
      target.render = render
    }
    if (target.children && target?.children?.length > 0) {
      target.children = useColumns(target.children, config)
    }
    targetList.push(target)
  }

  return targetList
}
