<template>
  <el-select
    :clearable="clearable"
    v-bind="$attrs"
    v-on="$listeners"
    @change="handleChange"
  >
    <template>
      <slot>
        <el-option
          v-for="(item, $index) in (list || options)"
          :key="$index"
          :label="item.label"
          :value="item.value"
        />
      </slot>
    </template>
  </el-select>
</template>
<script>
export default {
  name: 'BaseSelect',
  components: {},
  props: {
    clearable: {
      type: Boolean,
      default: true
    },
    context: {
      required: false,
      type: Object,
      default: function() {
        return Object.create(null)
      },
      validator: function(val) {
        return val
      }
    },
    api: {
      type: Function,
      default: function() {
        return []
      }
    },
    list: {
      type: Array,
      default: function() {
        return null
      }
    },
    queryParams: {
      type: [String, Number, Object],
      default: null
    }
  },
  data() {
    return {
      options: []
    }
  },
  created() {
    this.context && this.initOptions()
  },
  methods: {
    handleChange(val) {
      this.$emit('getObj', this.getItemByValue(val))
    },
    getItemByValue(val) {
      const result = this.options.find(item => item.value === val)
      return result ? result.item : val
    },
    async initOptions() {
      this.options = await this.api.call(this.context, this.queryParams)
    }
  }
}
</script>

<style scoped>
</style>
