<template>
  <transition>
    <!--复选框-->
    <el-table-column v-if="col.type == 'selection'" type="selection" v-bind="col" />
    <!--序号-->
    <el-table-column v-else-if="col.type == 'index'" type="index" label="序号" />
    <!--展开行-->
    <el-table-column v-else-if="col.type == 'expand'" type="expand">
      <template slot-scope="scope">
        <slot :name="col.slot" :scope="scope" />
      </template>
    </el-table-column>
    <el-table-column
      v-else
      :prop="col.prop"
      :show-overflow-tooltip="col.tooltip"
      :align="col.align"
      :label="col.label"
      :width="col.width"
      :min-width="col.minWidth"
      :fixed="col.fixed"
      :class-name="col.className"
    >
      <template v-if="!col.children" slot-scope="scope">
        <!--默认显示文本-->
        <template v-if="!col.slot">
          {{ getText(scope.row,col) }}
        </template>
        <!--显示自定义内容-->
        <slot v-else :name="col.slot" :scope="scope" />
      </template>
      <!--如果是复杂表头-->
      <template v-for="(children,$index) in col.children">
        <table-column :key="`${$index}`" :col="children">
          <template v-if="children.slot" :slot="children.slot" slot-scope="{scope}">
            <slot :name="children.slot" :scope="scope" />
          </template>
        </table-column>
      </template>
    </el-table-column>
  </transition>
</template>

<script>
export default {
  name: 'TableColumn',
  props: {
    col: {
      type: Object, required: true
    }
  },
  computed: {
    getText() {
      return (obj, col) => {
        const { prop, format } = col
        return this.getFinalText(format ? this.$utils.isFunction(format) ? format.call(this, obj) : format[this.getValueByKeys(obj, prop)] : this.getValueByKeys(obj, prop), col)
      }
    }
  },
  methods: {
    getFinalText(text, col = {}) {
      const { prefix, suffix, emptyText } = col
      let newText = text
      prefix && (newText = `${prefix}${text}`)
      suffix && (newText = `${text}${suffix}`)
      return text ? newText : emptyText || ''
    },
    getValueByKeys(obj, keys) {
      let res = ''
      if (this.isString(keys)) {
        const keyArr = keys.split(',')
        res = this.getValueByKeyArr(obj, keyArr)
      }
      return res
    },
    getValueByKeyArr(obj, keyArr) {
      for (let i = 0; i < keyArr.length; i++) {
        obj = obj[keyArr[i]]
        // 防止报空
        if (!obj) {
          break
        }
      }
      return obj
    },
    isString(s) {
      return toString.call(s) === '[object String]'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
