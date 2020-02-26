<template>
  <el-select
    v-bind="$attrs"
    placeholder="请选择会员种类"
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
import { vipType } from '@/constants/module/status.constans'

export default {
  name: 'DeptSelect',
  computed: {
    options() {
      return Object.keys(vipType).map((item) => ({
        value: item,
        label: vipType[item]
      }))
    }
  }
}
</script>
