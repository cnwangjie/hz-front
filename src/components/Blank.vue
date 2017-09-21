<template lang="html">
  <header id="gtco-header" class="gtco-cover gtco-cover-md" role="banner" style="background-image: url(/static/blank.jpeg);" :style="headerImgStyle" data-stellar-background-ratio="0.5">
    <div class="overlay"></div>
		<div class="gtco-container">
			<div class="row row-mt-15em">
				<div class="col-md-12 mt-text text-center animate-box fadeInUp animated-fast" data-animate-effect="fadeInUp">
					<h1>徽州文化服务云平台</h1>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
export default {
  data() {
    return {
      headerImgStyle: {
        'background-position': '50% 0px'
      }
    }
  },
  created() {
    window.addEventListener('scroll', e => {
      this.headerImgStyle['background-position'] = `50% ${scrollY / 2}px`
    })
  }
}
</script>

<style lang="scss">
#gtco-header {
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    -webkit-transition: 0.5s;
    -o-transition: 0.5s;
    transition: 0.5s;
  }
  .mt-text {
    margin-top: 7em;
    margin-bottom: 3em;
    h1 {
      font-size: 59px;
      margin: 0;
      padding: 0;
      color: white !important;

    }
    @media screen and (max-width: 768px) {
      h1 {
        font-size: 34px;
        line-height: 1.2;
      }
    }
  }

}
</style>
