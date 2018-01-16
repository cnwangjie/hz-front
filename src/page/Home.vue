<template lang="html">
<div class="zhuye">
  <navbar></navbar>

  <!-- <blank></blank> -->
  <!--div class="navbar">
    <div class="logo"></div>

    <div class="hzwh">徽州文化·云服务平台</div>
  </div-->
    <!--div class="Search">
      <input  type="search" class="search">
      <button type="search" class="sousuo">搜索</button>
    </div-->


  <div class="zhutu"></div>

  <!--div class="fzl">
    <ul>
      <li style="background-image: url(/static/fenlei.png)" onclick=""></li>
      <li style="background-image: url(/static/zixun.png)"></li>
      <li style="background-image: url(/static/lianxi.png"></li>
    </ul>
  </div-->

  <div class="hc">
    <div class="hp">
    </div>
  </div>

  <div class="text">
      <player class="pull-right" :src="jiedingsound"></player>
  </div>

  <div class="pic"></div>

  <div class="anniu">
    <ul>
      <li v-for="item in overviews"
          :style="`background-image: url(${item.image})`"
          v-on:click="dangqian = item.name"></li>
    </ul>
  </div>


  <div class="neirong">
    <div class="pict hidden-xs" :style="`background-image:url(${handledOverviews[dangqian].pict})`"></div>
    <player class="pull-right" v-if="'sound' in handledOverviews[dangqian]" :src="handledOverviews[dangqian].sound"></player>
    <div class="nr" v-html="handledOverviews[dangqian].content"></div>
  </div>


  <image-footer></image-footer>


</div>
</template>

<script>
import sidebar from './../components/Sidebar'
import navbar from './../components/Navbar'
import foot from './../components/Foot'
import blank from './../components/Blank'
import searchForm from './../components/SearchForm'
import player from './../components/Player'
import overviews from './../assets/homeSection'
import {getLastestArticle, getTTSSound} from './../service/getData'
import imageFooter from './../components/ImageFooter'


const handledOverviews = overviews.reduce((r, i) => {
  r[i.name] = i
  return r
}, {})

export default {
  data() {
    return {
      overviews,
      handledOverviews,
      dangqian: Object.keys(handledOverviews).shift(),
      jiedingsound: '',
    }
  },
  components: {
    sidebar,
    navbar,
    blank,
    searchForm,
    foot,
    player,
    imageFooter,
  },
  created() {
    window.document.title = '首页 | 徽州文化服务云平台'

    Object.keys(handledOverviews).map(key => {
      const tmpEl = document.createElement('div')
      tmpEl.innerHTML = handledOverviews[key].content
      const text = tmpEl.innerText
      getTTSSound({text}).then(obj => {
        if ('soundpath' in obj) {
          handledOverviews[key].sound = obj.soundpath
        }
      })
    })
  },
  updated() {
    const jiedingText = document.getElementById('jieding').innerText
    getTTSSound({text: jiedingText}).then(obj => {
      if ('soundpath' in obj) {
        this.jiedingsound = obj.soundpath
      }
    })
  },
  methods: {
  }
}
</script>

<style lang="scss">

 /*.navbar {
  background-color: gray;
  margin: 0;
  max-height: 77px;
  .logo {
    height: 65px;
    width: 65px;
    margin-bottom: 10px;
    float: left;
    margin-left: 100px;
    background-image: url(/static/logo.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .hzwh {
    height: 65px;
    width: 400px;
    float: left;
    margin-left: 50px;
    margin-top: 10px;
    font-size: 200%;
    font-family: Nsimsun;
    color: white;
    display: inline-block;
  }
  .Search {
    position: relative;
    width: 55%;
    float: left;
    margin-top: 12px;
    display: inline-block;

    .search {
      width: 300px;
      background: #808080;
      font-size: 18pt;
      float: left;
      margin-left: 61%;
      background: #d1e3db;

    }
    .sousuo {
      float: left;
      margin-left: 20px;
      width: 80px;
      height: 40px;
    }
  }
}*/

.fzl {
  text-align:center;
  ul {
    min-height: 100px;
    padding:4px 0;
    margin:0;
    overflow:hidden;
    li {
      display: inline-block;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 120px;
      width: 20%;
      padding-bottom: 10%;
    }
  }
}
.hc {
  height: 120px;
  max-width: 800px;
  margin: 0 auto;
  .hp {
    height: 120px;
    background-image: url(/static/guanyuhuiwenhua.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}

.text {
  height: auto;
  position: relative;
  margin-left: 25%;
  margin-right: 25%;
  margin-bottom: 10px;
  .sample {
    border: 0px;
    max-width: 950px;
    height: 150px;
    overflow: auto;
  }
  @media (max-width: 767px) {
    margin: 10px 25px;
  }
}

.anniu {
  background: #e7e5d0;
  text-align:center;
  ul {
    padding:4px 0;
    margin:0;
    overflow:hidden;
    li {
      display: inline-block;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      width: 13%;
      padding-bottom: 10%;
    }
  }
}


.neirong {
  background: #e7e5d0;
  max-width: 960px;
  margin: 0 auto;
  .pict {
    position: absolute;
    width: 130px;
    height: 350px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .nr {
    position: relative;
    left: 130px;
    width: 80%;
    margin-bottom: 30px;
  }
  @media (max-width: 767px) {
    .nr {
      margin: 0 auto;
      left: 0;
    }
  }

}


.gtco-container {
  max-width: 1100px;
  position: relative;
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
}

#gtco-counter {
  text-align: center;
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  position: relative;
  padding: 7em 0;
  clear: both;

  .gtco-container {
    max-width: 1100px;
    position: relative;
    margin: 0 auto;
    padding-left: 15px;
    padding-right: 15px;
  }

  .feature-center {
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    float: left;
    width: 100%;
    margin-bottom: 40px;
  }
   .counter {
    font-size: 50px;
    margin-bottom: 10px;
    color: #66D37E;
    font-weight: 100;
    display: block;
  }
  .counter-label {
    margin-bottom: 0;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.5);
    letter-spacing: .1em;
  }
}

.home-overview-btn {
  li {
    a {
      border-radius: 0;
      color: gray;

      &.active {
        background-color: transparent;
      }

      &:hover {
        background-color: transparent;
      }

    }
  }

}

.text .col-md-12 {
  @media screen and (max-width: 768px) {
    padding: 0;
  }
}


.home-page {
  line-height: 1.7;
  font-size: 16px;
  color: #777;
  font-weight: 400;
  p {
    padding: 0 0 10px;
  }
}

.tab-content {
  padding: 20px;
  height: 480px;
  overflow-x: hidden;
  overflow-y: scroll;
  // box-shadow: inset 0 15px 10px -15px black,
              // inset 0 -15px 10px -15px black;
  background: white;
  &::-webkit-scrollbar {
    display: none;
  }
}

</style>
