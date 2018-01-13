<template lang="html">

  <nav class="header-nav" role="navigation">
		<div class="nav-container">

			<div class="row">

        <div class="col-sm-4 text-left" >
          <img src="/static/logo.png" alt="Image" style="height:40px">
          <span class="title">徽州文化服务云平台</span>
        </div>
				<div class="col-sm-8 text-right" style="padding-top:9px">
					<ul>
            <li v-for="nav in navs" v-bind:class="nav.active ? 'active' : ''">
              <router-link v-if="nav.link.indexOf('http') === -1" :to="nav.link" >{{ nav.title }}</router-link>
              <a v-else v-bind:href="nav.link">{{ nav.title }}</a>
            </li>
					</ul>
				</div>
			</div>

		</div>
	</nav>

  <!-- <div class="header">
    <ul class="nav nav-pills hz-nav hidden-xs">
      <li v-for="nav in navs" role="presentation">
        <router-link v-if="nav.link.indexOf('http') === -1" :to="nav.link" v-bind:class="nav.active ? 'active' : ''">{{ nav.title }}</router-link>
        <a v-else v-bind:href="nav.link">{{ nav.title }}</a>
      </li>
    </ul>
    <div class="pic hidden-xs">
      <h1 class="site-name">徽州文化服务云平台</h1>
    </div>

    <nav class="navbar navbar-inverse navbar-static-top visible-xs">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">徽州文化服务云平台</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li v-for="nav in navs" :class="nav.active ? 'active' : ''">
              <router-link v-if="nav.link.indexOf('http') === -1" :to="nav.link">{{ nav.title }}</router-link>
              <a v-else v-bind:href="nav.link">{{ nav.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  </div> -->
</template>

<script>
import {getNav} from './../service/getData'
import {mapState, mapMutations} from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['navs'])
  },
  created() {
    this.init()
  },
  methods: {
    ...mapMutations(['setNavs', 'changeNavsActiveStatus']),
    async init() {
      if (this.navs.length === 0) {
        const navs = await getNav()
        if ('length' in navs) {
          this.setNavs(navs)
        }
      }
      this.changeNavsActiveStatus(this.$route)
    }
  }
}
</script>

<style lang="scss">
$main-color: #66D37E;
$normal-color: rgba(255, 255, 255, 0.7);

.header-nav {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  padding: 20px 0;
  z-index: 1001;
  background: rgba(0, 0, 0, 0.7);

  .nav-container {
    max-width: 1200px;
    position: relative;
    margin: 0 auto;
    padding-left: 15px;
    padding-right: 15px;
  }

  .title {
    color: $normal-color;
  }

  ul {

    padding: 0;
    margin: 2px 0 0 0;

    li {

      padding: 0;
      margin: 0;
      list-style: none;
      display: inline;

      &.active > a {
          color: $main-color;
      }

      a {
        text-transform: uppercase;
        font-size: 16px;
        letter-spacing: .08em;
        padding: 28px 15px;
        color: $normal-color;
        -webkit-transition: 0.3s;
        -o-transition: 0.3s;
        transition: 0.3s;

        &:hover {
          color: white;
          outline: none;
          text-decoration: none;
        }
      }
    }
  }
}


.header {
  text-align: center;
  max-width: 980px;
  margin-left: auto;
  margin-right: auto;
}
.hz-nav {
  position: relative;
  margin-top: 10px;
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
      width: 32%;
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

// .title {
//   height: 80px;
//   /*width: 110px;*/
//   position: relative;
//   display: block;
//   float: left;
// }

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
  line-height: 400px;
}

</style>
