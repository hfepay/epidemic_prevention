<template>
  <div class="content">
    <div class="title clearfix">
      {{title}}
      <div class="right-slot">
        <slot name="title-right"></slot>
      </div>
    </div>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TitleBox',
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
  .content {
    height: 100%;
    width: 100%;
    font-family:Source Han Sans CN;
    background-color: #4AB7BD;
    box-shadow: 0 0 1px 1px rgb(40, 103, 155);
    $lineHeight: 50px;
    .title {
      line-height: $lineHeight;
      width: 100%;
      padding:0 15px;
      font-size:20px;
      font-weight:bold;
      color:rgba(255,255,255,1);
      background-image: linear-gradient(to right, rgb(1, 35, 60),rgb(0, 10, 29));
    }
    .right-slot {
      height: 100%;
      float: right;
    }
    .title /deep/.el-range-editor--small .el-range-input {
      background-color: #010A1B;
    }
    .title /deep/.el-range-editor--small.el-input__inner {
      background-color: #010A1B;
      border: 1px solid #057AC5;
    }
    .title /deep/ .el-range-editor--small .el-range-separator {
      color: #606266;
    }
    .body {
      height: calc(100% - 50px);
      width: 100%;
      padding: 0 20px;
      background-color: rgb(0, 10, 29);
    }
  }
</style>
