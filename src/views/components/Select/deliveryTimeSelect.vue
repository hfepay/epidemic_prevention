<template>
  <el-select
    v-bind="$attrs"
    :placeholder="placeholder || '请选择配送时间段'"
    clearable
    v-on="$listeners">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
import { deliveryTimeStatus } from '@/constants/module/status.constans'

export default {
  name: 'DeptSelect',
  props: {
    placeholder: String
  },
  computed: {
    options() {
      return Object.keys(deliveryTimeStatus).map((item) => ({
        value: item,
        label: deliveryTimeStatus[item]
      }))
    }
  }
}
</script>
