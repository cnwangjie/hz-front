<template lang="html">

<div class="col-sm-3 sidebar">
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
        <li v-for="article in suggest">
          <router-link :to="`article/${article.id}`">{{ article.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</div>

</template>

<script>
import {getRandomArticle} from './../service/getData'
export default {
  data() {
    return {
      word: '',
      suggest: []
    }
  },
  created() {
    this.getSuggestArticle()
  },
  methods: {
    getSuggestArticle() {
      getRandomArticle(5).then(obj => {
        this.suggest = obj
      })
    }
  }
}
</script>

<style lang="scss">
.sidebar {
  margin-top: 40px;
}
.block {
}
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
