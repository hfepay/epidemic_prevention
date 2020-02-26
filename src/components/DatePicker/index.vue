<template>
  <el-date-picker
    v-bind="$_OPTIONS"
    :format="$_OPTIONS.format || format"
    :value-format="$_OPTIONS['value-format'] || format"
    v-on="$listeners"
  />
</template>
<script>
import DateMixins from '../Mixins/date_mixins'
export default {
  mixins: [DateMixins],
  computed: {
    format() {
      switch (this.$_OPTIONS.type) {
        case 'year':
          return 'yyyy'
        case 'month':
        case 'monthrange':
          return 'yyyy-MM'
        case 'week':
          return 'yyyy-WW'
        case 'datetime':
        case 'datetimerange':
          return 'yyyy-MM-dd HH:mm:ss'
        // date dates daterange
        default: return 'yyyy-MM-dd'
      }
    }
  }
}
</script>

<style scoped>
</style>
