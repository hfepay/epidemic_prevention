<template>
  <el-autocomplete
    v-bind="$attrs"
    :fetch-suggestions="querySearch"
    v-on="$listeners"
  >
    <template slot-scope="{ item }">
      <slot :scope="item" />
    </template>
  </el-autocomplete>
</template>
<script>
import ListRequestMixins from '../Mixins/list_request_mixins'
export default {
  name: 'BaseAutocomplete',
  components: {},
  mixins: [ListRequestMixins],
  props: {
    queryKey: {
      type: String,
      default: 'value'
    }
  },
  methods: {
    querySearch(queryString, cb) {
      const list = this.finalList
      const results = queryString ? list.filter(this.createFilter(queryString)) : list
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (item) => {
        return (item[this.queryKey].includes(queryString))
      }
    }
  }
}
</script>

<style scoped>
</style>
