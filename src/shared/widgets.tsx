/**
 * 一些挂件|部件属性配置（不是挂件|部件本身）
 */
import { ENTER_PLACEHOLDER, SWITCH_VALUE } from '@/constants/global'

// 通用（EasyForm|EasySearch)输入框部件
export const renderElInputWidget = {
  componentName: 'el-input',
  properties: {
    placeholder: ENTER_PLACEHOLDER,
    class: 'easy-input',
  },
}

// 通用开关部件
export const renderSwitchWidget = {
  componentName: 'EasySwitch',
  properties: {
    ...SWITCH_VALUE,
  },
}

export function renderReadonlyWidget() {
  return {
    componentName: (scope: any) => {
      return <div>{scope.modelValue || '-'}</div>
    },
  }
}
