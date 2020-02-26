<template>
  <div class="block">
    <span class="demonstration">单选选择任意一级选项</span>
    <el-cascader
      :options="options"
      :props="{ checkStrictly: true }"
      clearable></el-cascader>
  </div>
</template>

<script>
import DeptApi from '@/api/SysDeptApi'

export default {
  name: 'DeptCascader',
  data() {
    return {
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                }, {
                  value: 'fankui',
                  label: '反馈'
                }, {
                  value: 'xiaolv',
                  label: '效率'
                }, {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            }, {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                }, {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  async created() {
    await DeptApi
  }
}
</script>

<style scoped>

</style>
