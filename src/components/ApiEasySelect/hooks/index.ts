import { ref, reactive, useAttrs, computed } from 'vue'
import { map, uniqBy } from 'lodash-es'
import i18n from '@/locales'
import server from '@/shared/http'
import { isArray, isString, isFunction } from '@/shared/type'
import { guid } from '@/shared/helper'
import { flattenArray } from '@/shared/array'

import type { IMeta } from '@/interfaces/meta'

import type { ISelector } from '../interfaces'

function isTree (props: any): boolean {
  return props.selector === 'tree'
}

// 确保树value唯一
function makeTree (list: IMeta.IAttrs[]) {
  return list.map((item: IMeta.IAttrs) => {
    if (isArray(item.children)) {
      item.children = makeTree(item.children)
    }
    const __uuid__ = guid()
    return {
      ...item,
      // value: `${item.value}__${__uuid__}`,
      __uuid__,
      __original__: item.value
    }
  })
}

function ensureSourceData (props: any, sourceData: any) {
  if (isTree(props)) {
    return flattenArray(sourceData.value)
  }
  return sourceData.value
}

export default function useSelect(props: ISelector, modelValue: any) {
  const attrs: any = useAttrs()
  // 分页信息
  const page = reactive({
    current: 1, // 当前页码
    total: 1, // 当前总共记录条数
    size: 20 // 可选展示条数
  })

  // 原始数据
  const originalData = ref<IMeta.IAttrs[]>([])
  const loading = ref<boolean>(false)
  const include = ref(0)
  const fetchType = ref<string>('normal') // 加载数据类型 normal | lazy

  // 是否远程获取
  const remote = computed(() => {
    return !!props.api
  })

  // 选择器数据源
  const sourceData = computed(() => {
    if (props.options?.length) {
      return props.options
    }
    return originalData.value
  })

  // 选中的数据记录（完整数据结构）
  const selectRecord = computed(() => {
    if (!modelValue.value) return [] as IMeta.IAttrs[]
    const source = ensureSourceData(props, sourceData)
    if (attrs.multiple) {
      const res = source.filter((item: IMeta.IAttrs) => modelValue.value.includes(item.value))
      return uniqBy(res, 'value')
    }
    const res = source.filter((item: IMeta.IAttrs) => modelValue.value === item.value)
    return uniqBy(res, 'value')
  })

  // 页码总数
  const totalPages = computed(() => {
    return Math.ceil(page.total / page.size)
  })

  const selectedEnhancer = computed(() => {
    return i18n.global.t('global.selectedEnhancer', { num: modelValue?.value?.length, total: page?.total })
  })

  // 下一页
  function nextPage() {
    page.current++
  }

  // 数据总数
  function updateTotal(total: number) {
    page.total = total
  }

  function updateFetchType(type: string) {
    fetchType.value = type
  }

  // 懒加载 => 滚动加载更多
  async function onLazy() {
    if (page.current > totalPages.value) {
      console.log(`Try Loading page: ${page.current}, but total:${totalPages.value}`)
      return
    }
    updateFetchType('lazy')
    nextPage()
    await fetchData()
    updateFetchType('normal')
  }

  // 初始化
  async function initialize() {
    if (originalData.value.length) {
      return
    }
    // 仅在初始化时需要loading，下拉加载时不需要，否则会被清空一次数据从而出现闪烁...
    updateLoading(true)
    await fetchData()
    updateLoading(false)
  }

  // 必须返回一个promise，用以实现联动队列请求
  async function dispatch() {
    if (!sourceData?.value?.length && !props.default) {
      return
    }
    // 已获取过数据才有刷新的必要
    await fetchData()
    onSelection()
  }

  async function fetchData() {
    if (!props.api) {
      return
    }
    const params = ensureParams()
    const payload = {
      page_no: page.current,
      page_size: page.size,
      // 其他查询参数
      ...params
    }
    if (isString(props.api)) {
      const { data } = await ensureRequest(payload)
      return ensureResponse(data)
    }
    const api = props.api as Function
    const { data } = await api(payload)
    return ensureResponse(data)
  }

  // server方法不同，传参方式不同
  function ensurePayload(payload: any) {
    return props.method === 'get' ? { params: payload } : payload
  }

  // 确保入参
  function ensureParams() {
    const result = isFunction(props.params) ? props.params?.call() : (props.params ?? {})
    return result
  }

  // 请求
  function ensureRequest(payload: any) {
    const method = props.method || 'get'
    return server[method]<IMeta.IResult>(props.api as string, ensurePayload(payload))
  }

  // 响应数据
  function ensureResponse(data: IMeta.IResult) {
    let list: IMeta.IAttrs[] = data.list || data || []
    let total = data.total || 1
    if (isTree(props)) {
      list = makeTree(list)
      total = flattenArray(list).length
    }
    updateTotal(total)
    if (fetchType.value === 'lazy') {
      originalData.value.push(...list)
    } else {
      originalData.value = list
      selectDefault()
    }
  }

  // 确保完整数据结构（el-select-v的#label仅包含label不包含value字段）
  function ensureScope(item: any) {
    // if (!props.render) {
    //   console.log('item =》', item)
    //   return item
    // }
    const source = ensureSourceData(props, sourceData)
    return source.find((data: any) => data.value === item.value)
  }

  // loading
  function updateLoading(v: boolean) {
    loading.value = v
  }

  // 默认选中
  function selectDefault() {
    if (!props.default) {
      return
    }
    const source = ensureSourceData(props, sourceData)
    const values = map(source, 'value')
    const target = values[0]
    if (isArray(modelValue.value)) {
      if (!modelValue.value.length) {
        modelValue.value.push(target)
        return
      }
      if (modelValue.value.includes(target)) {
        return
      }
      modelValue.value = [target]
      return
    }
    modelValue.value = target
  }

  // 选中 => 联动刷新过后需要顾虑掉不存在的选中值
  function onSelection() {
    const source = ensureSourceData(props, sourceData)
    const values = map(source, 'value')
    // 多选
    if (isArray(modelValue.value)) {
      // 交集，一次性处理完成
      const intersect = [
        ...new Set([...modelValue.value].filter((item) => new Set([...values]).has(item)))
      ]
      modelValue.value = intersect
      return
    }
    const idx = values.findIndex((value) => value === modelValue.value)
    if (idx < 0) {
      // 置空
      modelValue.value = ''
    }
  }

  // 清空
  function onClear() {
    modelValue.value = []
  }

  // 全选
  function selectAll() {
    const source = ensureSourceData(props, sourceData)
    const values = map(source, 'value')
    modelValue.value = values
  }

  // 删除
  function onDelete (item: IMeta.IAttrs) {
    const idx = modelValue.value.findIndex((value: any) => item.value === value)
    if (idx > -1) {
      modelValue.value.splice(idx, 1)
      return
    }
  }

  return {
    loading,
    include,
    remote,
    sourceData,
    selectRecord,
    selectedEnhancer,
    ensureScope,
    onLazy,
    initialize,
    dispatch,
    fetchData,
    onClear,
    selectAll,
    onDelete
  }
}
