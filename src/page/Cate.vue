<template lang="html">
<div>
  <navbar></navbar>
  <div class="container main">
    <div class="row">
      <div class="col-sm-offset-1 col-sm-7">
        <div class="cate-name">{{ cate }}</div>
        <div v-for="article in articles" class="cate-article-list">
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
import {getCateArticle, getAllCates} from './../service/getData'
export default {
  data() {
    return {
      articles: [],
      cate_id: this.$route.params.cate_id,
      cate: '',
    }
  },
  created() {
    this.getArticle()
    this.getThisCateName()
  },
  methods: {
    getArticle() {
      getCateArticle(this.cate_id).then(obj => {
        if (obj.length === 0) {
          this.$router.replace('/')
        } else {
          obj.map(i => {
            if (i.content.length > 200) {
              i.content = i.content.replace(/<[^<>]+>/ig, '').substr(0, 200) + '...'
            }
            this.articles.push(i)
          })
        }
      })
    },
    getThisCateName() {
      getAllCates().then(obj => {
        obj.map(i => {
          if (i.id == this.cate_id) {
            this.cate = i.name
          }
        })
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

.main {
  margin-top: 40px;
}

.cate-name {
  font-size: 40px;
  margin-bottom: 10px;
}

.cate-article-list {
  margin-bottom: 30px;
  padding-bottom: 20px;
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
