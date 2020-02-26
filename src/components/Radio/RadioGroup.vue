<template>
  <el-radio-group v-bind="$attrs" v-on="$listeners">
    <slot>
      <base-radio v-for="(item,$index) in finalList" :key="$index" :option="item" />
    </slot>
  </el-radio-group>
</template>

<script>
import ListRequestMixins from '../Mixins/list_request_mixins'
export default {
  mixins: [ListRequestMixins]
}
</script>

<style scoped>

</style>
