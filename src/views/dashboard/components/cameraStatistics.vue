<!--今日体温测量表-->
<template>
  <title-box title="摄像头统计">
    <div class="this-body">
      <div class="camera camera1">
        <div class="count">100</div>
        <div class="cameraText">摄像头总数</div>
      </div>
      <div class="camera cameraOnline">
        <div class="count">100</div>
        <div class="cameraText">在线摄像头</div>
      </div>
    </div>
  </title-box>
</template>

<script>
import titleBox from '@/views/dashboard/components/titleBox'

export default {
  name: 'NowTempChart',
  data() {
    return {
      radio1: '1'
    }
  },
  components: {
    titleBox
  }
}
</script>

<style lang="scss" scoped>
  .this-body {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family:Source Han Sans CN;

    .camera {
      width: 203px;
      height: 184px;
      margin: 0 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .count {
        text-align: center;
        font-size:30px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height:40px;
      }
      .cameraText {
        position: absolute;
        bottom: 10px;
        font-size:18px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:20px;
      }
    }
    .camera1 {
      background: url("../../../assets/image/camera.png");
    }
    .cameraOnline {
      background: url("../../../assets/image/cameraOnline.png");
    }
  }
</style>
