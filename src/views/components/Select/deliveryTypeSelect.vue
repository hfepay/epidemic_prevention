<template>
  <el-select
    v-bind="$attrs"
    placeholder="全部配送方式"
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
import { deliveryType } from '@/constants/module/status.constans'

export default {
  name: 'DeptSelect',
  computed: {
    options() {
      return Object.keys(deliveryType).map((item) => ({
        value: item,
        label: deliveryType[item]
      }))
    }
  }
}
</script>
