import request from './request'
import EXIF from 'exif-js'
import { Loading } from 'element-ui'
function photoCompress(file, w, objDiv) {
  let Orientation
  EXIF.getData(file, function() {
    Orientation = EXIF.getTag(file, 'Orientation')
    const ready = new FileReader()
    /* 开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
    ready.readAsDataURL(file)
    ready.onload = function() {
      const re = this.result
      canvasDataURL(re, w, objDiv, Orientation)
    }
  })
}
function canvasDataURL(path, obj, callback, Orientation) {
  const img = new Image()
  img.src = path
  img.onload = function() {
    const that = this
    // 默认按比例压缩
    let w = that.width

    let h = that.height

    let scale = w / h
    // 大于1M,采用1920*1080为最大尺寸图片等比压缩
    const length = that.src.substring(23).length
    const size = parseInt(length - (length / 8) * 2)
    const lt1M = size / 1024 / 1024 > 1
    if (lt1M && (w > 1920 || h > 1080)) {
      scale = Math.max(w / 1920, h / 1080).toFixed(2)
      w = ((obj.width || w) / scale).toFixed(2)
      h = ((obj.height || h) / scale).toFixed(2)
      console.log('width:' + w)
      console.log('height:' + h)
    } else {
      w = obj.width || w
      h = obj.height || (w / scale)
      console.log('width:' + w)
      console.log('height:' + h)
    }

    let quality = 0.7 // 默认图片质量为0.7
    // 生成canvas
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    // 创建属性节点
    const anw = document.createAttribute('width')
    anw.nodeValue = w
    const anh = document.createAttribute('height')
    anh.nodeValue = h
    canvas.setAttributeNode(anw)
    canvas.setAttributeNode(anh)
    ctx.drawImage(that, 0, 0, w, h)
    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality
    }
    // 修复ios上传图片的时候 被旋转的问题
    if (Orientation && Orientation != 1) {
      switch (Orientation) {
        case 6:// 需要顺时针（向左）90度旋转
          rotateImg(this, 'left', canvas)
          break
        case 8:// 需要逆时针（向右）90度旋转
          rotateImg(this, 'right', canvas)
          break
        case 3:// 需要180度旋转
          rotateImg(this, 'right', canvas)// 转两次
          rotateImg(this, 'right', canvas)
          break
      }
    }
    // quality值越小，所绘制出的图像越模糊
    const base64 = canvas.toDataURL('image/jpeg', quality)
    // 回调函数返回base64的值
    callback(base64)
  }
}
/**
 * 将以base64的图片url数据转换为图片
 * @param urlData
 *            用url方式表示的base64图片数据
 */
function convertBase64UrlToFile(dataurl, filename) {
  const arr = dataurl.split(',')

  const mime = arr[0].match(/:(.*?);/)[1]

  const bstr = atob(arr[1]); let n = bstr.length

  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

function rotateImg(img, direction, canvas) { // 图片旋转
  const min_step = 0
  const max_step = 3
  if (img == null) return
  const height = img.height
  const width = img.width
  let step = 2
  if (step == null) {
    step = min_step
  }
  if (direction == 'right') {
    step++
    step > max_step && (step = min_step)
  } else {
    step--
    step < min_step && (step = max_step)
  }
  const degree = step * 90 * Math.PI / 180
  const ctx = canvas.getContext('2d')
  switch (step) {
    case 0:
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0)
      break
    case 1:
      canvas.width = height
      canvas.height = width
      ctx.rotate(degree)
      ctx.drawImage(img, 0, -height)
      break
    case 2:
      canvas.width = width
      canvas.height = height
      ctx.rotate(degree)
      ctx.drawImage(img, -width, -height)
      break
    case 3:
      canvas.width = height
      canvas.height = width
      ctx.rotate(degree)
      ctx.drawImage(img, -width, 0)
      break
  }
}

export const uploadCompressImg = (req) => {
  return new Promise((resolve, reject) => {
    const file = req.file
    const type = file.type
    const url = req.action
    // 不压缩图片
    resolve(upload(file, url))
    return
    if (!type.includes('image')) { // 如果不是图片
      resolve(upload(file, url))
      return
    }
    console.log('压缩前:' + file.size / 1024)
    // 图片小于500KB采用0.85压缩,否则采用0.7压缩)
    photoCompress(file, {
      quality: file.size / 1024 > 500 ? 0.7 : 0.85
    }, function(base64Codes) {
      const bl = convertBase64UrlToFile(base64Codes, file.name)
      console.log('压缩后:' + bl.size / 1024)
      resolve(upload(bl, url))
    })
  })
}
const upload = (file, url) => {
  return new Promise((resolve, reject) => {
    const param = new FormData() // 创建form对象
    param.append('file', file)// 通过append向form对象添加数据
    param.append('source', 'admin')// 通过append向form对象添加数据
    Loading.service({ fullscreen: true, text: '上传中', customClass: 'onload' })
    request.post(url, param, { 'Content-Type': 'multipart/form-data' })
      .then(response => {
        Loading.service({}).close()
        resolve(response)
      })
      .catch(e => {
        Loading.service({}).close()
        console.log(e)
        reject(e)
      })
  })
}
