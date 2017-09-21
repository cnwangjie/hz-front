<template lang="html">
<div>
  <navbar></navbar>

  <blank></blank>

  <div class="flex-section gray-bg home-page">
    <div class="col-1">
      <div class="text">
				<div class="row row-pb-sm">
					<div class="col-md-12">
            <div>

              <!-- Nav tabs -->
              <ul class="nav nav-tabs home-overview-btn" role="tablist">
                <li v-for="item, index in overviews"
                    :class="index === 0 ? 'active' : ''">
                  <a v-bind:href="'#item' + index"
                     v-bind:aria-controls="'item' + index"
                     role="tab" data-toggle="tab">
                    <span>{{ item.name }}</span>
                  </a>
                </li>
              </ul>

              <!-- Tab panes -->
              <div class="tab-content">
                <div v-for="item, index in overviews" role="tabpanel" class="tab-pane fade" :class="index === 0 ? 'active in' : ''" v-bind:id="'item' + index" v-html="item.content">
                </div>
              </div>

            </div>
          </div>
				</div>
			</div>
    </div>
    <div class="col-2 flex-img" style="background-image: url(https://freehtml5.co/demos/honest/premium/images/img_1.jpg);"></div>
  </div>

  <div class="gtco-cover gtco-cover-sm" style="background-image: url(/static/blank.jpeg); background-position: 50% -77.5px;" data-stellar-background-ratio="0.5">
		<div class="overlay"></div>
		<div class="gtco-container text-center">
			<div class="display-t">
				<div class="display-tc">
					<h1>文化</h1>
				</div>
			</div>
		</div>
	</div>

  <div id="gtco-counter">
  		<div class="gtco-container">

  			<!-- <div class="row">
  				<div class="col-md-8 col-md-offset-2 text-center gtco-heading animate-box fadeInUp animated-fast">
  					<h2>Facts</h2>
  					<p>Dignissimos asperiores vitae velit veniam totam fuga molestias accusamus alias autem provident. Odit ab aliquam dolor eius.</p>
  				</div>
  			</div> -->

  			<div class="row">

  				<div class="col-md-3 col-sm-6 animate-box fadeInUp animated-fast" data-animate-effect="fadeInUp">
  					<div class="feature-center">
  						<span class="counter js-counter" data-from="0" data-to="196" data-speed="5000" data-refresh-interval="50">196</span>
  						<span class="counter-label">文章</span>

  					</div>
  				</div>
  				<div class="col-md-3 col-sm-6 animate-box fadeInUp animated-fast" data-animate-effect="fadeInUp">
  					<div class="feature-center">
  						<span class="counter js-counter" data-from="0" data-to="97" data-speed="5000" data-refresh-interval="50">97</span>
  						<span class="counter-label">图片</span>
  					</div>
  				</div>
  				<div class="col-md-3 col-sm-6 animate-box fadeInUp animated-fast" data-animate-effect="fadeInUp">
  					<div class="feature-center">
  						<span class="counter js-counter" data-from="0" data-to="12402" data-speed="5000" data-refresh-interval="50">12402</span>
  						<span class="counter-label">动漫</span>
  					</div>
  				</div>
  				<div class="col-md-3 col-sm-6 animate-box fadeInUp animated-fast" data-animate-effect="fadeInUp">
  					<div class="feature-center">
  						<span class="counter js-counter" data-from="0" data-to="12202" data-speed="5000" data-refresh-interval="50">12202</span>
  						<span class="counter-label">视频</span>

  					</div>
  				</div>

  			</div>
  		</div>
  	</div>

    <searchForm></searchForm>

    <foot></foot>

</div>
</template>

<script>
import sidebar from './../components/Sidebar'
import navbar from './../components/Navbar'
import foot from './../components/Foot'
import blank from './../components/Blank'
import searchForm from './../components/SearchForm'
import overviews from './../assets/homeSection'
import {getLastestArticle} from './../service/getData'

export default {
  data() {
    return {
      overviews
    }
  },
  components: {
    sidebar,
    navbar,
    blank,
    searchForm,
    foot,
  },
  created() {
    window.document.title = '首页 | 徽州文化服务云平台'
  },
  methods: {
  }
}
</script>

<style lang="scss">

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
