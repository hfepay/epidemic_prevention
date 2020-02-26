export default {
  data() {
    return {
      commonOptions: {
        'placeholder': '请选择日期',
        'start-placeholder': '请选择日期范围',
        'end-placeholder': '请选择日期范围'
      },
      defaultOptions: {}
    }
  },
  computed: {
    $_OPTIONS() {
      return {
        ...this.commonOptions,
        ...this.defaultOptions,
        ...this.$attrs
      }
    }
  }
}
