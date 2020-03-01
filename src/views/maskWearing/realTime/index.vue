<template>
  <div class="hf-dashboard">
    <div class="hf-content">
      <div class="width66">
        <real-time-header></real-time-header>
        <div class="real-times">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
      </div>
      <div class="width33 chartBox">
        <real-cameras></real-cameras>
      </div>
    </div>
  </div>
</template>

<script>
import realTimeHeader from '@/views/maskWearing/realTime/realTimeHeader'
import realCameras from '@/views/maskWearing/realTime/realCameras'
import nowTempChart from '@/views/dashboard/components/nowTempChart'
import deviceStatusChart from '@/views/dashboard/components/deviceStatusChart'
import tempStatistics from '@/views/dashboard/components/tempStatistics'
import masksStatistics from '@/views/dashboard/components/masksStatistics'
export default {
  name: 'MasksAndTemp',
  components: { realTimeHeader, realCameras, nowTempChart, deviceStatusChart, tempStatistics, masksStatistics }
}
</script>

<style lang="scss" scoped>
  .hf-dashboard {
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #010A1B;
  }

  .hf-content {
    width: 100%;
    height: calc(100vh - 93px);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    .real-times {
      width: 100%;
      height: calc(100% - 153px);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-between;
    }
  }
  .width33 {
    width: 33.2%;
    height: 100%;
  }
  .chartBox {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
  }
  .item {
    width: 49.7%;
    height: 49.6%;
    background: url("https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg") no-repeat center;
    background-size: 100% 100%;
  }
  .width66 {
    width: 66%;
    margin-left: 0.4%;
    height: 100%;
  }
</style>
