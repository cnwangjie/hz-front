<template>
  <div id="app">
    <navbar></navbar>
    <div class="container main">

      <router-view></router-view>

    </div>
    <foot></foot>
  </div>
</template>

<script>
import './assets/jquery.min.js'
import './assets/bootstrap.min.js'
import navbar from './components/Navbar'
import foot from './components/Foot'
export default {
  name: 'app',
  components: {
    navbar,
    foot
  }
}
</script>

<style>
@import '/static/bootstrap.min.css';

body {
  font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  background: #d7d6d2;
}

.main {
  margin-top: 40px;
}
</style>
