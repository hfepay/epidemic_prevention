<!--口罩头-->
<template>
  <div class="header">
    <div class="left">
      <div class="title text-center">未带口罩总人数</div>
      <div class="content text-center">369</div>
    </div>
    <div class="center">
      <div class="text">
        实时<br>抓拍
      </div>
      <div class="leftBt"></div>
      <div class="imgs">
        <div v-for="item in 5" :key="item" class="imgItem">
          <el-image
            style="width: 84px; height: 84px"
            :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"/>
          <div class="text-center" style="width: 100%">
            11:20:23<br>1号机
          </div>
        </div>
      </div>
      <div class="rightBt"></div>
    </div>
    <div class="right">
      <div class="title text-center">今日未戴口罩人数</div>
      <div class="content text-center">369</div>
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
    justify-content: center;
    position: relative;
    font-family:Source Han Sans CN;

    .text-center {
      text-align: center;
    }
    .left, .right {
      width: 23%;
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
    .right {
      right: 0;
      padding-right: 10px;
      background: url("../../../assets/image/dashboard/header_right.png") no-repeat center;
      background-size: 100% 100%;
    }
    .center {
      width: 57.7%;
      height: 151px;
      background: url("../../../assets/image/dashboard/header_center.png") no-repeat center;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      padding: 0 4%;
      position: relative;
      .leftBt, .rightBt {
        width: 32px;
        height: 32px;
        cursor: pointer;
        border-radius: 50%;
        transition: .1s;
      }
      .leftBt:hover, .rightBt:hover {
        box-shadow: 0 0 2px 2px #66b1ff;
      }
      .leftBt {
        background: url("../../../assets/image/icon/leftBt.png") no-repeat center;
        background-size: 100%;
      }
      .rightBt {
        background: url("../../../assets/image/icon/rightBt.png") no-repeat center;
        background-size: 100%;
      }
      .text {
        font-size: 40px;
        line-height: 45px;
        width: 80px;
        font-weight:300;
        color:rgba(255,255,255,1);
      }
      .imgs {
        width: calc(100% - 144px);
        height: 100%;
        display: flex;
        .imgItem {
          height: 100%;
          width: 20%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          align-content: center;
          font-size:14px;
          font-weight:400;
          color:rgba(255,255,255,1);
        }
      }
    }
  }
</style>
