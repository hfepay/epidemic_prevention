<template>
  <el-select
    v-bind="$attrs"
    placeholder="全部订单状态"
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
import { orderStatus } from '@/constants/module/status.constans'

export default {
  name: 'DeptSelect',
  computed: {
    options() {
      return Object.keys(orderStatus).map((item) => ({
        value: item,
        label: orderStatus[item]
      }))
    }
  }
}
</script>
