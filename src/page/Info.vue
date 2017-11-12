<template lang="html">
<div>
  <navbar></navbar>

  <blank></blank>

  <div class="zhuye">
    <div class="container">

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
          <button class="btn btn-lg center-block loadmore" v-on:click="getData()">加载更多</button>
        </div>
        <sidebar></sidebar>
      </div>

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
import {getLastestArticle} from './../service/getData'
import {mapState, mapMutations} from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['articles'])
  },
  components: {
    sidebar,
    navbar,
    blank,
    foot,
  },
  created() {
    window.document.title = '首页 | 徽州文化服务云平台'
    if (this.articles.length === 0) this.getData()
  },
  methods: {
    getData() {
      const page = this.articles.length / 10 << 0
      getLastestArticle({page: page}).then(obj => {
        obj.map(i => {
          if (i.content.length > 200) {
            i.content = i.content.replace(/<[^<>]+>/ig, '').substr(0, 200) + '...'
          }
          this.articles.push(i)
        })
      })
    }
  }
}
</script>

<style lang="scss">

.article-list {
  padding-top: 40px;
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
  .content {
    text-indent: 25px;
    padding: 20px 40px 0;
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
}
.loadmore {
  margin-bottom: 20px;
}

</style>
