const fs = require('fs')
// 分隔符
const SPLIT_FLAG = '\\'
const File = {
  /**
   * 生成对应文件夹及文件
   * @param path
   * @param data
   */
  mkdirFile: function(path, data) {
    const p = []
    const pathArr = path.split(SPLIT_FLAG)
    while (pathArr.length > 0) {
      p.push(pathArr.shift())
      if (pathArr.length === 0) {
        this.mkFile(p, data)
      } else {
        if (!fs.existsSync(p.join(SPLIT_FLAG))) {
          fs.mkdirSync(p.join(SPLIT_FLAG))
        }
      }
    }
  },
  existFile: function(path) {
    return fs.existsSync(path)
  },
  /**
   * 生成文件
   * @param p
   * @param data
   */
  mkFile: function(p, data) {
    if (this.existFile(p.join(SPLIT_FLAG))) {
      console.log('文件已存在，是否覆盖?(y:覆盖,其它:取消)')
      // 如果已经存在，询问用户是否覆盖
      process.stdin.on('data', async chunk => {
        const choose = String(chunk).trim().toLowerCase().toString()
        if (choose === 'y') {
          // 创建文件
          this.writeFile(p.join(SPLIT_FLAG), data)
          console.log(`覆盖成功`)
        } else {
          console.log('放弃覆盖')
        }
        process.exit()
      })
    } else {
      this.writeFile(p.join(SPLIT_FLAG), data)
    }
  },
  /**
   * 输出
   * @param path
   * @param data
   */
  writeFile: function(path, data) {
    fs.writeFileSync(path, data)
    console.log('生成文件成功')
  }
}

module.exports = {
  File
}
