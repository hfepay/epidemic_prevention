<template>
  <div
    :class="{ fullscreen: fullscreen }"
    class="tinymce-container editor-container"
  >
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container">
      <!--<base-upload
        class="editor-upload-btn"
        :show-file-list="false"
        accept="video/*"
        @success="videoUploadSuccess"
      >
        <el-button type="primary">
          上传视频
        </el-button>
      </base-upload>-->
      <base-upload
        class="editor-upload-btn"
        :show-file-list="false"
        @success="uploadSuccess"
      >
        <el-button type="primary">
          上传图片
        </el-button>
      </base-upload>
      <!--<editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />-->
    </div>
  </div>
</template>

<script>
// import editorImage from './components/editorImage'
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'
const tinymceCDN =
  'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'
export default {
  name: 'Tinymce',
  // components: { editorImage },
  props: {
    id: {
      type: String,
      default: function() {
        return (
          'vue-tinymce-' +
          +new Date() +
          ((Math.random() * 1000).toFixed(0) + '')
        )
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        en: 'en',
        zh: 'zh_CN'
      }
    }
  },
  computed: {
    language() {
      // return this.languageTypeList[this.$store.getters.language]
      return 'zh_CN'
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || '')
        )
      }
    },
    language() {
      this.destroyTinymce()
      this.$nextTick(() => this.initTinymce())
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, err => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        relative_urls: false,
        remove_script_host: false,
        /* convert_urls: false,*/
        language: this.language,
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        /* imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],*/
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', e => {
            _this.fullscreen = e.state
          })
        }
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    uploadSuccess(response, file, fileList) {
      this.imageSuccessCBK(this.$utils.imgWrapper(response.data))
    },
    videoUploadSuccess(response, file, fileList) {
      const url = this.$utils.getVideoFullUrl(response.data)
      window.tinymce.get(this.tinymceId).insertContent(this.getVideoHtml(url))
    },
    imageSuccessCBK(url) {
      window.tinymce.get(this.tinymceId).insertContent(this.getImageHtml(url))
    },
    getImageHtml(url) {
      return `<img class="wscnph" src="${url}" style="max-width: 100%">`
    },
    getVideoHtml(src) {
      return `<p>
               <span class="mce-preview-object mce-object-video" contenteditable="false" data-mce-object="video" data-mce-p-allowfullscreen="allowfullscreen" data-mce-p-frameborder="no" data-mce-p-scrolling="no" data-mce-p-src=${src} data-mce-html="%20">
                 <video src=${src} width="100%" controls="controls"></video>
               </span>
            </p>`
    }
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container >>> .mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
  & + .editor-upload-btn {
    margin-left: 20px;
  }
}
</style>
