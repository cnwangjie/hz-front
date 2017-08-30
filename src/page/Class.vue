<template lang="html">
<div>
  <navbar></navbar>
  <div class="container main class-page">

    <div class="row">
      <div class="col-sm-offset-1 col-md-10">

        <div v-show="!active" v-for="item, index in classes" class="col-xs-6 col-md-3 class-item">
          <router-link :to="'/class/' + item.title" class="thumbnail">
            <h3>{{ item.title }}</h3>
          </router-link>
        </div>
        <router-view></router-view>

      </div>
    </div>

  </div>
</div>
</template>

<script>
import navbar from './../components/Navbar'
import foot from './../components/Foot'
import {getNav} from './../service/getData'

export default {
  data() {
    return {
      classes: [],
      active: null,
    }
  },
  watch: {
    '$route': 'checkStatus'
  },
  components: {
    navbar,
  },
  created() {
    this.classes = `徽商.徽州宗族.新安理学.新安医学.新安画派.徽州文书.徽派朴学.徽派版画.徽派建筑.徽州三雕.文房四宝.徽州历史人物`.split('.').map(i => {
      return {
        title: i
      }
    })
  },
  methods: {
    checkStatus() {
      this.active = this.$route.name === 'classDetail'
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

.class-item {
  .thumbnail {
    border: #d7d6d2 1px solid;
    &:hover {
      border: #fff 1px solid;
    }
    background: url(/static/bg-card-0.png);
    background-size: cover;
    background-position: top;
    background-repeat: no-repeat;
    height: 200px;
    color: black;
    h3 {
      padding: 20px;
    }
  }

  .thumbnail.active {
    border: 0;
    background: #d7d6d2;
    &:hover {
      border: 0;
    }
  }
}

</style>
