<template lang="html">
    <div class="row">
      <div class="col-sm-offset-1 col-sm-7">
        <h1 style="color:gray" v-if="articles.length == 0">没有找到包含 {{ word }} 的文章</h1>
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
</template>

<script>
import sidebar from './Sidebar'
import {getArticleContains} from './../service/getData'

export default {
  data() {
    return {
      articles: [],
      page: 0,
      word: ''
    }
  },
  components: {
    sidebar
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
      getArticleContains(word).then(obj => {
        obj.map(i => {
          if (i.content.length > 200) {
            i.content = i.content.replace(/<[^<>]+>/ig, '').substr(0, 200) + '...'
          }
        })
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
    line-height: 20px;
    background: #d7d6d2;
    padding: 0 8px;
    font-size: 23px;
    font-weight: 500;
    transition: .2s;
    cursor: pointer;
    &:hover {
      transition: .2s;
      color: rgba(0, 0, 0, 0.5);
    }
  }
  .content {
    text-indent: 25px;
    padding: 20px 40px 0;
  }
}

</style>
