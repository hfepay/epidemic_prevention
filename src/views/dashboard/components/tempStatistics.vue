<!--今日体温测量表-->
<template>
  <title-box title="体温异常统计">
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
        <el-radio-group v-model="radio1">
          <el-radio-button label="1">数量统计</el-radio-button>
          <el-radio-button label="2">百分比</el-radio-button>
        </el-radio-group>
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
      return getLineOption({ color: 'rgb(111, 17, 27)' })
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

    .this-header /deep/ .el-radio-button__inner {
      background-color: #020F27;
      border-color: #020F27;
      color: #08368B;
    }

    .this-header /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      background-color: #1890ff;
      border-color: #1890ff;
      -webkit-box-shadow: -1px 0 0 0 #1890ff;
      box-shadow: -1px 0 0 0 #1890ff;
      color: white;
    }
  }
</style>
