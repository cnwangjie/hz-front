<template lang="html">
<div>
  <navbar></navbar>

  <blank></blank>

  <div class="container main">
    <div class="row">
      <div class="col-sm-offset-1 col-sm-7">
        <h1 style="color:gray" v-if="articles.length == 0">{{ msg }}</h1>
        <div v-for="article in articles" class="article-list">
          <router-link :to="`article/${article.id}`">
            <div class="head">
              <strong>{{ article.title }}</strong>
            </div>
          </router-link>
          <div class="content">
            {{ article.content }}
          </div>
        </div>
      </div>
      <sidebar></sidebar>
    </div>
  </div>
  <foot></foot>
</div>
</template>

<script>
import sidebar from './../components/Sidebar'
import navbar from './../components/Navbar'
import blank from './../components/Blank'
import foot from './../components/Foot'
import {getArticleContains} from './../service/getData'

export default {
  data() {
    return {
      articles: [],
      page: 0,
      word: '',
      msg: ''
    }
  },
  components: {
    sidebar,
    navbar,
    foot,
    blank,
  },
  watch: {
    '$route': 'searchArticle'
  },
  created() {
    this.searchArticle()
  },
  methods: {
    searchArticle() {
      this.word = this.$route.query.word
      let word = this.word
      if (!word) return
      this.msg = '搜索中...'
      getArticleContains(word).then(obj => {
        if (obj.length && obj.length > 0) {
          obj.map(i => {
            if (i.content.length > 200) {
              i.content = i.content.replace(/<[^<>]+>/ig, '').substr(0, 200) + '...'
            }
          })
        } else {
          this.msg = `没有找到包含"${this.word}"的文章`
        }
        window.document.title = `${this.word} 的搜索结果`
        this.articles = obj
      })
    }
  }
}
</script>

<style lang="scss">

.article-list {
  margin-bottom: 50px;
  padding-bottom: 50px;
  border-bottom: 1px solid rgba(180, 180, 180, 0.5);
  .date {
    color: #999;
    float: right;
    padding-right: 60px;
  }
  .head {
    text-align: left;
    position: relative;
    top: 10px;
    left: 20px;
    width: 100%;
    min-height: 20px;
    line-height: 24px;
    padding: 0 8px;
    font-size: 23px;
    font-weight: 500;
    transition: .2s;
    cursor: pointer;
    color: black;
    &:hover {
      transition: .2s;
      color: rgba(0, 0, 0, 0.5);
    }
  }
  @media (max-width: 768px) {
    margin-bottom: 25px;
    padding-bottom: 25px;
    .head {
      left: 0;
      padding: 0;
    }
    .content {
      padding: 20px 0 0;
    }
  }
  .content {
    text-indent: 25px;
    padding: 20px 40px 0;
  }
}

</style>
