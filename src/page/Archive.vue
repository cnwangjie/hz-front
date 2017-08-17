<template lang="html">
<div>
  <navbar></navbar>
  <div class="container main">

    <div class="row">
      <div class="col-sm-offset-1 col-sm-7">
        <div v-for="article in articles" class="archives">
          <router-link :to="`article/${article.id}`">
            <strong class="archive">{{ article.title }}</strong>
          </router-link>
        </div>

        <button class="btn" v-show="page > 0" v-on:click="page -= 1">上一页</button>
        <button class="btn" v-show="articles.length === 30" v-on:click="page += 1">下一页</button>
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
import {getLastestArticle} from './../service/getData'

export default {
  data() {
    return {
      articles: [],
      page: 0,
    }
  },
  components: {
    sidebar,
    navbar,
    foot
  },
  watch: {
    'page': 'getData'
  },
  created() {
    window.document.title = '首页 | 徽州文化服务云平台'
    this.getData()
  },
  methods: {
    getData() {
      getLastestArticle({page: this.page, size: 30}).then(obj => {
        this.articles = obj
      })
    }
  }
}
</script>

<style lang="scss">

body {
  font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  background: #d7d6d2;
}

.main {
  margin-top: 40px;
}

.archives {
  padding: 10px;
  .archive {
    color: black;
  }
}

</style>
