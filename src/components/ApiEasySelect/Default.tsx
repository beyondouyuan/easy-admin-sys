import type { PropType } from 'vue'
import { isArray, isFunction, isDef } from '@/shared/type'
import type { IMeta } from '@/interfaces/meta'
import type { IRender, IScope } from './interfaces'

function ensureRenderList(list: IRender[]): IRender[] {
  const targetList: IRender[] = [
    {
      field: '__label__group__',
      children: [
        {
          field: 'label',
        },
      ],
    },
  ]
  for (const render of list) {
    const { field, content, layout } = render
    if (layout === 'prefix') {
      const target = targetList.find((x) => x.field === '__label__group__')
      const idx = target?.children?.findIndex((x) => x.field === 'label') as number
      target?.children?.splice(idx, 0, render)
    }
    if (layout === 'suffix') {
      const target = targetList.find((x) => x.field === '__label__group__')
      target?.children?.push({ field, content })
    }
    if (layout === 'prepend') {
      /**
       * FIXME::  prepend1 prepend2 prepend3 => [prepend1, prepend2, prepend3, label]
       * 1: 找到当前label位置
       * 2: 在其当前位置的前面插入
       * 3: 如此可以保证多个prepend时，会按照prepend顺序依次插入到label前面
       */
      const idx = targetList?.findIndex((x) => x.field === '__label__group__') as number
      targetList.splice(idx, 0, render)
    }
    if (layout === 'append') {
      targetList.push({ field, content })
    }
  }

  return targetList
}

function renderItem(item: IRender, data: IMeta.IAttrs) {
  const { field, content } = item
  if (!data) {
    return null
  }
  if (!isDef(data[field])) {
    return null
  }
  if (content && isFunction(content)) {
    const fn = content as Function
    return fn(data, field)
  }
  return <div class="txt-ellipsis">{data[field] ?? ''}</div>
}

function renderContent(data: IMeta.IAttrs, render: Function | IRender[]) {
  if (isFunction(render)) {
    return (render as Function)(data)
  }
  if (isArray(render)) {
    const renderList = ensureRenderList(render as IRender[])
    return (
      <div class="w-hidden flex-align-center">
        {renderList.map((item: IRender) => {
          const { children = [] } = item
          return children?.length ? (
            <div class="w-hidden flex-1 flex-align-center">
              {renderItem(item, data)}
              {(children as IRender[]).map((child: IRender) => {
                return renderItem(child, data)
              })}
            </div>
          ) : (
            renderItem(item, data)
          )
        })}
      </div>
    )
  }
  return <div class="txt-ellipsis">{data?.label ?? ''}</div>
}

export default {
  props: {
    scope: {
      type: Object as PropType<IScope>,
      default: () => ({
        item: {},
        render: [],
      }),
    },
  },

  setup(props: any) {
    // TODO 注意解构时是否失去响应式
    return () => renderContent(props.scope.item, props.scope.render)
  },
}
