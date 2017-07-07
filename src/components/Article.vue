<template lang="html">
    <div class="row">
      <div class="col-sm-offset-1" v-bind:class="side ? 'col-sm-7' : 'col-sm-10'">
        <div class="article">
          <div class="article-head">
            <h3>{{ title }}</h3>
          </div>
          <div class="article-content" v-html="content">
          </div>
        </div>
      </div>
      <sidebar v-if="side"></sidebar>
    </div>
</template>

<script>
import sidebar from './Sidebar'
import {getArticle} from './../service/getData'

export default {
  data() {
    return {
      title: '',
      content: '',
      side: false
    }
  },
  watch: {
    '$route': 'loadArticle'
  },
  created() {
    window.document.title = `loading | 徽州文化服务云平台`
    this.loadArticle()
  },
  methods: {
    loadArticle() {
      getArticle(this.$route.params.id).then(obj => {
        if ('title' in obj) {
          this.title = obj.title
          this.content = obj.content
          window.document.title = `${obj.title} | 徽州文化服务云平台`
        } else {
          this.$router.go(-1)
        }
      })
    }
  },
  components: {
    sidebar
  }
}
</script>

<style lang="css">
.article {

}
.article-head {
  text-align: center;
  position: relative;
  top: 10px;
  min-width: 60px;
  height: 24px;
  line-height: 24px;
  background: #d7d6d2;
  padding: 0;
  word-wrap: break-word;
  font-size: 14px;
  font-weight: 500;
}
.article-content {
  padding: 32px 5px 12px;
}
img {
  max-width: 100%;
}
</style>
