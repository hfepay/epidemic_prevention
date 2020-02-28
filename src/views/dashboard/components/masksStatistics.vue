<!--今日体温测量表-->
<template>
  <title-box title="未戴口罩统计">
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
      return getLineOption({ color: '#FBA224' })
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
