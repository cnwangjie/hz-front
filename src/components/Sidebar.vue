<template lang="html">

<div class="col-sm-3">
  <div class="block">
    <div class="block-head">
      搜索
    </div>
    <div class="block-content">
      <input type="text" class="form-control" placeholder="要搜索的关键词" v-model="word"></input>
      <router-link class="btn" style="background:#dddcd9" :to="'/search?word=' + word">搜索</router-link>
    </div>
    <!-- <div class="block-head">
      {{ block.title }}
    </div>
    <div class="block-content" v-html="block.content">
    </div>
    <router-link :to="readmore" v-if="block.readmore" class="readmore">继续阅读</router-link> -->
  </div>
</div>

</template>

<script>
export default {
  data() {
    return {
      word: ''
    }
  }
}
</script>

<style lang="css">
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
  text-indent: 25px;
}
.readmore {
  cursor: pointer;
  color: rgba(46, 46, 46, 0.5);
}
.readmore:hover {
  text-decoration: underline;
}
</style>
