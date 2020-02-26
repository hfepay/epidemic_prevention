<template>
  <el-table
    ref="table"
    v-bind="$attrs"
    border
    style="width: 100%"
    v-on="$listeners"
  >
    <template v-for="(i,$index) in headers">
      <table-column v-if="i.show !== false" :key="`${$index}`" :col="i">
        <template v-if="i.slot" :slot="i.slot" slot-scope="{scope}">
          <slot :name="i.slot" :scope="scope" />
        </template>
      </table-column>
    </template>
    <template slot="append">
      <slot name="append" />
    </template>
    <slot />
  </el-table>
</template>

<script>
import TableColumn from './BaseTableColumn.vue'
export default {
  name: 'TableTemplate',
  components: { TableColumn },
  props: {
    headers: {
      type: Array,
      required: false,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      methods: ['clearSelection', 'toggleRowSelection', 'toggleAllSelection', 'toggleRowExpansion', 'setCurrentRow', 'clearSort', 'clearFilter', 'doLayout', 'sort']
    }
  },
  mounted() {
    this.methods.forEach(method => {
      this[method] = (...arg) => {
        return this.$refs['table'][method].apply(this, arg)
      }
    })
  }
}
</script>
