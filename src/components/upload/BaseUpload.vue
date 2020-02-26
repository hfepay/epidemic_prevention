<template>
  <div>
    <el-upload
      ref="upload"
      v-bind="$attrs"
      :show-file-list="showFileList"
      :accept="accept"
      :class="{hide:!limit && hideUpload}"
      :http-request="uploadCompressImg"
      :action="action"
      :limit="limit"
      :on-preview="preview"
      :on-remove="remove"
      :on-success="success"
      :on-error="error"
      :on-progress="progress"
      :on-change="change"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :on-exceed="exceed"
      v-on="$listeners"
    >
      <template slot="trigger">
        <slot name="trigger" />
      </template>
      <slot>
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </slot>
      <template slot="tip">
        <slot name="tip" />
      </template>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { uploadCompressImg } from '../../utils/upload'
export default {
  name: 'BaseUpload',
  components: {},
  props: {
    beforeUpload: {
      type: Function,
      default: function(file) {
        if ((file.type).indexOf('image/') == -1 && this.accept == 'image/*') {
          this.$message.error('请上传图片')
          return false
        }
        const size = this.$parent.$parent.fileSize
        if (size && file.size > size * 1000 * 1000) {
          this.$message.error(`上传图片不能超过${size}M`)
          return false
        }
        return true
      }
    },
    fileSize: {
      type: Number,
      default: 5
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    showFileList: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Array],
      default: ''
    },
    limit: {
      type: Number,
      default: 0
    },
    action: {
      type: String,
      default: 'file/upload'
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      hideUpload: false,
      uploadCompressImg: uploadCompressImg,
      imageUrl: this.value ? this.$utils.imgWrapper(this.value) : this.value
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  activated() {},
  methods: {
    // 更新父组件绑定value
    updateParentData(fileList) {
      this.$emit('input', this.getFileUrl(fileList))
    },
    getFileUrl(fileList) {
      return fileList.map(item => item.response ? item.response.data : this.$utils.imgWrapperRevert(item.url)).join()
    },
    preview(file) {
      if (file.raw.type.indexOf('image/') !== -1) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
        this.$emit('preview', file)
      }
    },
    remove(file, fileList) {
      if (file.status === 'success') {
        this.updateParentData(fileList)
      }
      this.setHideClass(fileList)
      this.$emit('remove', file, fileList)
    },
    setHideClass(fileList) {
      this.hideUpload = fileList.length >= this.limit
    },
    success(response, file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.updateParentData(fileList)
      this.$emit('success', response, file, fileList)
    },
    error(err, file, fileList) {
      this.$emit('error', err, file, fileList)
    },
    progress(event, file, fileList) {
      this.$emit('progress', event, file, fileList)
    },
    change(file, fileList) {
      this.setHideClass(fileList)
      this.$emit('change', file, fileList)
    },
    beforeRemove(file, fileList) {
      // return this.$confirm(`确定移除 ${ file.name }？`);
      return true
    },
    exceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    clearFiles() {
      this.imageUrl = ''
      this.$refs['upload'].clearFiles()
    },
    abort() {
      this.$refs['upload'].abort()
    },
    submit() {
      this.$refs['upload'].submit()
    }
  }
}
</script>
<style>
  .hide .el-upload--picture-card {
    display: none;
  }
</style>
<style lang="scss" scoped>
  $uploadsize:100px;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border: 1px solid #ececec;
    font-size: 28px;
    color: #8c939d;
    width: $uploadsize;
    height: $uploadsize;
    line-height: $uploadsize;
    text-align: center;
  }
  .avatar {
    width: $uploadsize;
    height: $uploadsize;
    display: block;
  }
</style>
