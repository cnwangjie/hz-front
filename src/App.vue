<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="container main">

      <router-view></router-view>

    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import './assets/jquery.min.js'
import './assets/bootstrap.min.js'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
export default {
  name: 'app',
  components: {
    Navbar,
    Footer
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
