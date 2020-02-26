<template>
  <el-autocomplete
    v-bind="$attrs"
    placeholder="请输入接待单位"
    :fetch-suggestions="querySearch"
    v-on="$listeners"
  />
</template>

<script>
import TradeReceptionUnitApi from '../../../api/module/trade/TradeReceptionUnitApi'

export default {
  name: 'AllReceptionUnitInput',
  data() {
    return {
      list: []
    }
  },
  created() {
    this.initList()
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.list
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    async initList() {
      const list = await TradeReceptionUnitApi.list()
      this.list = TradeReceptionUnitApi.toOptions(list.data, { label: 'name', value: 'name' })
    }
  }
}
</script>

<style scoped>

</style>
