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
      <div class="sample" id="jieding">
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

  <div class="ditu">
    <div class="zhushi"> © 2017 All Rights Reserved.</div>
  </div>

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
