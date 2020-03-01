<template>
  <div class="hf-dashboard">
    <temp-header></temp-header>
    <div class="hf-content">
      <div class="w50h50"><now-temp-chart/></div>
      <div class="w50h50"><device-status-chart/></div>
      <div class="w50h50"><temp-statistics :this-header="false"/></div>
      <div class="w50h50"><temp-rate-statistics/></div>
    </div>
  </div>
</template>

<script>
import tempHeader from '@/views/dashboard/components/tempHeader'
import nowTempChart from '@/views/dashboard/components/nowTempChart'
import deviceStatusChart from '@/views/dashboard/components/deviceStatusChart'
import tempStatistics from '@/views/dashboard/components/tempStatistics'
import tempRateStatistics from '@/views/dashboard/components/tempRateStatistics'

export default {
  name: 'Temp',
  components: {
    tempHeader,
    nowTempChart,
    deviceStatusChart,
    tempStatistics,
    tempRateStatistics
  }
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
  .w50h50 {
    width: 49.8%;
    height: 49.6%;
  }
</style>
