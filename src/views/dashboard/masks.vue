<template>
  <div class="hf-dashboard">
    <masks-header></masks-header>
    <div class="hf-content">
      <div class="width50">
        <masks-top10></masks-top10>
      </div>
      <div class="width50">
        <div class="item">
          <camera-statistics/>
        </div>
        <div class="item">
          <masks-statistics></masks-statistics>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import masksHeader from '@/views/dashboard/components/masksHeader'
import masksTop10 from '@/views/dashboard/components/masksTop10'
import masksStatistics from '@/views/dashboard/components/masksStatistics'
import cameraStatistics from '@/views/dashboard/components/cameraStatistics'

export default {
  name: 'Masks',
  components: { masksHeader, masksTop10, masksStatistics, cameraStatistics }
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
  .width50 {
    width: 49.8%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    .item {
      width: 100%;
      height: 49.6%;
    }
  }
</style>
