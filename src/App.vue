<template>
  <div id="app">

    <router-view></router-view>

    <div v-if="!serverUp" style="background: rgba(0, 0, 0, 0.85); color: rgb(232, 232, 232); line-height: 1.2; white-space: pre; font-family: Menlo, Consolas, monospace; font-size: 13px; position: fixed; z-index: 9999; padding: 10px; left: 0px; right: 0px; top: 0px; bottom: 0px; overflow: auto; text-align: left;">
        服务器宕机
    </div>

  </div>
</template>

<script>
import {getServerStatus} from './service/getData'
import './assets/jquery.min.js'
import './assets/bootstrap.min.js'
export default {
  name: 'app',
  data() {
    return {
      serverUp: true,
    }
  },
  components: {
  },
  created() {
    getServerStatus().then(obj => {
      this.serverUp = typeof obj === 'object' && obj.status === 'Success!'
    })
  },
}
</script>

<style>
@import '/static/bootstrap.min.css';

body {
  font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
}

.zhutu {
  width: 100%;
  height: 500px;
  background-image: url(/static/zhutu.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.zhuye {
  background: #e7e5d0;
}

.gray-bg {
  background: #f6f9fc;
}
.form-control {
    box-shadow: none;
    background: transparent;
    border: 2px solid rgba(0, 0, 0, 0.1);
    height: 46px;
    font-size: 16px;
    font-weight: 300;
    padding-left: 15px;
    padding-right: 15px;
}

.row-mt-15em {
  margin-top: 15em; }
  @media screen and (max-width: 768px) {
    .row-mt-15em {
      margin-top: 7em; } }


      #gtco-features,
      #gtco-features-2,
      #gtco-products,
      #gtco-services,
      #gtco-subscribe,
      #gtco-footer,
      .gtco-section {
        padding: 7em 0;
        clear: both;
        position: relative; }
        @media screen and (max-width: 768px) {
          #gtco-features,
          #gtco-features-2,
          #gtco-products,
          #gtco-services,
          #gtco-subscribe,
          #gtco-footer,
          .gtco-section {
            padding: 2em 0; } }
        #gtco-features.border-bottom,
        #gtco-features-2.border-bottom,
        #gtco-products.border-bottom,
        #gtco-services.border-bottom,
        #gtco-subscribe.border-bottom,
        #gtco-footer.border-bottom,
        .gtco-section.border-bottom {
          border-bottom: 1px solid #e6e6e6; }


#gtco-header .display-tc,
#gtco-counter .display-tc,
.gtco-cover .display-tc {
  display: table-cell !important;
  vertical-align: middle; }
  #gtco-header .display-tc .intro-text-small,
  #gtco-counter .display-tc .intro-text-small,
  .gtco-cover .display-tc .intro-text-small {
    font-size: 14px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: .15em;
    display: block;
    margin-bottom: 10px; }
  #gtco-header .display-tc h1, #gtco-header .display-tc h2,
  #gtco-counter .display-tc h1,
  #gtco-counter .display-tc h2,
  .gtco-cover .display-tc h1,
  .gtco-cover .display-tc h2 {
    margin: 0;
    padding: 0;
    color: white; }
  #gtco-header .display-tc h1,
  #gtco-counter .display-tc h1,
  .gtco-cover .display-tc h1 {
    margin-bottom: 0px;
    font-size: 59px;
    line-height: 1.5;
    font-weight: 300; }
    @media screen and (max-width: 768px) {
      #gtco-header .display-tc h1,
      #gtco-counter .display-tc h1,
      .gtco-cover .display-tc h1 {
        font-size: 34px;
        line-height: 1.2;
        margin-bottom: 10px; } }
  #gtco-header .display-tc h2,
  #gtco-counter .display-tc h2,
  .gtco-cover .display-tc h2 {
    font-weight: 300;
    font-size: 22px;
    line-height: 1.5;
    margin-bottom: 30px; }

.flex-section {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  -moz-flex-wrap: wrap;
  width: 100%; }
  .flex-section .flex-img {
    position: relative;
    overflow: hidden; }
    .flex-section .flex-img:before {
      left: -110px;
      content: "";
      position: absolute;
      height: 120%;
      background: #f6f9fc;
      width: 100px;
      -webkit-transform: skewX(-12deg);
      -moz-transform: skewX(-12deg);
      transform: skewX(-12deg); }
      @media screen and (max-width: 768px) {
        .flex-section .flex-img:before {
          display: none; } }
  .flex-section .col-1 {
    padding: 7em 0;
    width: 65%; }
    .flex-section .col-1 .text {
      padding-left: 40%;
      padding-right: 10%; }
      @media screen and (max-width: 1200px) {
        .flex-section .col-1 .text {
          padding-left: 30%; } }
      @media screen and (max-width: 768px) {
        .flex-section .col-1 .text {
          padding-left: 15px;
          padding-right: 15px;
          padding-top: 0;
          padding-bottom: 0; } }
  .flex-section .col-2 {
    width: 35%;
    background-size: cover;
    background-position: center center;
    min-height: 450px; }
  @media screen and (max-width: 992px) {
    .flex-section .col-1, .flex-section .col-2 {
      width: 100%; } }
  @media screen and (max-width: 992px) {
    .flex-section .col-1 {
      padding: 4em 0; } }
  .flex-section.reverse {
    position: relative; }
    .flex-section.reverse .flex-img {
      position: relative;
      overflow: hidden; }
      .flex-section.reverse .flex-img:before {
        display: none; }
      .flex-section.reverse .flex-img:after {
        right: -120px !important;
        content: "";
        position: absolute;
        height: 120%;
        background: #fff;
        width: 100px;
        -webkit-transform: skewX(12deg);
        -moz-transform: skewX(12deg);
        transform: skewX(12deg); }
        @media screen and (max-width: 768px) {
          .flex-section.reverse .flex-img:after {
            display: none; } }
    .flex-section.reverse .col-2 {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0; }
      @media screen and (max-width: 992px) {
        .flex-section.reverse .col-2 {
          position: relative; } }
    .flex-section.reverse .col-1 {
      left: 38%;
      position: relative; }
      @media screen and (max-width: 992px) {
        .flex-section.reverse .col-1 {
          left: 0; } }
      .flex-section.reverse .col-1 .text {
        padding-left: 10%;
        padding-right: 40%; }
        @media screen and (max-width: 1200px) {
          .flex-section.reverse .col-1 .text {
            padding-right: 30%; } }
        @media screen and (max-width: 768px) {
          .flex-section.reverse .col-1 .text {
            padding-left: 15px;
            padding-right: 15px;
            padding-top: 0;
            padding-bottom: 0; } }

#gtco-header,
#gtco-counter,
.gtco-bg {
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  position: relative; }

  #gtco-header,
  #gtco-counter,
  .gtco-bg {
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
    position: relative; }

  .gtco-cover {
    height: 700px;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    position: relative;
    float: left;
    width: 100%; }
    .gtco-cover a {
      color: #66D37E; }
      .gtco-cover a:hover {
        color: white; }
    .gtco-cover .overlay {
      z-index: 1;
      position: absolute;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.5); }
    .gtco-cover > .gtco-container {
      position: relative;
      z-index: 10; }
    @media screen and (max-width: 768px) {
      .gtco-cover {
        height: 400px; } }
    .gtco-cover .display-t,
    .gtco-cover .display-tc {
      height: 900px;
      display: table;
      width: 100%; }
      @media screen and (max-width: 768px) {
        .gtco-cover .display-t,
        .gtco-cover .display-tc {
          height: 400px; } }
    .gtco-cover.gtco-cover-sm {
      height: 400px; }
      @media screen and (max-width: 768px) {
        .gtco-cover.gtco-cover-sm {
          height: 400px; } }
      .gtco-cover.gtco-cover-sm .display-t,
      .gtco-cover.gtco-cover-sm .display-tc {
        height: 400px;
        display: table;
        width: 100%; }
        @media screen and (max-width: 768px) {
          .gtco-cover.gtco-cover-sm .display-t,
          .gtco-cover.gtco-cover-sm .display-tc {
            height: 400px; } }
    .gtco-cover.gtco-cover-xs {
      height: 500px; }
      @media screen and (max-width: 768px) {
        .gtco-cover.gtco-cover-xs {
          height: inherit !important;
          padding: 3em 0; } }
      .gtco-cover.gtco-cover-xs .display-t,
      .gtco-cover.gtco-cover-xs .display-tc {
        height: 500px;
        display: table;
        width: 100%; }
        @media screen and (max-width: 768px) {
          .gtco-cover.gtco-cover-xs .display-t,
          .gtco-cover.gtco-cover-xs .display-tc {
            padding: 3em 0;
            height: inherit !important; } }


</style>
