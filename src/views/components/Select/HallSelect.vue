<template>
  <base-select
    v-bind="$attrs"
    placeholder="请选择服务厅房"
    clearable
    :list="list"
    v-on="$listeners"
  />
</template>

<script>
import ApiObject from '../../../api/module/trade/TradeSysServicePriceApi'
import Mixins from '../initList-mixins'
export default {
  name: 'HallSelect',
  mixins: [Mixins],
  props: {
    sysServiceTypeCodeRequired: Boolean
  },
  data() {
    return {
      ApiObject
    }
  },
  methods: {
    async initList() {
      if (this.sysServiceTypeCodeRequired && !this.params.sysServiceTypeCode) {
        this.list = []
      } else {
        this.list = await this.ApiObject.getHallOptions(this.params)
      }
    }
  }
}
</script>

<style scoped>

</style>
