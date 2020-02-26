<template>
  <el-cascader
    v-bind="$attrs"
    :options="options"
    :props="props"
    clearable
    v-on="$listeners"
  />
</template>

<script>
import DeptApi from '../../../api/module/account/AccountSysDeptApi'

export default {
  name: 'DeptSelect',
  data() {
    return {
      props: {
        checkStrictly: true,
        label: 'simpleName',
        value: 'id'
      },
      options: []
    }
  },
  async created() {
    const res = await DeptApi.tree()
    this.options = res.data
  }
}
</script>
