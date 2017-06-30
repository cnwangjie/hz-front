<template lang="html">
    <div class="row">
      <div class="col-sm-offset-1" v-bind:class="side ? 'col-sm-7' : 'col-sm-10'">
        <div class="article">
          <div class="article-head">
            {{ title }}
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
      title: 'ttt',
      content: '1111',
      side: false
    }
  },
  created() {
    getArticle(this.$route.params.id).then(obj => {
      this.title = obj.title
      this.content = obj.content
    })
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
  left: 38px;
  width: 120px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #a00;
  border-radius: 30px;
  background: #d7d6d2;
  padding: 0 8px;
  font-size: 14px;
  font-weight: 500;
}
.article-content {
  border: 1px solid #000;
  border-radius: 10px;
  padding: 32px 40px 12px;
}
</style>
