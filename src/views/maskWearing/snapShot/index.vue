<template>
  <div>
    <!--table模板-->
    <base-table-layout
      :page-obj="Mixins_$PageObj"
      :headers="Headers"
      :data="Mixins_$TableData"
      @sizeChange="Mixins_$SizeChange"
      @currentChange="Mixins_$CurrentChange"
    >
      <template #layout-search>
        <base-form :inline="true" :model="QueryParams" :show-default-foot="false">
          <el-form-item label="摄像头：">
            <base-select v-model="QueryParams.name" placeholder="请选择摄像头" />
          </el-form-item>
          <el-form-item label="抓拍时间：">
            <base-date-picker type="daterange"></base-date-picker>
          </el-form-item>
          <el-button type="primary" @click="Mixins_$Search">
            查询
          </el-button>
        </base-form>
      </template>
      <template slot="faceImg" slot-scope="scope">
        <el-image
          style="width: 85px; height: 85px"
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-image>
      </template>
    </base-table-layout>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/account/AccountSysRoleApi'

export default {
  name: 'SnapShot',
  mixins: [Mixins],
  data() {
    return {
      QueryParamsHeaders: [
        { label: '角色名称', prop: 'roleName' }
      ],
      ApiObject: ApiObject,
      checkedKeys: [],
      treeOption: [],
      Headers: [
        { type: 'index', label: '序号' },
        { label: '人脸照片', slot: 'faceImg' },
        { label: '抓拍摄像头', prop: 'describle' },
        { label: '抓拍行为', prop: 'createTime' },
        { label: '抓拍时间', prop: 'createTime' }
      ],
      QueryParams: {
        roleName: ''
      }
    }
  }
}
</script>
<style lang="scss">
  #hfRoles .el-tree-node__children .el-tree-node__children {
    display: flex;
    flex-wrap: wrap;
  }
</style>
