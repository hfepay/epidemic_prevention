<template>
  <el-form
    :ref="alias"
    :model="form"
    label-width="auto"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-for="(formheader, $index) in formHeaders">
      <!--自定义插槽-->
      <template v-if="formheader.slot">
        <slot :name="formheader.slot" />
      </template>
      <base-form-item
        v-else
        :key="$index"
        :formheader="formheader"
        :model="form"
      />
    </template>
    <slot />
    <slot name="foot">
      <el-form-item v-if="showDefaultFoot" style="text-align: center">
        <slot name="btn-before" />
        <el-button type="primary" @click="submit(alias)">
          {{ confirmBtnText }}
        </el-button>
        <slot name="btn-middle" />
        <!--<el-button @click="resetFields('form')">重置</el-button>-->
        <el-button v-if="showCancel" @click="cancel">
          {{ cancelBtnText }}
        </el-button>
        <slot name="btn-after" />
      </el-form-item>
    </slot>
  </el-form>
</template>

<script>
import BaseFormItem from './BaseFormItem'
export default {
  name: 'BaseForm',
  components: { BaseFormItem },
  props: {
    model: {
      type: Object,
      default: function() {
        return {}
      }
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    showDefaultFoot: {
      type: Boolean,
      default: true
    },
    alias: {
      type: String,
      default: 'form'
    },
    formHeaders: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      form: this.model
    }
  },
  watch: {
    model: {
      handler(newVal, oldVal) {
        this.form = newVal
      }
    }
  },
  methods: {
    cancel() {
      this.resetFields(this.alias)
      this.$emit('cancel')
    },
    submit(formName = this.alias) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submit')
        } else {
          this.$emit('submitError')
          return false
        }
      })
    },
    validateElement(val) { this.$refs[this.alias].validateElement(val) },
    validateField(val) { this.$refs[this.alias].validateField(val) },
    resetFields(formName = this.alias) { this.$refs[formName].resetFields() },
    clearValidate(val) { this.$refs[this.alias].clearValidate(val) }
  }
}
</script>

<style lang="scss">
</style>
