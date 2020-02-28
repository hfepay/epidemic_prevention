<template>
  <div class="tempHeader">
    <div class="item">
      <div class="title text-center">测量总人数</div>
      <div class="count text-center">100</div>
    </div>
    <div class="item">
      <div class="title text-center">体温异常总人数</div>
      <div class="count text-center">20</div>
    </div>
    <div class="item">
      <div class="title text-center">体温异常率</div>
      <div class="count text-center">20.00%</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TempHeader'
}
</script>

<style lang="scss" scoped>
  .tempHeader {
    width: 100%;
    height: 150px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    font-family: Source Han Sans CN;

    .item {
      width: 32%;
      padding-left: 8%;
      height: 100%;
      background: url("../../../assets/image/tempHeader.png") no-repeat center;
      background-size: 100% 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: center;

      .title {
        width: 100%;
        font-size: 26px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
      .count {
        width: 100%;
        font-size:30px;
        font-weight:bold;
        color:rgba(214,0,0,1);
        line-height:70px;
      }
    }
  }
</style>
