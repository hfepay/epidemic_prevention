<template>
  <el-time-picker
    v-bind="$_OPTIONS"
    v-on="$listeners"
  />
</template>
<script>
import DateMixins from '../Mixins/date_mixins'
export default {
  mixins: [DateMixins],
  data() {
    return {
      defaultOptions: {
        'placeholder': '请选择时间',
        'start-placeholder': '请选择时间范围',
        'end-placeholder': '请选择时间范围',
        'format': 'HH:mm',
        'value-format': 'HH:mm'
      }
    }
  }
}
</script>

<style scoped>
</style>
