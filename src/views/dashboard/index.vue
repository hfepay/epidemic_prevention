<template>
  <div class="welcome-text animated slow fadeIn">
    您好,欢迎使用!
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .welcome-text{
    height: calc(100vh - 142px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 80px;
    font-weight: bolder;
    color: #999999;
  }
</style>

