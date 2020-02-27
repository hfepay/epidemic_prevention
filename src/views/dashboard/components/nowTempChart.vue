<!--今日体温测量表-->
<template>
  <title-box title="今日体温测量表">
    <div class="now-temp-content">
      <div class="now-temp-echarts">
        <echarts :options="options"></echarts>
        <div class="detail">
          测量人数
        </div>
      </div>
      <div class="now-temp-text"></div>
    </div>
  </title-box>
</template>

<script>
import titleBox from '@/views/dashboard/components/titleBox'
import Echarts from '@/components/echarts/Echarts'
import { getOption } from '@/views/dashboard/components/option'

export default {
  name: 'NowTempChart',
  components: {
    titleBox,
    Echarts
  },
  computed: {
    options() {
      return getOption()
    }
  }
}
</script>

<style lang="scss" scoped>
  .now-temp-content {
    width: 100%;
    height: 100%;
    display: flex;
    .now-temp-echarts, .now-temp-text {
      width: 50%;
    }
    .detail {
      width: 120px;
      height: 40px;
      text-align: center;
      border:1px solid rgba(5, 122, 197, 1);
      border-radius: 19px;
      font-size: 18px;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height: 40px;
    }
  }
</style>
