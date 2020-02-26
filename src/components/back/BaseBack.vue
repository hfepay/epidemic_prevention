<template>
  <el-button v-bind="$attrs" :type="type" @click="$router.go(-1)" v-on="$listeners">
    返回
  </el-button>
</template>
<script>
export default {
  name: 'BaseBack',
  components: {},
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  activated() {},
  methods: {}
}
</script>

<style scoped>
</style>
