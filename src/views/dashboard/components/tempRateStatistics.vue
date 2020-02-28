<!--今日体温测量表-->
<template>
  <title-box title="体温异常率统计">
    <template #title-right>
      <el-date-picker
        type="daterange"
        size="small"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </template>
    <div class="this-body">
      <div class="this-header">
      </div>
      <echarts :options="options"></echarts>
    </div>
  </title-box>
</template>

<script>
import titleBox from '@/views/dashboard/components/titleBox'
import Echarts from '@/components/echarts/Echarts'
import { getLineOption } from '@/views/dashboard/components/option'

export default {
  name: 'NowTempChart',
  props: {
    thisHeader: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      radio1: '1'
    }
  },
  components: {
    titleBox,
    Echarts
  },
  computed: {
    options() {
      return getLineOption({ color: 'rgb(111, 17, 27)', yType: '%', data: [10, 12, 13, 15, 21, 1, 9] })
    }
  }
}
</script>

<style lang="scss" scoped>
  .this-body {
    height: 100%;
    width: 100%;

    .this-header {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
