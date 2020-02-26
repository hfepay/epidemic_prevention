<template>
  <el-time-select
    v-bind="$_OPTIONS"
    v-on="$listeners"
  />
</template>
<script>
import DateMixins from '../Mixins/date_mixins'
export default {
  mixins: [DateMixins],
  props: {
  },
  computed: {
    $_OPTIONS() {
      return {
        ...this.defaultOptions,
        ...this.$attrs
      }
    }
  }
}
</script>

<style scoped>
</style>
