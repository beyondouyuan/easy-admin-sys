import { type Ref, shallowRef, onMounted, onDeactivated, onBeforeUnmount } from 'vue'
import echarts from '@/shared/echarts'
import { CHARTS_COLOR } from '@/constants/global'
import { merge } from '@/shared/merge'

export type EChartsCoreOption = echarts.EChartsCoreOption

const useEcharts = (elRef: Ref<HTMLDivElement>, options: EChartsCoreOption) => {
  const charts = shallowRef<echarts.ECharts>()

  const initCharts = () => {
    charts.value = echarts.init(elRef.value)
    setOptions(options)
  }
  const setOptions = (options: EChartsCoreOption) => {
    const baseOptions = {
      color: CHARTS_COLOR
    }
    const configure = merge(baseOptions, options)
    charts.value && charts.value.setOption(configure)
  }
  const echartsResize = () => {
    charts.value && charts.value.resize()
  }
  const resizeObserver = new ResizeObserver(entries => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const entry of entries) {
      // const { width, height } = entry.contentRect
      echartsResize()
    }
  })
  onMounted(() => {
    window.addEventListener('resize', echartsResize)
    resizeObserver.observe(elRef.value)
  })
  // 防止 echarts 页面 keepAlive 时，还在继续监听页面
  onDeactivated(() => {
    window.removeEventListener('resize', echartsResize)
    resizeObserver.disconnect()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', echartsResize)
    resizeObserver.disconnect()
  })
  return {
    initCharts,
    setOptions,
    echartsResize
  }
}
export { useEcharts }
