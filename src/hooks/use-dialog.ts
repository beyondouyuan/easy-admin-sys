/**
 * 状态式组件: 适用业务模块弹窗
 */
import { ref } from 'vue'

export default function useDialog() {
  const visible = ref(false)
  const loading = ref(false)
  const open = () => (visible.value = true)
  const close = () => (visible.value = false)
  const openLoading = () => (loading.value = true)
  const closeLoading = () => (loading.value = false)
  return {
    visible,
    loading,
    open,
    close,
    openLoading,
    closeLoading
  }
}
