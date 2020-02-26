<template>
  <el-checkbox-group
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot>
      <base-checkbox v-for="(item,$index) in finalList" :key="$index" :option="item" />
    </slot>
  </el-checkbox-group>
</template>

<script>
import ListRequestMixins from '../Mixins/list_request_mixins'
export default {
  mixins: [ListRequestMixins]
}
</script>

<style scoped>

</style>
