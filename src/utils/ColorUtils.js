
// 取反色
export function reverseColor(color) {
  const regex = /#(?<R>.{2})(?<G>.{2})(?<B>.{2})/
  if (regex.test(color)) {
    const { groups: { R, G, B }} = regex.exec(color)
    const reserveR = reverseSingleColor(R)
    const reserveG = reverseSingleColor(G)
    const reserveB = reverseSingleColor(B)
    return `#${reserveR}${reserveG}${reserveB}`
  }
  throw new Error('color invalid')
}

function reverseSingleColor(color) {
  // 1.16进制转10进制
  // 2. 255 - 10进制数
  // 3. 第二步的数转16进制返回
  return (255 - (parseInt(color, 16))).toString(16).padStart(2, 0)
}
