<template lang="html">
<div>
  <div class="col-md-12">

    <div class="class-detail">
      <div class="pull-left">
        <router-link :to="'/class'"><svg viewBox="0 -256 1792 1536" preserveAspectRatio="xMidYMid meet" style="pointer-events: none; display: inline-block; height: 39px;">
          <g style="fill:#5d5d5d;opacity:0.7">
            <path d="M1536 640v-128q0 -53 -32.5 -90.5t-84.5 -37.5h-704l293 -294q38 -36 38 -90t-38 -90l-75 -76q-37 -37 -90 -37q-52 0 -91 37l-651 652q-37 37 -37 90q0 52 37 91l651 650q38 38 91 38q52 0 90 -38l75 -74q38 -38 38 -91t-38 -91l-293 -293h704q52 0 84.5 -37.5
t32.5 -90.5z" />
          </g>
        </svg></router-link>
      </div>
      <h1>{{ curClass }}</h1>
      <div class="pull-right">
        <a>图片</a>
        <a>视频</a>
        <a>动漫</a>
      </div>
    </div>
    <div v-html="detail[curClass].content"></div>
  </div>
</div>
</template>

<script>
import classDetailData from './../assets/classDetail.js'

export default {
  data() {
    return {
      detail: classDetailData,
      curClass: ''
    }
  },
  watch: {
    'this.$route': 'changeName'
  },
  created() {
    this.curClass = this.$route.params.name
  },
  mathods: {
    changeName() {
      this.curClass = this.$route.params.name
    }
  }
}
</script>

<style lang="scss">
.class-detail {
  a {
    color: #5d5d5d;
    padding: 12px;
    font-size: 18px;
  }
  h1 {
    display: inline-block;
    margin: 0;
  }
}
</style>
