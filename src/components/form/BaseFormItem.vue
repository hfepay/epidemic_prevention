<template>
  <div class="el-form-item base-item" :class="{'displayBlock': formheader.block}">
    <el-form-item
      v-bind="{...$attrs, ...formheader}"
      v-on="$listeners"
    >
      <!--显示文本-->
      <!--输入框-->
      <template v-if="formheader.slot">
        <slot :name="formheader.slot" />
      </template>
      <template v-if="formheader.type === 'text'">
        {{ form[formheader.prop] }}
      </template>
      <!--输入框-->
      <template v-else-if="isInputType(formheader.type || 'input')">
        <base-input
          v-model="form[formheader.prop]"
          v-bind="formheader"
        />
      </template>
      <!--下拉框-->
      <template v-else-if="(formheader.type) === 'select'">
        <el-select v-model="form[formheader.prop]">
          <el-option
            v-for="(option, index) in formheader.options"
            :key="index"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </template>
      <!--开关-->
      <template v-else-if="(formheader.type) === 'switch'">
        <el-switch v-model="form[formheader.prop]" v-bind="formheader" />
      </template>
      <!--多选框-->
      <template v-else-if="(formheader.type) === 'checkbox'">
        <el-checkbox-group v-model="form[formheader.prop]">
          <el-checkbox
            v-for="(option, index) in formheader.options"
            :key="index"
            :label="option.label"
            :value="option.value"
            :name="formheader.prop"
          />
        </el-checkbox-group>
      </template>
      <!--单选框-->
      <template v-else-if="(formheader.type) === 'radio'">
        <el-radio-group v-model="form[formheader.prop]">
          <el-radio
            v-for="(option, index) in formheader.options"
            :key="index"
            :label="option.value"
          >
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </template>
      <template v-else-if="(formheader.type) === 'timeSelect'">
        <base-time-select v-model="form[formheader.prop]" :options="formheader" />
      </template>
      <template v-else-if="formheader.type === 'timePicker' || formheader.type === 'time'">
        <base-time-picker v-model="form[formheader.prop]" :options="formheader" />
      </template>
      <template v-else-if="['datetimerange', 'daterange', 'datetime', 'date'].includes(formheader.type)">
        <base-date-picker v-model="form[formheader.prop]" v-bind="formheader" />
      </template>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'BaseFormItem',
  props: {
    formheader: {
      required: true,
      type: Object
    },
    model: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      inputTypeList: ['input', 'password', 'textarea', 'number'],
      form: this.model
    }
  },
  computed: {
    isInputType() {
      return function(type) {
        return this.inputTypeList.includes(type)
      }
    }
  },
  watch: {
    model: function(newVal) {
      this.form = newVal
    }
  }
}
</script>
<style lang="scss" scoped>
  .base-item {
    margin: 0;
    padding: 0;
  }
</style>

