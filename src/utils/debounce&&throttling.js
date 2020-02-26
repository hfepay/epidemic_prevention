export function debounce(fn, interval = 500) {
  let timer, args, context, result
  timer = args = context = result = null
  return function() {
    context = this
    args = arguments
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      result = fn.apply(context, args)
    }, interval)
    return result
  }
}

export function throttling(fn, interval = 3000) {
  let args, context
  args = context = null
  let start = Date.now()
  return function() {
    context = this
    args = arguments
    const now = Date.now()
    // 大于节流时间，执行
    if (now - start > interval) {
      start = now
      return fn.apply(context, args)
    }
  }
}
