<template>
  <base-select
    v-bind="$attrs"
    placeholder="请选择菜品类型"
    clearable
    :list="list"
    v-on="$listeners"
  />
</template>

<script>
import ApiObject from '../../../api/module/trade/TradeFoodApi'
export default {
  name: 'FoodTypeSelect',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.initList()
  },
  methods: {
    async initList() {
      this.list = await ApiObject.getOptions()
    }
  }
}
</script>
