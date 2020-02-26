<template>
  <div :id="id" style="width: 100%;height:500px;" />
</template>

<script>
// 用于生成uuid
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
function guid() {
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}
import echarts from 'echarts'
export default {
  props: {
    options: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      id: ''
    }
  },
  watch: {
    options: {
      handler(newVal, oldVal) {
        this.options = newVal || oldVal
        this.initEchart()
      },
      deep: true // 对象内部属性的监听，关键。
    }
  },
  created() {
    this.id = guid()
  },
  mounted() {
    this.initEchart()
  },
  methods: {
    initEchart() {
      const echart = document.getElementById(this.id)
      if (!echart) {
        return
      }
      const myChart = echarts.init(echart)
      myChart.setOption(this.options, true)
      this.changEcharts(myChart)
    },
    changEcharts(myChart) {
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" scoped>

</style>
