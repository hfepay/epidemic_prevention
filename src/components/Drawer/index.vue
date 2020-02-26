<template>
  <el-drawer v-bind="$attrs" v-on="$listeners">
    <div style="padding: 0 20px 20px">
      <slot />
      <slot v-if="showFoot" name="foot">
        <el-button @click="$emit('update:visible', false)">
          取 消
        </el-button>
        <el-button type="primary" @click="submit">
          确 定
        </el-button>
      </slot>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'BaseDrawer',
  props: {
    showFoot: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    submit() {
      this.$emit('submit')
    }
  }
}
</script>

<style scoped>

</style>
