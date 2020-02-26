/**
 * 全局过滤器
 * @type {{}}
 */
// 默认值
const aspectAfter = (val) => {
  return val || ''
}

const filter = {
  thousandFilter: val => (+val || 0).toString().replace(/^-?\d+/g, m => m.replace(/\B(?=(\d{3})+(?!\d))/g, ','))
}

export default filter
