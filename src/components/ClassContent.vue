<template lang="html">
<div>

  <navbar></navbar>

  <div class="zhutu"></div>


  <div class="content-section zhuye">
    <div class="container">
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
            <router-link :to="`/class/${curClass}/photo`">图片</router-link>
            <router-link :to="`/class/${curClass}/video`">视频</router-link>
            <router-link :to="`/class/${curClass}/anima`">动漫</router-link>
          </div>
        </div>
        <div class="row class-content">
          <div v-if="curType !== 'article'" v-for="item in contents" class="col-md-3 col-sm-6 col-xs-12">
            <div class="item">
              <video v-if="curType === 'video' || curType === 'anima'"
              :src="`${apiurl}/resource/${item.path}`" preload="metadata" v-on:click="playvideo(item)"></video>
              <div v-if="curType === 'photo'">
                <router-link v-if="'link' in item" :to="isNaN(item.link) ? item.link : `/article/${item.link}`">
                  <img :src="`${apiurl}/resource/${item.path}`" :alt="item.name">
                </router-link>
                <img v-else :src="`${apiurl}/resource/${item.path}`" :alt="item.name">
              </div>
              <span class="title">{{ item.name }}</span>
            </div>
          </div>
          <div v-if="curType === 'article'" class="col-md-12">
            <!-- <router-link v-for="item in contents" :to="`/article/${item.id}`"><h2>{{ item.title }}</h2></router-link> -->
          </div>
          <div v-if="contents.length === 0">
            <h1>该分类下没有此类资源</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="ditu">
    <div class="zhushi"> © 2017 All Rights Reserved.</div>
  </div>
</div>
</template>

<script>
import navbar from './../components/Navbar'
// import classDetailData from './../assets/classDetail.js'
import {getResources, getCateArticle, getAllCates} from './../service/getData'
import {apiurl} from './../service/config'

export default {
  data() {
    return {
      // detail: classDetailData,
      curClass: '',
      curType: '',
      apiurl,
      contents: [],
    }
  },
  components: {
    navbar,
  },
  watch: {
    '$route': 'changeName'
  },
  created() {
    this.changeName()
  },
  methods: {
    changeName() {
      this.curClass = this.$route.params.name
      this.curType = this.$route.params.type
      console.log(this.curClass, this.curType)
      this.changeContent()
    },
    changeContent() {
      if (this.curType === 'article') {
        getAllCates().then(obj => {
          if (Array.isArray(obj)) {
            let cateid
            for (let c of obj) {
              if (c.name === this.curClass) {
                cateid = c.id
              }
            }
            return cateid !== undefined ? getCateArticle(cateid) : undefined
          }
        }).then(obj => {
          if (Array.isArray(obj)) {
            this.contents = obj
          } else {
            this.contents = []
          }
        })
      } else {
        getResources(`/${this.curType}/${this.curClass}`).then(obj => {
          if (Array.isArray(obj)) {
            this.contents = obj.filter(i => !i.isDir)
          } else {
            this.contents = []
          }
        })
      }
    },
    playvideo(item) {
      console.log(item.url)
      window.open(item.url)
    }
  }
}
</script>

<style lang="scss">
.content-section {
  padding-top: 40px;
  min-height: 400px;
}
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
.class-content {
  padding-top: 20px;
  position: relative;
  video, img {
    width: 100%;
  }
}
</style>
