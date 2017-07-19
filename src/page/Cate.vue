<template lang="html">
<div>
  <navbar></navbar>
  <div class="container main">
    <div class="row">
      <div class="col-sm-offset-1 col-sm-7">
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
import foot from './../components/Foot'
import {getCateArticle} from './../service/getData'
export default {
  data() {
    return {
      articles: []
    }
  },
  created() {
    this.getArticle()
  },
  methods: {
    getArticle() {
      getCateArticle(this.$route.params.id).then(obj => {
        if (obj.length === 0) {
          this.$router.replace('/')
        } else {
          this.articles = obj
        }
      })
    }
  },
  components: {
    sidebar,
    navbar,
    foot
  }
}
</script>

<style lang="css">

body {
  font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  background: #d7d6d2;
}

.main {
  margin-top: 40px;
}

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
