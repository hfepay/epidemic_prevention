export default {
  data() {
    return {
      // 组件方法
      $METHODS_ARR: [],
      // 组件ref
      $COMPONENT_REF: 'component'
    }
  },
  mounted() {
    this.$data.$METHODS_ARR.forEach(item => {
      this[item] = (...arg) => {
        return this.$refs[this.$data.$COMPONENT_REF][item].apply(this, [...arg])
      }
    })
  }
}
