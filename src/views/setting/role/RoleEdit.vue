<template>
  <base-form
    ref="form"
    :model="DialogForm"
    :rules="DialogFormRules"
    :form-headers="DialogFormHeaders"
    label-width="120px"
    @submit="Mixins_$Submit"
    @cancel="cancel"
  >
    <template slot="permission">
      <el-form-item label="权限：" props="menus">
        <el-tree
          ref="tree"
          class="permission-tree"
          node-key="id"
          show-checkbox
          :data="permissionList"
          :default-checked-keys="checkedKeys"
          :default-expand-all="true"
          :props="{
            label: 'title'
          }"
        />
      </el-form-item>
    </template>
  </base-form>
</template>

<script>
import { mapGetters } from 'vuex'
import ApiObject from '../../../api/module/account/AccountSysRoleApi'
import AccountSysMenuApi from '../../../api/module/account/AccountSysMenuApi'
import AESUtils from '../../../utils/security/AESUtils'
export default {
  name: 'RoleEdit',
  data() {
    return {
      permissionList: [],
      checkedKeys: [],
      DialogForm: {
        name: '',
        describle: '',
        menus: []
      },
      DialogFormRules: {
        name: [{ required: true, message: '必填项不能为空', trigger: 'change' }],
        menus: [
          {
            required: true, trigger: 'change', validator: (rule, value, callback) => {
              callback(this.getCheckedKeys().length > 0 ? '' : new Error('必填项不能为空'))
            }
          }
        ]
      },
      DialogFormHeaders: [
        { label: '角色名称', prop: 'name' },
        { label: '角色描述', prop: 'describle', type: 'textarea', maxlength: 200 },
        { label: '权限配置', prop: 'permission', slot: 'permission' }
      ]
    }
  },
  computed: {
    ...mapGetters(['permission'])
  },
  created() {
    const id = this.$route.params.pathMatch
    try {
      id && this.initDialogForm(AESUtils.decrypt(id))
    } catch (e) {
      console.log('非法url')
      this.$router.push('/')
    }
    this.initPermissionList()
  },
  methods: {
    async initPermissionList() {
      const res = await AccountSysMenuApi.getAllTreeMenu()
      this.permissionList = res.data
    },
    async initDialogForm(id) {
      const res = await ApiObject.get(id)
      this.DialogForm = res.data
      this.checkedKeys = res.data.menus
    },
    cancel() {
      this.$router.back()
    },
    async Mixins_$Submit() {
      let result = null
      const data = this.getSubmitData()
      result = data.id ? await ApiObject.update(data) : await ApiObject.add(data)
      this.$message.success(result.message)
      this.cancel()
    },
    getSubmitData() {
      const data = { ...this.DialogForm }
      data.menus = this.getCheckedKeys()
      return data
    },
    getCheckedKeys() {
      const tree = this.$refs.tree
      const getCheckedKeys = tree.getCheckedKeys()
      const getHalfCheckedKeys = tree.getHalfCheckedKeys()
      return [
        ...getCheckedKeys,
        ...getHalfCheckedKeys
      ]
    }
  }
}
</script>

<style lang="scss">
.permission-tree .el-tree-node.is-expanded>.el-tree-node__children .el-tree-node__children{
  display: flex;
}
</style>
