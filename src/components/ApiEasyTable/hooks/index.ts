import { reactive, ref } from 'vue'
import { isFunction, isString } from '@/shared/type'
import server from '@/shared/http'
import useColumns from '@/hooks/use-table/columns'
import type { ITable } from '@/interfaces/table'

export default function useTable(props: ITable.IApiTableProps) {
  const loading = ref(false)
  const page = reactive({
    current: 1, // 当前页码
    total: 0, // 当前总共记录条数
    sizes: props.sizes, // 可选展示条数
    size: props.size, // 当前展示条数
  })
  const sourceData = ref([])
  const localColumns = ref<ITable.IColumnProps[]>([])
  const key = ref(Math.random())
  function ensurePayload(payload: any) {
    return props.method === 'get' ? { params: payload } : payload
  }
  function ensureParams() {
    const result = isFunction(props.params) ? props.params.call() : props.params
    return result
  }

  function ensureRequest(payload: any) {
    const method = props.method || 'get'
    return server[method](props.api as string, ensurePayload(payload))
  }

  function ensureResponse(response: any) {
    updateLoading(false)
    if (response.code > 0) {
      console.error(`Server Error: ${response.message ?? response.msg}`)
      loading.value = false
      return
    }
    const { list, header = [], total = 1 } = response.data
    page.total = total
    sourceData.value = props.resolveResponse
      ? props.resolveResponse(response)
      : list || response.data
    if (props?.columns?.length) {
      localColumns.value = props.columns
      return
    }
    if (props.resolveColumns) {
      localColumns.value = props.resolveColumns(response)
    } else {
      localColumns.value = useColumns(header, props.columnsConfig)
    }
  }

  function initialize() {
    if (!props.immediate) return
    fetchData()
  }

  async function fetchData() {
    updateLoading(true)
    const params = ensureParams()
    const payload = {
      page_no: page.current,
      page_size: page.size,
      // 其他查询参数
      ...params,
    }
    if (isString(props.api)) {
      const response = await ensureRequest(payload)
      return ensureResponse(response)
    }
    const fun = props.api as Function
    const response = await fun(payload)
    return ensureResponse(response)
  }

  function updateLoading(v: boolean) {
    loading.value = v
  }

  function onSizeChange(size: number) {
    page.size = size
    page.current = 1
    fetchData()
  }

  function onCurrentChange(current: number) {
    page.current = current
    fetchData()
  }

  function refresh() {
    key.value = Math.random()
  }

  return {
    loading,
    sourceData,
    localColumns,
    page,
    key,
    initialize,
    refresh,
    fetchData,
    onSizeChange,
    onCurrentChange,
  }
}
