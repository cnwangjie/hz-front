<template lang="html">
<div>
  <navbar></navbar>

  <!-- <blank></blank> -->
  <div class="zhutu"></div>

  <div class="gtco-section zhuye">
		<div class="gtco-container container">
			<div class="row">

				<div v-show="!active" class="col-lg-4 col-md-4 col-sm-6" v-for="item, index in classes">
					<router-link :to="'/class/' + item.title" class="gtco-card-item card-item-ide">
						<figure>
							<div class="overlay">
                <i class="ti-plus">
                  <svg viewBox="0 0 17 17" preserveAspectRatio="xMidYMid meet" style="pointer-events: none; display: inline-block; height: 30px;">
                    <g style="fill:#5d5d5d;opacity:0.7">
                      <path d="M16 9h-7v7h-1v-7h-7v-1h7v-7h1v7h7v1z" fill="#fff" />
                    </g>
                  </svg>
                </i>
              </div>
							<img style="width:100%;" v-bind:src="'/static/' + item.title + '.jpg'" alt="Image" class="img-responsive">
						</figure>
						<div class="gtco-text">
							<h2>{{ item.title }}</h2>


						</div>
					</router-link>
				</div>


        <router-view></router-view>
			</div>
		</div>
	</div>

  <image-footer></image-footer>

</div>
</template>

<script>
import navbar from './../components/Navbar'
import blank from './../components/Blank'
import imageFooter from './../components/ImageFooter'
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
    blank,
    imageFooter,
  },
  created() {
    this.classes = `徽商.徽州宗族.新安理学.新安医学.新安画派.徽州文书.徽州村落.徽派版画.徽派建筑.徽州三雕.文房四宝.徽州历史人物.徽派朴学`.split('.').map(i => {
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

.gtco-section {
  padding-top: 40px;
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
      padding: 0 10px;
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

.gtco-card-item {
  display: block;
  width: 100%;
  position: relative;
  background: #fff;
  overflow: hidden;
  z-index: 9;
  bottom: 0;
  margin-bottom: 30px;
  -webkit-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.08);
  -ms-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.08);
  -o-box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.08);
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  -ms-border-radius: 0px;
  border-radius: 0px;
  -webkit-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s; }
  .gtco-card-item figure {
    height: 240px;
    overflow: hidden;
    z-index: 12;
    margin-bottom: 20px;
    position: relative; }
    .gtco-card-item figure .overlay {
      opacity: 0;
      visibility: hidden;
      z-index: 10;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      background: rgba(0, 0, 0, 0.4);
      -webkit-transition: 0.7s;
      -o-transition: 0.7s;
      transition: 0.7s; }
      .gtco-card-item figure .overlay i {
        z-index: 12;
        color: #fff;
        font-size: 30px;
        position: absolute;
        margin-left: -15px;
        margin-top: -45px;
        top: 50%;
        left: 50%;
        -webkit-transition: 0.3s;
        -o-transition: 0.3s;
        transition: 0.3s; }
  .gtco-card-item img {
    z-index: 8;
    opacity: 1;
    -webkit-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s; }
  .gtco-card-item .gtco-text {
    padding: 0px 10px 10px 20px;
    text-align: center; }
    .gtco-card-item .gtco-text.text-left {
      text-align: left; }
    .gtco-card-item .gtco-text h2, .gtco-card-item .gtco-text span {
      text-decoration: none !important; }
    .gtco-card-item .gtco-text h2 {
      font-size: 20px;
      font-weight: 400;
      margin: 0 0 10px 0;
      color: #66D37E; }
    .gtco-card-item .gtco-text span {
      color: #b3b3b3;
      font-size: 16px;
      font-weight: 400; }
    .gtco-card-item .gtco-text p {
      color: #000;
      -webkit-transition: 0.5s;
      -o-transition: 0.5s;
      transition: 0.5s; }
    .gtco-card-item .gtco-text span.btn {
      color: #666666 !important;
      opacity: 1;
      visibility: visible;
      bottom: 0;
      background: #ebebeb;
      border: 2px solid #ebebeb !important;
      position: relative;
      -webkit-transition: 0.5s;
      -o-transition: 0.5s;
      transition: 0.5s; }
    .gtco-card-item .gtco-text .gtco-category {
      font-size: 12px;
      color: #cccccc; }
      .gtco-card-item .gtco-text .gtco-category span {
        font-size: 12px;
        color: gray;
        display: -moz-inline-stack;
        display: inline-block;
        zoom: 1;
        *display: inline; }
  .gtco-card-item:hover, .gtco-card-item:focus {
    bottom: 7px;
    text-decoration: none;
    -webkit-box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.19);
    -moz-box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.19);
    -ms-box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.19);
    -o-box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.19);
    box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.19); }
    .gtco-card-item:hover img, .gtco-card-item:focus img {
      -webkot-transform: scale(1.2);
      -moz-transform: scale(1.2);
      -ms-transform: scale(1.2);
      -o-transform: scale(1.2);
      transform: scale(1.2); }
    .gtco-card-item:hover span.btn, .gtco-card-item:focus span.btn {
      opacity: 1;
      visibility: visible;
      bottom: 0px;
      color: #fff !important;
      border: 2px solid #7ad98f !important;
      background: #7ad98f !important; }
    .gtco-card-item:hover figure .overlay, .gtco-card-item:focus figure .overlay {
      opacity: 1;
      visibility: visible; }
      .gtco-card-item:hover figure .overlay i, .gtco-card-item:focus figure .overlay i {
        margin-top: -15px; }
    .gtco-card-item:hover h2, .gtco-card-item:hover span, .gtco-card-item:focus h2, .gtco-card-item:focus span {
      text-decoration: none !important; }

.card-item-ide {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  figure {
    height: 160px;
  }
}
</style>
