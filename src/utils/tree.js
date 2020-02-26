function toTreeData(data) {
  const parentData = data.filter(item => !item.pid).map(item => {
    return {
      ...item,
      children: []
    }
  })
  const childrenData = data.filter(item => item.pid)
  run(parentData)
  function run(data) {
    if (childrenData.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const parent = data[i]
        if (!parent.children) {
          parent.children = []
        }
        for (let j = 0; j < childrenData.length; j++) {
          const children = childrenData[j]
          if (children.pid === parent.id) {
            childrenData.splice(childrenData.indexOf(children), 1)
            parent.children.push(children)
            j--
          }
        }
        run(parent.children)
      }
    }
  }
  return parentData
}

export default toTreeData
