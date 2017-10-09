<template lang="html">
<div class="ueditor">
  <script ref="editor" id="ue-container" name="content" type="text/plain">
  </script>
</div>
</template>

<script>
import '@/../static/ueditor/ueditor.config.js'
import '@/../static/ueditor/ueditor.all.js'
import '@/../static/ueditor/lang/zh-cn/zh-cn.js'

export default {
  name: 'ueditor',
  data() {
    return {
      ready: false,
      _content: '',
      ue: {},
    }
  },
  props: {
    value: String,
    content: String,
  },
  watch: {
    'content'(newVal, oldVal) {
      if (this.ready) {
        if (newVal !== this._content) {
          this._content = newVal
          this.ue.setContent(newVal)
        }
      } else {

      }
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.ue = null
    this.ready = false
  },
  created() {
  },
  methods: {
    init() {
      if (!this.$el) {
        return
      }
      this.ue = UE.getEditor(this.$refs.editor, {
        BaseUrl: '',
        UEDITOR_HOME_URL: '/static/ueditor/',
      })

      this.ue.ready(() => {
        this.ready = true
        this.$emit('ready', this.ue)

        if (this.content || this.value) this.ue.setContent(this.content || this.value)

      })

      this.ue.addListener('contentChange', () => {
        // const html = this.ue.iframe.contentDocument.body.innerHTML
        const html = this.ue.getContent()

        if (html === '<p><br></p>')
          this._content = ''
        else
          this._content = html

        this.$emit('contentChange', this._content)
      })
    },
  }
}
</script>

<style lang="scss">
.ueditor {
  max-width: 100%;
}
</style>
