/* var ary = [1, 2, 3, [4, [5, [6]]]]
// 只要有一个元素有数组，那么循环继续
while (ary.some(Array.isArray)) {
  console.log(ary)
  ary = [].concat(...ary)
}
console.log(ary)*/

const arr = [
  {
    'id': 1,
    'num': 0,
    'simpleName': 'hhh123',
    'fullName': '123123',
    'describle': 'hahahaha',
    'hasChildren': 1,
    'children': [
      {
        'id': 14,
        'num': 123123123,
        'simpleName': '123',
        'fullName': '123',
        'describle': '123',
        'hasChildren': 1,
        'pid': 1,
        'children': [
          {
            'id': 15,
            'num': 123123123,
            'simpleName': '123',
            'fullName': '123',
            'describle': '123',
            'hasChildren': 1,
            'children': null,
            'pid': 14
          }
        ]
      }
    ],
    'pid': 0
  },
  {
    'id': 10,
    'num': 123,
    'simpleName': '1',
    'fullName': '1111',
    'describle': '123123',
    'hasChildren': 1,
    'children': [],
    'pid': 0
  },
  {
    'id': 13,
    'num': 123,
    'simpleName': '123',
    'fullName': '123',
    'describle': '123',
    'hasChildren': 1,
    'children': [],
    'pid': 0
  }
]
console.log(JSON.stringify(formatChildren(arr)))
function formatChildren(arr) {
  return arr.map(item => {
    if (item.children && item.children.length) {
      return {
        label: item.simpleName,
        value: item.id,
        children: formatChildren(item.children)
      }
    } else {
      return {
        label: item.simpleName,
        value: item.id
      }
    }
  })
}

var decodeString = function(s) {
  // 从第 0 个元素开始处理
  return dfs(s, 0)
}

const dfs = (s, n) => {
  let res = ''
  // 保存起始索引
  let i = n
  // 同上，表示重复的次数
  let multi = 0
  while (i < s.length) {
    const cur = s.charAt(i)
    // 遇到数字，累积 multi 值
    if (cur >= '0' && cur <= '9') { multi = multi * 10 + (cur - '0') } else if (cur === '[') {
      // 划重点！给子程序，把对应的 ] 索引和括号包裹的字符串返回
      // 即tmp 的格式为 [索引，字符串]
      const tmp = dfs(s, i + 1)
      // 这样下次遍历就是从对应的 ] 后面遍历了，因为当前已经把括号里面的处理完了
      i = tmp[0]
      // 需要重复的字符串已经返回来了
      const repeatStr = tmp[1]
      for (let j = 0; j < multi; j++) {
        res += repeatStr
      }
      // 当前已经把括号里面的处理完，multi 置零，为下一轮遍历准备
      multi = 0
    } else if (cur === ']') {
      // 遇到了对应的 ] ，返回 ] 索引和括号包裹的字符串
      return [i, res]
    } else {
      res += cur
    }
    // 继续遍历
    i++
  }
  return res
}

console.log(decodeString('3[a]2[bc]'))
// console.log(decodeString('3[a2[c]]'))
// console.log(decodeString('2[abc]3[cd]ef'))

