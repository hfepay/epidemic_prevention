<!--今日体温测量表-->
<template>
  <title-box title="今日体温测量表">
    <div class="now-temp-content">
      <div class="now-temp-echarts">
        <echarts :options="options"></echarts>
        <div class="detail">
          测量人数：<span>{{'100'}}</span>
        </div>
      </div>
      <div class="now-temp-text">
        <div class="text">
          异常率：<span style="color: #D60000">20%</span><br>
          （参考合理范围0-15%）
        </div>
      </div>
    </div>
  </title-box>
</template>

<script>
import titleBox from '@/views/dashboard/components/titleBox'
import Echarts from '@/components/echarts/Echarts'
import { getPieOption } from '@/views/dashboard/components/option'

export default {
  name: 'NowTempChart',
  components: {
    titleBox,
    Echarts
  },
  computed: {
    options() {
      return getPieOption()
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
      min-width: 120px;
      text-align: center;
      border: 1px solid rgba(5, 122, 197, 1);
      border-radius: 19px;
      font-size: 20px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;
    }

    .now-temp-text {
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
      font-size: 18px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 30px;
      .text {
        text-align: center;
      }
    }
  }
</style>
