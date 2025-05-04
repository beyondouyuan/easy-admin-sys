<template>
  <div style="width: 100%; height: 100%" ref="eChartRef"></div>
</template>
<script setup lang="ts" name="EasyEcharts">
import { shallowRef, onMounted, watch } from 'vue'
import { type EChartsCoreOption, useEcharts } from '@/hooks/use-echarts'

interface IProps {
  options: EChartsCoreOption
}
const props = defineProps<IProps>()
const eChartRef = shallowRef()
const currentOptions = shallowRef(props.options)
const { setOptions, initCharts } = useEcharts(eChartRef, currentOptions.value)

watch(
  () => props.options,
  (nVal) => {
    let targetOptions: EChartsCoreOption = {}
    targetOptions = { ...nVal }
    setOptions(targetOptions)
  }
)

onMounted(() => {
  initCharts()
})
</script>
