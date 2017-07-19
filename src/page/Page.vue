<template lang="html">
<div>
  <navbar></navbar>
  <div class="container main">
    <div class="row">
      <div class="col-sm-offset-1" v-bind:class="side ? 'col-sm-7' : 'col-sm-10'" v-html="content">
      </div>
      <sidebar v-if="sidebar"></sidebar>
    </div>
  </div>
  <foot></foot>
</div>
</template>

<script>
import sidebar from './../components/Sidebar'
import navbar from './../components/Navbar'
import foot from './../components/Foot'
export default {
  data() {
    return {
      content: 'ttt',
      sidebar: false
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
</style>
