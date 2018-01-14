<template lang="html">
<div class="class">

  <navbar></navbar>

  <div class="zhutu"></div>

  <div class="content-section zhuye">
    <div class="container class-container">

      <div class="row">
        <div class="col-md-10 col-sm-10 col-xs-12 left-content">
          <div class="row class-detail">
            <div class="pull-left">
              <router-link :to="'/class'" class="hidden-lg"><svg viewBox="0 -256 1792 1536" preserveAspectRatio="xMidYMid meet" style="pointer-events: none; display: inline-block; height: 39px;">
                <g style="fill:#5d5d5d;opacity:0.7">
                  <path d="M1536 640v-128q0 -53 -32.5 -90.5t-84.5 -37.5h-704l293 -294q38 -36 38 -90t-38 -90l-75 -76q-37 -37 -90 -37q-52 0 -91 37l-651 652q-37 37 -37 90q0 52 37 91l651 650q38 38 91 38q52 0 90 -38l75 -74q38 -38 38 -91t-38 -91l-293 -293h704q52 0 84.5 -37.5
                   t32.5 -90.5z" />
                </g>
              </svg></router-link>
            </div>
            <div class="class-title">
              <h1>{{ curClass }}</h1>
            </div>
            <div class="pull-right">
              <router-link :to="`/class/${curClass}/photo`">图片</router-link>
              <router-link :to="`/class/${curClass}/video`">视频</router-link>
              <router-link :to="`/class/${curClass}/anima`">动漫</router-link>
            </div>
          </div>
          <div class="row class-content">
            <div v-if="curType !== 'article' " v-for="item,index in contents" class="col-md-3 col-sm-6 col-xs-12">
              <div class="item">
                <video v-if="curType === 'video' || curType === 'anima'"
                 :src="`${apiurl}/resource/${item.path}`" preload="metadata" v-on:click="playvideo(item)" class="cvideo"></video>
                <div v-if="curType === 'photo'">
                  <div v-if="'link' in item && item.link">
                    <router-link v-if="!isNaN(item.link)" :to="`/article/${item.link}`">
                      <img :src="`${apiurl}/resource/${item.path}`" :alt="item.name">
                    </router-link>
                    <a v-else :href="item.link" target="_blank">
                      <img :src="`${apiurl}/resource/${item.path}`" :alt="item.name">
                    </a>
                  </div>
                  <img v-else :src="`${apiurl}/resource/${item.path}`" :alt="item.name">
                </div>
                <div class="title">
                  <span>{{ item.name.split('.').slice(0, -1).join('.') }}</span>
                </div>
              </div>
            </div>

            <div v-if="curType === 'article'" class="col-md-12">
               <!-- <router-link v-for="item in contents" :to="`/article/${item.id}`"><h2>{{ item.title }}</h2></router-link> -->
            </div>
            <div v-if="contents.length === 0">
              <h1 v-if="loading">加载中...</h1>
              <h1 v-else>该分类下没有此类资源</h1>
            </div>
          </div>

        </div>
        <div class="col-md-2 col-sm-2 hidden-xs">
          <class-selector
            :col="2">
          </class-selector>
        </div>
      </div>
    </div>
  </div>

    <image-footer></image-footer>
</div>
</template>

<script>
import navbar from './../components/Navbar'
// import classDetailData from './../assets/classDetail.js'
import {getResources, getCateArticle, getAllCates} from './../service/getData'
import {apiurl} from './../service/config'
import classSelector from './../components/ClassSelector'
import overviews from './../assets/classpict'
import imageFooter from './../components/ImageFooter'

const handledOverviews = overviews.reduce((r, i) => {
  r[i.name] = i
  return r
}, {})

export default {
  data() {
    return {
      // detail: classDetailData,
      curClass: '',
      curType: '',
      apiurl,
      contents: [],
      displaysum: 16,
      loading: false,
      overviews,
      handledOverviews,
    }
  },
  components: {
    navbar,
    classSelector,
    imageFooter
  },
  watch: {
    '$route': 'changeName'
  },
  created() {
    this.changeName()
  },
  methods: {
    changeName() {
      this.displaysum = 16
      this.curClass = this.$route.params.name
      this.curType = this.$route.params.type
      this.changeContent()
    },
    async changeContent() {
      this.loading = true
      if (this.curType === 'article') {
        await getAllCates().then(obj => {
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
        await getResources(`/${this.curType}/${this.curClass}`).then(obj => {
          if (Array.isArray(obj)) {
            this.contents = obj.filter(i => !i.isDir)
          } else {
            this.contents = []
          }
        })
      }
      this.loading = false
    },
    playvideo(item) {
      window.open(item.url)
    }
  }
}
</script>


<style lang="scss">

@media (min-width: 1500px) {
  .class-container {
    width: 1500px;
  }
  .class-detail {
    .pull-right {
      height: 72px;
      line-height: 72px;
      a {
        font-size: 42px;
      }
    }
  }
  .class-title {
    display: inline-block;
    margin-left: 40px;
    h1 {
      font-size: 72px;
      text-shadow: 1px 1px 3px #795548;
      color: #9E9E9E;
    }
  }
}


.content-section {
  padding-top: 40px;
  padding-bottom: 40px;
  min-height: 400px;
}
@media (min-width: 767px) {
  .left-content {
    border-right: 1px solid black;
  }
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
  border-top: 1px solid black;
  margin-top: 20px;
  padding-top: 20px;
  position: relative;
  height: 680px;
  overflow-y: auto;
  video, img {
    width: 100%;
    height: 200px;
  }
  .title {
    width: 100%;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
@media (max-width: 767px) {
  .container {
    box-shadow: none;
    margin-top: 0;
    margin-bottom: 0;
  }
  .content-section {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
