<template>
  <div>
    <base-input
      v-if="filter"
      v-model="filterText"
      placeholder="输入关键字进行过滤"
    />
    <el-tree
      ref="tree"
      :filter-node-method="filterNode"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <template v-if="$scopedSlots.default" slot-scope="{ node, data }">
        <slot :node="node" :data="data" />
      </template>
    </el-tree>
  </div>
</template>
<script>
import MethodsMixins from '../Mixins/methods_mixins'
export default {
  name: 'Tree',
  mixins: [MethodsMixins],
  props: {
    filter: {
      type: Boolean,
      default: true
    },
    filterNode: {
      type: Function,
      default: function(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      }
    }
  },
  data() {
    return {
      filterText: '',
      $COMPONENT_REF: 'tree',
      // 组件方法
      $METHODS_ARR: [
        'filter',
        'updateKeyChildren',
        'getCheckedNodes',
        'setCheckedNodes',
        'setCheckedKeys',
        'setChecked',
        'getHalfCheckedNodes',
        'getHalfCheckedKeys',
        'getCurrentKey',
        'getCurrentNode',
        'setCurrentKey',
        'setCurrentNode',
        'getNode',
        'remove',
        'append',
        'insertBefore',
        'insertAfter'
      ]
    }
  },
  watch: {
    filterText(val) {
      this.$refs[this.$data.$COMPONENT_REF].filter(val)
    }
  }
}
</script>

<style scoped>
</style>
