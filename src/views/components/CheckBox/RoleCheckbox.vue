<template>
  <div>
    <el-checkbox-group v-bind="$attrs" v-on="$listeners">
      <el-checkbox v-for="(item,$index) in options" :key="$index" :label="item.value">
        {{ item.label }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
import ApiObject from '../../../api/module/account/AccountSysRoleApi'

export default {
  name: 'RoleCheckbox',
  data() {
    return {
      options: {}
    }
  },
  async created() {
    const res = await ApiObject.list()
    this.options = ApiObject.toOptions(res.data, { label: 'name' })
    /* this.options = [
      { label: '角色1', value: '1' },
      { label: '角色2', value: '2' }
    ]*/
  }
}
</script>
