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
      <template slot="layout-search">
        <base-form :inline="true" :model="QueryParams" :rules="QueryParamsRules" :show-default-foot="false">
          <el-form-item>
            <base-date-picker
              v-model="QueryParams.timeRange"
              type="daterange"
              :default-time="['00:00:00', '23:59:59']"
              placeholder="请选择配送日期"/>
          </el-form-item>
          <el-form-item>
            <delivery-time-select v-model="QueryParams.distributionTypes" multiple placeholder="请选择送时间段"/>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <el-button type="primary" @click="Mixins_$Search">
            查询
          </el-button>
        </base-form>
      </template>
      <template slot="layout-operate">
        <el-button type="primary" @click="Mixins_$ExportExcel()">
          导出excel
        </el-button>
      </template>
    </base-table-layout>
  </div>
</template>
<script>
import { Mixins } from '@/mixins/mixins'
import ApiObject from '../../../api/module/trade/TradeOfMemberOrderApi'
import deliveryTimeSelect from '@/views/components/Select/deliveryTimeSelect'
import { mapGetters } from 'vuex'

export default {
  name: 'Account',
  components: { deliveryTimeSelect },
  mixins: [Mixins],
  data() {
    const date = new Date()
    return {
      ApiObject: ApiObject,
      Headers: [
        { type: 'index', label: '序号' },
        { label: '配送日期', prop: 'distributionDate' },
        { label: '订单金额', prop: 'orderAmount' },
        { label: '实收金额', prop: 'discountAmount' }
      ],
      QueryParams: {
        timeRange: [this.$Contants.getDateTime(new Date(date - 1000 * 60 * 60 * 24 * 30)),
          this.$Contants.getDateTime(new Date())],
        distributionTypes: []
      },
      QueryParamsRules: {
        distributionDate: [{ required: true, message: '必填项不能为空' }]
      }
    }
  },
  computed: {
    Mixins_PageApi() {
      return this.ApiObject.subtotalSale
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    Mixins_ExportApi() {
      return ApiObject.export
    },
    // 获取最终查询条件
    Mixins_GetFinalQueryParams(data) {
      return { businessId: this.userInfo.id, ...data }
    }
  }
}
</script>
