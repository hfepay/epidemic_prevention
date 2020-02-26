<template>
  <el-input
    v-bind="options"
    v-on="$listeners"
  >
    <template slot="prepend">
      <slot name="prepend" />
    </template>
    <template slot="prefix">
      <slot name="prefix" />
    </template>
    <template slot="suffix">
      <slot name="suffix" />
    </template>
    <template slot="append">
      <slot name="append" />
    </template>
  </el-input>
</template>
<script>
export default {
  data() {
    return {
      defaultOptions: {
        maxlength: this.$attrs.type === 'textarea' ? 200 : 30
      }
    }
  },
  computed: {
    options() {
      return {
        ...this.defaultOptions,
        ...this.$attrs
      }
    }
  }
}
</script>
