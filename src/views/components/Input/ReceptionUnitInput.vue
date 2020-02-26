<template>
  <el-autocomplete
    v-bind="$attrs"
    :fetch-suggestions="querySearch"
    v-on="$listeners"
  />
</template>

<script>
import TradeReceptionUnitApi from '../../../api/module/trade/TradeReceptionUnitApi'

export default {
  name: 'ReceptionUnitInput',
  props: {
    customerTypeCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      list: []
    }
  },
  watch: {
    customerTypeCode: {
      immediate: true,
      handler: async function(newVal) {
        await this.initList()
        this.$emit('listChanged', this.list)
      }
    }
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
      if (this.customerTypeCode) {
        const list = await TradeReceptionUnitApi.getOptions({ sysCustomerTypeCode: this.customerTypeCode })
        this.list = list
      } else {
        this.list = []
      }
    }
  }
}
</script>

<style scoped>

</style>
