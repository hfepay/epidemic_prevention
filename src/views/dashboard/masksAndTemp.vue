<template>
  <div class="hf-dashboard">
    <masks-header></masks-header>
    <div class="hf-content">
      <div class="width33">
        <masks-top10></masks-top10>
      </div>
      <div class="width66"></div>
    </div>
  </div>
</template>

<script>
import masksHeader from '@/views/dashboard/components/masksHeader'
import masksTop10 from '@/views/dashboard/components/masksTop10'
export default {
  name: 'MasksAndTemp',
  components: { masksHeader, masksTop10 },
  created() {
    console.log(masksHeader)
  }
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
    width: 33%;
    height: 100%;
  }
  .width66 {
    width: 66%;
    height: 100%;
  }
</style>
