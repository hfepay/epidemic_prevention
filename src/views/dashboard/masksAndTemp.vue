<template>
  <div class="hf-dashboard">
    <masks-header></masks-header>
    <div class="hf-content">
      <div class="width33">
        <masks-top10></masks-top10>
      </div>
      <div class="width66 chartBox">
        <div class="item"><now-temp-chart></now-temp-chart></div>
        <div class="item"><device-status-chart></device-status-chart></div>
        <div class="item"><temp-statistics></temp-statistics></div>
        <div class="item"><masks-statistics></masks-statistics></div>
      </div>
    </div>
  </div>
</template>

<script>
import masksHeader from '@/views/dashboard/components/masksHeader'
import masksTop10 from '@/views/dashboard/components/masksTop10'
import nowTempChart from '@/views/dashboard/components/nowTempChart'
import deviceStatusChart from '@/views/dashboard/components/deviceStatusChart'
import tempStatistics from '@/views/dashboard/components/tempStatistics'
import masksStatistics from '@/views/dashboard/components/masksStatistics'
export default {
  name: 'MasksAndTemp',
  components: { masksHeader, masksTop10, nowTempChart, deviceStatusChart, tempStatistics, masksStatistics }
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
    height: calc(100vh - 250px);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
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
  }
  .width66 {
    width: 66.4%;
    margin-left: 0.4%;
    height: 100%;
  }
</style>
