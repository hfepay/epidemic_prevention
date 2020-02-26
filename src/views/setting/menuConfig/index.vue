<template>
  <div>
    <base-table-layout
      :key="tableKey"
      :page-obj="Mixins_$PageObj"
      :headers="Headers"
      :data="Mixins_$TableData"
      row-key="id"
      :load="load"
      lazy
      :tree-props="{hasChildren: 'hasChildren'}"
      @sizeChange="Mixins_$SizeChange"
      @currentChange="Mixins_$CurrentChange"
    >
      <template slot="layout-search">
        <base-form :inline="true" :model="QueryParams" :show-default-foot="false">
          <el-form-item label="菜单名称：">
            <base-input v-model="QueryParams.name" placeholder="菜单名称" />
          </el-form-item>
          <el-form-item label="菜单路径：">
            <base-input v-model="QueryParams.path" placeholder="菜单路径" />
          </el-form-item>
          <el-button type="primary" @click="Mixins_$Search">
            查询
          </el-button>
        </base-form>
      </template>
      <template slot="layout-operate">
        <el-button type="primary" @click="Mixins_$Add">
          新增一级菜单
        </el-button>
      </template>
      <!--操作-->
      <template slot="operator" slot-scope="{scope}">
        <el-button type="primary" @click.stop="AddChild(scope.row)">
          新增下级菜单
        </el-button>
        <el-button type="primary" @click.stop="Mixins_$Edit(scope.row)">
          编辑
        </el-button>
        <el-button @click.stop="Mixins_$Del(scope.row)">
          删除
        </el-button>
      </template>
    </base-table-layout>
    <base-dialog
      :title="DialogForm['id']?'修改':'新增'"
      :visible.sync="Mixins_$DialogVisible"
      top="5vh"
      width="530px"
      center
      @closed="Mixins_$Reset"
    >
      <base-form
        ref="form"
        :key="DialogFormKey"
        :model="DialogForm"
        :rules="DialogFormRules"
        :form-headers="DialogFormHeaders"
        label-width="120px"
        @submit="Mixins_$Submit"
        @cancel="Mixins_$DialogVisible = false"
      >
        <template v-if="isChildren" slot="ParentName">
          <el-form-item label="父节点名称：" prop="ParentName">
            <base-input v-model="DialogForm.ParentName" disabled />
          </el-form-item>
        </template>
        <template #icon>
          <el-form-item label="icon：" prop="icon">
            <svg-icon v-if="DialogForm.icon" :icon-class="DialogForm.icon" />
            <el-button type="primary" @click="iconDialogVisible = true">
              选择图标
            </el-button>
            <el-button v-show="DialogForm.icon" type="danger" @click="DialogForm.icon = ''">
              清空图标
            </el-button>
          </el-form-item>
        </template>
      </base-form>
    </base-dialog>
    <base-dialog
      title="图标"
      :visible.sync="iconDialogVisible"
    >
      <ul class="icon-list">
        <li
          v-for="item in allIcons"
          :key="item"
          title="点击选择"
          class="icon-item"
          @click="chooseIcon(item)"
        >
          <svg-icon :icon-class="item" class="icon-svg" />
        </li>
      </ul>
    </base-dialog>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/account/AccountSysMenuApi'
import { menuStatus, zeroOrOneStatus } from '@/constants/module/status.constans'
import { allIcons } from '../../../icons'
import BaseDialog from '../../../components/dialog/BaseDialog'
import { pageOptions } from '../../../router/all.router'

export default {
  components: { BaseDialog },
  mixins: [Mixins],
  data() {
    return {
      allIcons,
      ApiObject,
      tableKey: 0,
      iconDialogVisible: false,
      Mixins_$TableData: [],
      isChildren: false,
      QueryParams: {
        title: '',
        path: ''
      },
      DialogFormKey: 0,
      DialogForm: {
        name: '',
        url: '',
        icon: '',
        sortNum: '',
        isMenu: '',
        status: '',
        isLink: '',
        isBlank: ''
      },
      DialogFormRules: {
        /* name: [
          { required: true, trigger: 'blur', message: '请输入菜单名称' }
        ],
         url: [
          { required: true, message: '请输入菜单路径', trigger: 'blur' }
        ],*/
        sortNum: [
          { required: true, message: '请输入排序号' }
        ],
        status: [{ required: true, message: '请选择是否启用' }]
      },
      DialogFormHeaders: [
        { label: '父节点名称', slot: 'ParentName' },
        { label: '节点名称', prop: 'title' },
        { label: '前端页面', prop: 'name', type: 'radio', options: pageOptions },
        { label: '访问路径', prop: 'path' },
        { label: 'icon', slot: 'icon' },
        // { label: '绑定权限', prop: 'url' },
        { label: '菜单排序号', prop: 'sortNum', type: 'number' },
        { label: '是否菜单', prop: 'isMenu', type: 'radio', options: this.$utils.toOptions(zeroOrOneStatus) },
        { label: '是否外链', prop: 'isLink', type: 'radio', options: this.$utils.toOptions(zeroOrOneStatus) },
        { label: '菜单状态', prop: 'status', type: 'radio', options: this.$utils.toOptions(menuStatus) },
        { label: '是否新开页面', prop: 'isBlank', type: 'radio', options: this.$utils.toOptions(zeroOrOneStatus) },
        { label: '备注', prop: 'describle', type: 'textarea', maxlength: 200 }
      ],
      Headers: [
        // { type: 'index', label: '序号' },
        { label: '节点名', prop: 'title' },
        { label: '节点路径', prop: 'path' },
        { label: '菜单状态', prop: 'status', format: menuStatus },
        { label: '操作', slot: 'operator', fixed: 'right', align: 'center', width: 280 }
      ]
    }
  },
  computed: {
    menuStatus() {
      return menuStatus
    },
    zeroOrOneStatus() {
      return zeroOrOneStatus
    }
  },
  methods: {
    chooseIcon(icon) {
      this.DialogForm.icon = icon
      this.iconDialogVisible = false
    },
    Mixins_AddBefore() {
      // 设置新增初始值
      const defaultOptions = {
        // name: 'Layout',
        isLink: '0',
        isMenu: '1',
        isBlank: '0',
        status: '1'
      }
      Object.keys(defaultOptions).forEach(key => {
        this.$set(this.DialogForm, key, defaultOptions[key])
      })
    },
    Mixins_GetTableDataAfter(data) {
      this.tableKey++
    },
    Mixins_ResetAfter() {
      this.isChildren = false
    },
    AddChild(row) {
      this.isChildren = true
      this.DialogForm.ParentName = row.title
      this.DialogForm.pid = row.id
      this.Mixins_AddBefore()
      this.Mixins_$DialogVisible = true
      this.Mixins_$SetDialogOperate(this.Mixins_$OperateType.ADD)
      this.Mixins_AddAfter()
    },
    async load(tree, treeNode, resolve) {
      const res = await ApiObject.customize_get(`/findListByPid/${tree.id}`)
      resolve(res.data)
    }
  }
}
</script>
<style lang="scss" scoped>
  ul li {
    list-style: none;
  }
  .icon-list{
    display: flex;
    flex-wrap: wrap;
    .icon-item{
      width: 100px;
      height: 100px;
      display: flex;
      .icon-svg{
        width: 50px;
        height: 50px;
        margin: auto;
      }
    }
  }
</style>
