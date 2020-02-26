<template>
  <div v-loading="loading" class="box">
    <!--搜索条件相关-->
    <div class="search-container">
      <slot name="layout-search" />
    </div>

    <!--操作按钮-->
    <div class="operate-container">
      <div class="operate">
        <slot name="layout-operate" />
      </div>
    </div>

    <!--table-->
    <slot name="table">
      <table-template
        ref="table"
        v-bind="$attrs"
        :headers="headers"
        :border="border"
        v-on="$listeners"
      >
        <template slot="append">
          <slot name="append" />
        </template>
        <template v-for="i in headers" :slot="i.slot" slot-scope="{scope}">
          <slot v-if="i.slot" :name="i.slot" :scope="scope" />
        </template>
        <slot />
      </table-template>
    </slot>
    <!--分页-->
    <div
      v-if="pagination"
      class="pagination"
      style="text-align: right;margin-top: 10px"
      :style="`text-align: ${paginationPosition}`"
    >
      <slot name="pagination">
        <el-pagination
          layout="sizes, prev, pager, next, jumper, ->, total, slot"
          :total="pageObj.total"
          :page-size="pageObj.limit"
          :current-page="pageObj.page"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import TableTemplate from './BaseTable'

export default {
  name: 'TableLayout',
  components: { TableTemplate },
  props: {
    headers: {
      type: Array,
      default: function() {
        return []
      }
    },
    paginationPosition: { type: String, default: 'right' },
    pagination: { type: Boolean, default: true },
    border: { type: Boolean, default: true },
    pageObj: {
      type: Object, default: function() {
        return { page: 1, limit: 10, total: 0 } // page对象
      }
    },
    theadFilter: { type: Boolean, default: false }
  },
  data() {
    return {
      loading: false,
      HeadersVisible: false
    }
  },
  methods: {
    loadOrToggle(row) {
      this.$refs['table'].$refs['table'].store.loadOrToggle(row)
    },
    // 分页长度改变
    handleSizeChange(val) {
      this.$emit('sizeChange', val)
    },
    // 分页页码改变
    handleCurrentChange(val) {
      this.$emit('currentChange', val)
    }
  }
}
</script>

<style lang="scss" scoped>
  $bg: rgba(238, 238, 238, .4);
  .operate-container{
    display: flex;
    width: 100%;
    .operate{
      flex: 1;
      text-align: right;
    }
  }

  .search-container{
    background-color: $bg;
    // padding-top: 18px;
    padding-left: 10px;
  }
  .operate-container{
    margin-top: 20px;
    background-color: $bg;
    padding: 10px;
  }
 .table {
    margin-top: 10px
  }
</style>
<style>
  .search-container .el-form{
    padding-top: 19px;
  }
</style>
