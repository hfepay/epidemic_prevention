<template>
  <title-box title="实时抓拍">
    <div class="top10">
      <div class="top10-title">
        <div class="yellowFont">抓拍图</div>
        <div class="yellowFont">抓拍时间</div>
        <div class="yellowFont">抓拍行为</div>
      </div>
      <div v-for="item in 5" class="topItem">
        <el-image
          style="width: 100px; height: 100px"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        ></el-image>
        <div class="topItemCenter">2020-02-19<br> 11:20:23<br> 1号机</div>
        <div>未佩戴口罩</div>
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
      height: calc((100% - 60px) / 5);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      .topItemCenter {
        line-height: 30px;
      }
    }
  }
</style>
