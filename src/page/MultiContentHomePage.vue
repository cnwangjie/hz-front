<template lang="html">
<div class="mchome">
  <navbar></navbar>

  <div class="zhutu"></div>

  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div id="carousel" class="carousel slide" data-ride="carousel">
          <!-- Indicators -->
          <ol class="carousel-indicators">
            <li data-target="#carousel" data-slide-to="0" class="active"></li>
            <li data-target="#carousel" data-slide-to="1" class=""></li>
            <li data-target="#carousel" data-slide-to="2" class=""></li>
          </ol>

          <!-- Wrapper for slides -->
          <div class="carousel-inner" role="listbox">
            <div
            v-for="photo, index in carousel"
            v-if="index < 3"
            class="item"
            :class="index === 0 ? 'active' : ''"
            :style="{'background-image': 'url(' + photo.url + ')'}">
              <div class="carousel-caption">
              </div>
            </div>
          </div>

          <!-- Controls -->
          <!-- <a class="left carousel-control" role="button" data-slide="prev">
            <span class="icon-prev" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" role="button" data-slide="next">
            <span class="icon-next" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a> -->
        </div>
      </div>

      <div class="col-md-4 block">
        <div class="title">
          最新资讯
          <router-link :to="'/info'" class="pull-right more">+更多</router-link>
        </div>
        <div class="content">
          <ul>
            <li v-for="a, index in articles" v-if="index < 5">
              <div class="break-word">
                <router-link :to="'/article/' + a.id">{{ a.title }}</router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-4 block">
        <div class="title">
          <router-link :to="'/tradition'">徽州文化界定</router-link>
        </div>
        <div class="content">
          <div class="text">
            <p>刘伯山认为徽州文化即是指发生与存在于历史上徽州的以及由此发生辐射、影响于外的典型封建文化。</p>
            <p>其一，我们说的徽州文化是指历史上徽州区划范围内的文化。
              其地理区域范围包括当年徽州府辖的6个县，即歙县、休宁、黟县、祁门、绩溪和婺源。</p>
            <p>其二，徽州的历史至少有五、六千年，其文化当然可归为广义的大徽州文化的范围。
                但严格和典型意义上所说的徽州文化概念，主要还是指北宋宣和三年(公元1121年)设了徽州府后才全面崛起，
                在明清时达到鼎盛的文化，但这一文化与其早期发展及后期演变都有内在关联。</p>
            <p>其三，徽州文化不能仅仅指在徽州本土上存在的文化，亦还包括由徽州而发生，
            由本籍包括寄籍、侨居外地的徽州人而创造从而辐射于外、影响于外的文化。</p>
            <p>其四，这里所说的“文化”应是取其广义的概念，不仅指学术理论、文化艺术，还包括商业经营、宗法伦理、精神信仰、风俗民情、文献著作、社会经济、土地制度、历史人物等等。
              如此界定的徽州文化概念，实际是将徽州历史文化作为一个独立的、多元的、系列的整体，既有显明的地理空间和时间流程上的限定性，又有内容实质上的限定性，以及由此限定而内在包括的对自身限定的一体化超越，决定了徽学研究的对象。</p>
            <p>卞利认为徽州文化主要是指历史上由徽州人创造并根植于徽州本土，经由徽州商帮和徽州士人向外传播和辐射，进而影响其他地域文化进程的一种区域历史文化。</p>
          </div>
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-md-12 block cate" v-for="cate in displayCates">
        <div class="title">
          {{ cate.name }}
          <div class="title-btn pull-right">
            <router-link :to="'/class/' + cate.name">详情</router-link>
            <router-link :to="'/class/' + cate.name + '/photo'">图片</router-link>
            <router-link :to="'/class/' + cate.name + '/video'">视频</router-link>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 col-md-6 col-xs-12 content">
            <ul>
              <li v-for="a, index in cate.articles" v-if="index < 8">
                <div class="break-word">
                  <router-link :to="'/article/' + a.id">{{ a.title }}</router-link>
                </div>
              </li>
            </ul>
          </div>

          <div
            v-for="p, index in cate.photos"
            v-if="index < 3"
            class="col-md-3 col-md-6 col-xs-12">
            <div class="item">
              <div>
                <div v-if="'link' in p && p.link">
                  <router-link v-if="!isNaN(p.link)" :to="`/article/${p.link}`">
                    <img :src="p.url" :alt="p.name">
                  </router-link>
                  <a v-else :href="p.link" target="_blank">
                    <img :src="p.url" :alt="p.name">
                  </a>
                </div>
                <img v-else :src="p.url" :alt="p.name">
              </div>
              <div class="photo-title">
                <span>{{ p.name.split('.').slice(0, -1).join('.') }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>

  <image-footer></image-footer>

</div>
</template>

<script>
import navbar from './../components/Navbar'
import imageFooter from './../components/ImageFooter'
// import {apiurl} from './../service/config'

import {
  getLastestArticle,
  getAllCates,
  getCateArticle,
  getResources,
  getResourceInfo,
} from './../service/getData'

export default {
  data() {
    return {
      articles: [],
      displayCates: [],
      carousel: [],
    }
  },
  components: {
    navbar,
    imageFooter,
  },
  created() {
    getLastestArticle({page: 1}).then(articles => {
      this.articles = articles
    })

    getAllCates().then(cates => {
      this.displayCates = cates.splice(0, 3)
    }).then(() => Promise.all(this.displayCates.map((cate, index) => {
      return getCateArticle(cate.id).then(articles => {
        cate.articles = articles
        return getResources('photo/' + cate.name)
      }).then(photos => {
        cate.photos = photos
        this.carousel = this.displayCates.reduce((r, cate) => {
          if ('photos' in cate) {
            cate.photos.map(photo => {
              r.push(photo)
            })
          }
          return r
        }, [])
        .sort(() => Math.random() < 0.5)
        .splice(0, 3)
        this.$forceUpdate()
      })
    })))
  },
  updated() {
    if (this.carousel.length > 0) $('.carousel').carousel()
  }
}
</script>

<style lang="scss">
.break-word {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.mchome {
  background-color: #e7e5d0;
  #carousel {
    .item {
      height: 185px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }
  .container {
    background-color: #fff;
    margin-top: 40px;
    margin-bottom: 40px;
    padding: 20px;
    max-width: 1200px;
    box-shadow: 0px 0px 20px black;
  }
  .cate {
    margin: 12px 0;
    .title {
      border-bottom: 1px solid black;
    }
  }
  .block {
    .title {
      line-height: 45px;
      height: 45px;
      font-size: 26px;
      font-weight: bold;
      a {
        color: black;
      }
      .more {
        font-size: 13px;
        color: gray;
      }
      .title-btn {
        display: inline-block;
        margin-left: 40px;
        a {
          margin: 0 24px 0;
          font-size: 24px;
          color: gray;
          font-weight: lighter;
          transition: 0.2s;
          &:hover {
            transition: 0.2s;
            text-shadow: 2px 2px 10px black;
            text-decoration: none;
          }
        }
      }
    }
    .content {
      ul {
        padding: 0;
        font-size: 14px;
        a {
          color: black;
        }
        li {
          height: 26px;
          line-height: 26px;
          list-style: none;
          border-bottom: 1px dotted #777;
        }
      }
    }
    .item {
      video, img {
        width: 100%;
        height: 200px;
      }

      .photo-title {
        font-size: 14px;
        width: 100%;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .text {
    overflow-y: auto;
    height: 150px;
    margin: 0;
  }

  @media (max-width: 767px) {
    .container {
      box-shadow: none;
      margin: 0;
    }
  }
}
</style>
