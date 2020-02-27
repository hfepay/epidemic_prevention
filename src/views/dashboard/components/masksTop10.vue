<template>
  <title-box title="未戴口罩排名">
    <template #title-right>
      <el-date-picker
        type="daterange"
        size="small"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
    </template>
    <div class="top10">
      <div class="top10-title">
        <div class="yellowFont">排名</div>
        <div class="yellowFont">摄像头名称</div>
        <div class="yellowFont">人次</div>
      </div>
      <div v-for="item in 10" class="topItem">
        <img v-if="item === 1" :src="icons.top1" alt="">
        <img v-else-if="item === 2" :src="icons.top2" alt="">
        <img v-else-if="item === 3" :src="icons.top3" alt="">
        <div v-else class="yellowFont">{{item}}</div>
        <div>{{`摄像头${item}`}}</div>
        <div>123</div>
      </div>
    </div>
  </title-box>
</template>

<script>
import titleBox from '@/views/dashboard/components/titleBox'
import { top1, top2, top3 } from '@/constants/module/imgaesConstants'

export default {
  name: 'MasksTop10',
  components: {
    titleBox
  },
  computed: {
    icons() {
      return {
        top1, top2, top3
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .top10 {
    height: 100%;

    .top10-title, .topItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 .5px .5px 0 #057AC5;
    }

    .top10-title {
      height: 60px;
      display: flex;
      align-items: center;
    }

    .yellowFont {
      font-size: 20px;
      font-weight: bold;
      color: rgba(251, 162, 36, 1);
      min-width: 37px;
      text-align: center;
    }

    .topItem {
      height: calc((100% - 60px) / 10);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
</style>
