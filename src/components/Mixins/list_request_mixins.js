export default {
  props: {
    context: {
      type: Object,
      default: null,
      validator: function(val) {
        return val
      }
    },
    api: {
      type: Function,
      default: null
    },
    queryParams: {
      type: [String, Number, Object],
      default: function() {
        return {}
      }
    },
    list: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      // 后台接口拿的list
      responceList: null
    }
  },
  created() {
    // list 优先级  props > api
    this.api && !this.list && this.initList()
  },
  methods: {
    async initList() {
      this.responceList = await this.api.call(this.context, this.queryParams)
    },
    formatStrList(list) {
      return list.map(item => this.$utils.isString(item) ? { label: item, value: item } : item)
    }
  },
  computed: {
    finalList() {
      return this.formatStrList(this.list || this.responceList || [])
    }
  }
}
