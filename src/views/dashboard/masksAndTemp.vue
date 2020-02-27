<template>
  <div class="hf-dashboard">
    <masks-header></masks-header>
    <div class="hf-content">
      <div class="width33">
        <masks-top10></masks-top10>
      </div>
      <div class="width66">
        <now-temp-chart></now-temp-chart>
      </div>
    </div>
  </div>
</template>

<script>
import masksHeader from '@/views/dashboard/components/masksHeader'
import masksTop10 from '@/views/dashboard/components/masksTop10'
import nowTempChart from '@/views/dashboard/components/nowTempChart'
export default {
  name: 'MasksAndTemp',
  components: { masksHeader, masksTop10, nowTempChart },
}
</script>

<style lang="scss" scoped>
  .hf-dashboard {
    width: 100%;
  }
  .hf-content {
    width: 100%;
    height: calc(100vh - 245px);
    display: flex;
  }
  .width33 {
    width: 33.2%;
    height: 100%;
  }
  .width66 {
    width: 66.4%;
    margin-left: 0.4%;
    height: 100%;
  }
</style>
