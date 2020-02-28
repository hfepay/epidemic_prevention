<!--今日体温测量表-->
<template>
  <title-box title="设备状态信息">
    <div class="now-temp-content">
      <div class="now-temp-echarts">
        <echarts :options="options"></echarts>
        <div class="detail">
          设备总数：<span>{{'10'}}</span>
        </div>
      </div>
      <div class="now-temp-text">
        <div class="device1">
          <img class="icon" :src="images.camera" alt="">
          <div class="text">摄像头<br>
            <span class="device-detail" style="margin-right: 10px">在线4</span>
            <span class="device-detail">离线2</span>
          </div>
        </div>
        <div class="device2">
          <img class="icon" :src="images.pad" alt="">
          <div class="text">人脸设备<br>
            <span class="device-detail" style="margin-right: 10px">在线4</span>
            <span class="device-detail">离线2</span>
          </div>
        </div>
      </div>
    </div>
  </title-box>
</template>

<script>
import titleBox from '@/views/dashboard/components/titleBox'
import Echarts from '@/components/echarts/Echarts'
import { getPieOption } from '@/views/dashboard/components/option'
import { camera, pad } from '@/constants/module/imgaesConstants'

export default {
  name: 'NowTempChart',
  components: {
    titleBox,
    Echarts
  },
  computed: {
    options() {
      return getPieOption({
        data: [
          { value: 80, name: '在线' },
          { value: 20, name: '离线' }
        ], name: '设备统计'
      })
    },
    images() {
      return {
        pad,
        camera
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .now-temp-content {
    width: 100%;
    height: 100%;
    display: flex;
    font-family: Source Han Sans CN;

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
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      align-content: center;
      font-size: 18px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 30px;

      .device1, .device2 {
        min-width: 60%;
        display: flex;
        flex-wrap: wrap;
        margin: 10px 0;
      }

      .icon {
        width: 55px;
        height: 55px;
      }

      .text {
        width: calc(100% - 55px);
        padding-left: 19px;
        font-size: 18px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 25px;

        .device-detail {
          font-size: 18px;
          font-weight: 400;
          line-height: 30px;
          color: rgba(13, 203, 9, 1);
        }

        .device-detail:last-child {
          color: rgba(214, 0, 0, 1);
        }
      }
    }
  }
</style>
