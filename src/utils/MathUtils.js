import { flat } from './ArrayUtils'
import { Decimal } from 'decimal.js'
/**
 *
 * @param arg: string|number|array
 * @returns {*}
 */
window.Decimal = Decimal
export const getSum = (...arg) => {
  const sum = flat(arg)
    .filter(Boolean)
    .map(Decimal)
    .reduce((cur, val) => cur.add(val), new Decimal(0))
  return Decimal.isDecimal(sum) ? sum.toNumber() : sum
}
