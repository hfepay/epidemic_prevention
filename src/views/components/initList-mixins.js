// 比较两个对象内的值是否相同
function looseEqual(a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a)
  var isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a)
      var isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function(e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a)
        var keysB = Object.keys(b)
        return keysA.length === keysB.length && keysA.every(function(key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

export default {
  props: {
    params: Object
  },
  data() {
    return {
      loading: false,
      ApiObject: null,
      list: []
    }
  },
  watch: {
    params: {
      deep: true,
      immediate: false,
      handler: function(newVal, oldVal) {
        if (!looseEqual(newVal, oldVal)) {
          this.initList()
        }
      }
    }
  },
  created() {
    this.initList()
  },
  methods: {
    async initList() {
      if (this.loading) {
        return
      }
      this.loading = true
      this.list = await this.ApiObject.getOptions(this.params)
      this.loading = false
    }
  }
}
