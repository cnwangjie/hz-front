<template lang="html">

<div class="col-sm-3 front-sidebar">
  <div class="block">
    <div class="block-head">
      搜索
    </div>
    <div class="block-content form-inline">
        <input type="text" class="form-control" placeholder="要搜索的关键词" v-model="word" style="width: 70%"></input>
        <button class="btn" style="background:#dddcd9" v-on:click="$router.push(word ? '/search?word=' + word : '')">搜索</button>
    </div>
  </div>
  <div class="block">
    <div class="block-head">
      推荐阅读
    </div>
    <div class="block-content form-inline">
      <ul class="suggest-list">
        <li v-for="article, index in suggest" v-if="index < suggestSum">
          <router-link :to="`article/${article.id}`">{{ article.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</div>

</template>

<script>
import {
  getRandomArticle,
  getCateArticle,
} from './../service/getData'
import {mapState, mapMutations} from 'vuex'

export default {
  data() {
    return {
      word: '',
      suggest: [],
      suggestSum: 5,
    }
  },
  computed: {
    ...mapState(['nearlyReaded']),
  },
  created() {
    this.getSuggestArticle(this.suggestSum)
  },
  methods: {
    async getSuggestArticle() {
      this.suggest = []
      const nearlyReadedCate = []
      this.nearlyReaded.map(article => {
        if ('cates' in article) {
          article.cates.map(cate => {
            if (nearlyReadedCate.indexOf(cate.id) === -1) {
              nearlyReadedCate.push(cate.id)
            }
          })
        }
      })

      while (this.suggest.length < this.suggestSum) {
        if (nearlyReadedCate.length > 0) {
          const cateArticles = await getCateArticle(nearlyReadedCate.shift())
          cateArticles.filter(article => {
            return this.nearlyReaded.every(nearlyReadedArticle => {
              return nearlyReadedArticle.id !== article.id
            })
          }).map(article => {
            this.suggest.push(article)
          })
        } else {
          await getRandomArticle(5).then(articles => {
            articles.map(article => {
              this.suggest.push(article)
            })
          })
        }
      }

    }
  }
}
</script>

<style lang="scss">
.front-sidebar {
  margin-top: 40px;
  .block {
    .block-head {
      height: 40px;
      background: url(/static/block-head-bg.png);
      background-size: cover;
      background-position: center 50%;
      background-repeat: no-repeat;
      padding: 4px 0 0 40px;
      font-size: 18px;
    }
    .block-content {
      position: relative;
      padding: 12px 20px;
    }
  }
}
.readmore {
  cursor: pointer;
  color: rgba(46, 46, 46, 0.5);
}
.readmore:hover {
  text-decoration: underline;
}

.suggest-list {
  text-decoration: none;
  list-style: none;
  padding: 0;
  li {
    padding: 4px;
  }
  a {
    color: #000;

    &:hover {
      color: #a00;
      text-decoration: underline;
    }
  }
}
</style>
