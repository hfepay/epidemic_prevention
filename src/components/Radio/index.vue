<template>
  <el-radio v-bind="$attrs" :label="option.value" :disabled="option.disabled" v-on="$listeners">
    <slot>
      {{ option.label }}
    </slot>
  </el-radio>
</template>

<script>
export default {
  props: {
    option: {
      type: Object,
      default: function() {
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>
