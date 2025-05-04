<template>
  <el-form-item class="easy-form-item" v-bind="$attrs">
    <template #label="{ label }">
      <span>{{ $t(label) }}</span>
      <span v-if="tips">
        <EasyTooltip>
          <template #default>
            <i class="iconfont icon-help--o icon-size--xs icon-anchor --suffix" />
          </template>
          <template #content>
            <span v-html="$t(tips)"></span>
          </template>
        </EasyTooltip>
      </span>
    </template>
    <template v-for="slot in Object.keys(slots)" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </el-form-item>
</template>
<script setup lang="ts" name="EasyFormItem">
import { type Slots, useAttrs, useSlots } from 'vue'
const attrs: any = useAttrs()
const tips: string = attrs.tips || ''
const slots: Slots = useSlots()
</script>
