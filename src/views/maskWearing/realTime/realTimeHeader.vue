<!--口罩头-->
<template>
  <div class="header">
    <div class="left">
      <div class="title text-center">今日未戴口罩人数</div>
      <div class="content text-center">369</div>
    </div>
    <div class="center">
      <div class="text">
        <div>2020-02-19</div>
        <div>周三</div>
        <div>11:20:23</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MasksHeader'
}
</script>

<style lang="scss" scoped>
  .header {
    width: 100%;
    height: 151px;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    font-family:Source Han Sans CN;

    .text-center {
      text-align: center;
    }
    .left {
      width: 34%;
      height: 106px;
      position: absolute;
      .title {
        width: 100%;
        position: relative;
        top: -2px;
        font-size:20px;
        font-weight:bold;
        color:rgba(255,255,255,1);
      }
      .content {
        font-size:30px;
        font-weight:bold;
        color:rgba(214,0,0,1);
        line-height:80px;
      }
    };
    .left {
      left: 0;
      padding-left: 10px;
      background: url("../../../assets/image/dashboard/header_left.png") no-repeat center;
      background-size: 100% 100%;
    }
    .center {
      width: 68.5%;
      height: 151px;
      background: url("../../../assets/image/realTime.png") no-repeat center;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      padding: 0 4% 0 8%;
      .text {
        font-size: 40px;
        line-height: 45px;
        width: 100%;
        font-weight:400;
        color:rgba(255,255,255,1);
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
