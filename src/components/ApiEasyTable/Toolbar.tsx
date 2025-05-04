import { defineComponent, useSlots } from 'vue'

const className = `flex-align-center flex-space-between easy-api-table__toolbar`
function renderToolbar() {
  const slots = useSlots()
  if (slots && slots.default) {
    return <div class={className}>{slots.default()}</div>
  }
  return (
    <div class={className}>
      {/* 左 */}
      <div></div>
      {/* 右 */}
      <div></div>
    </div>
  )
}

export default defineComponent({
  name: 'ToolbarRender',
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },

  setup() {
    return () => renderToolbar()
  }
})
