<template lang="html">
  <div class="header">
    <ul class="nav nav-pills hz-nav">
      <li v-for="nav in navs" role="presentation">
        <router-link v-if="nav.link.indexOf('http') === -1" :to="nav.link" v-bind:class="nav.active ? 'active' : ''">{{ nav.title }}</router-link>
        <a v-if="nav.link.indexOf('http') !== -1" v-bind:href="nav.link">{{ nav.title }}</a>
      </li>
    </ul>
    <div class="pic">
      <h1 class="site-name">徽州文化服务云平台</h1>
    </div>
  </div>
</template>

<script>
import {getNav} from './../service/getData'

export default {
  data() {
    return {
      navs: []
    }
  },
  created() {
    getNav().then(obj => {
      obj.map(i => {
        i.active = this.$route.name === i.name || this.$route.path === i.name

        this.navs.push(i)
      })
    })
  }
}
</script>

<style lang="scss">
.header {
  text-align: center;
  margin-top: 10px;
  max-width: 980px;
  margin-left: auto;
  margin-right: auto;
}
.hz-nav {
  position: relative;
  li {
    width: 114px;
    border-radius: 0;
    background: #d7d6d2;
    text-align: center;
    .active {
      color: #d7d6d2;
      background-size: cover;
      background-position: center 50%;
      background-repeat: no-repeat;
      background: url(/static/nav-item-bg.png);
    }
    a {
      border-radius: 0;
      color: #000;
      background: #d7d6d2;
      &:hover,&:focus {
        border-radius: 0;
        color: #d7d6d2;
        background-size: cover;
        background-position: center 50%;
        background-repeat: no-repeat;
        background: url(/static/nav-item-bg.png);
      }
    }
    // &:hover + &:active + &:focus {
    //   background-size: cover;
    //   background-position: center 50%;
    //   background-repeat: no-repeat;
    //   background: url(/static/nav-item-bg.png);
    // }
  }

  @media (max-width: 768px) {
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    min-height: 40px;
    li {
      position: relative;
      width: 33%;
      padding: 4px;
      background: #d7d6d2;
      .active {
        background: #000;
      }
      a {
        border-radius: 0;
        color: #000;
        background: #d7d6d2;
        &:hover,&:focus {
          border-radius: 0;
          color: #d7d6d2;
          background-size: cover;
          background-position: center 50%;
          background-repeat: no-repeat;
          background: #000;
        }
      }
    }
  }
}

.title {
  height: 80px;
  /*width: 110px;*/
  position: relative;
  display: block;
  float: left;
}

.pic {
  background: url(/static/blank.png);
  background-position: center 50%;
  background-repeat: no-repeat;
  position: relative;
  width: 100%;
  height: 290px;
  line-height: 290px;
  color: rgb(0, 0, 0);
  text-shadow: 0px 0px 6px white;
  h1 {
    font-size: 50px;
  }
  @media (max-width: 768px) {
    h1 {
      font-size: 40px;
    }
  }
}

.site-name {
  line-height: 290px;
}

</style>
