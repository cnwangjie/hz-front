<template lang="html">
<div class="article-page zhuye">
  <navbar></navbar>
  <div class="page-height">
    <div class="container">
      <div class="row">
        <div class="col-sm-offset-1" v-bind:class="side ? 'col-sm-7' : 'col-sm-10'">
          <div class="article">
            <div class="article-head">
              <h2>{{ title }}</h2>
            </div>
            <div class="article-content" v-html="content">
            </div>
          </div>
        </div>
        <sidebar v-if="side"></sidebar>
      </div>
    </div>
  </div>


  <image-footer></image-footer>

</div>
</template>

<script>
import sidebar from './../components/Sidebar'
import navbar from './../components/Navbar'
import imageFooter from './../components/ImageFooter'
import {getArticle} from './../service/getData'
import {mapState, mapMutations} from 'vuex'


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
  components: {
    sidebar,
    navbar,
    imageFooter,
  },
  created() {
    window.document.title = `loading | 徽州文化服务云平台`
    this.loadArticle()
  },
  methods: {
    ...mapMutations(['readed']),
    loadArticle() {
      getArticle(this.$route.params.id).then(obj => {
        if ('title' in obj) {
          this.readed(obj)
          this.title = obj.title
          this.content = obj.content
          window.document.title = `${obj.title} | 徽州文化服务云平台`
        } else {
          this.$router.go(-1)
        }
      })
    }
  },
}
</script>

<style lang="scss">
.article-page {
  padding-top: 40px;
  .page-height {
    min-height: 100vh;
  }
  .container {
    background-color: #fff;
    margin-top: 60px;
    margin-bottom: 60px;
    max-width: 1200px;
    box-shadow: 0px 0px 20px black;
  }
  .article {
    padding: 40px 0;
  }
  .article-head {
    text-align: center;
    position: relative;
    top: 10px;
    min-width: 60px;
    padding: 24px;
    line-height: 24px;
    word-wrap: break-word;
    font-weight: 500;
  }
  .article-content {
    padding: 0;
  }
  img {
    max-width: 100%;
  }
}
</style>
