<template lang="html">
<div id="gtco-subscribe">
	<div class="gtco-container">
		<div class="row animate-box fadeInUp animated-fast">
			<div class="col-md-8 col-md-offset-2 text-center gtco-heading">
				<h2>搜索</h2>
				<p></p>
			</div>
		</div>
		<div class="row animate-box fadeInUp animated-fast">
			<div class="col-md-8 col-md-offset-2">
				<form class="form-inline" id="fh5co-subscribe" novalidate="novalidate" _lpchecked="1">
					<div class="col-md-6 col-sm-6">
						<div class="form-group">
							<label for="fh5co-email" class="sr-only">关键词</label>
							<input type="text"
                     v-model="toSearchWord"
                     v-on:keydown.enter="search()"
                     class="form-control"
                     placeholder="关键词">
							<p id="fh5co-subscribe-response"></p>
						</div>
					</div>
					<div class="col-md-6 col-sm-6">
						<button type="submit" v-on:click="search()" class="btn btn-default btn-block">搜索</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      toSearchWord: '',
    }
  },
  created() {

  },
  methods: {
    search() {
      const word = this.toSearchWord
      if (word) this.$router.push(`/search?word=${word}`)
    }
  }
}
</script>

<style lang="scss">

#gtco-subscribe {
  background: gray; }
  #gtco-subscribe .form-control {
    background: transparent;
    color: #fff;
    font-size: 16px !important;
    width: 100%;
    border: 2px solid rgba(255, 255, 255, 0.2) !important;
    -webkit-transition: 0.5s;
    -o-transition: 0.5s;
    transition: 0.5s; }
    #gtco-subscribe .form-control:focus {
      background: transparent;
      border: 2px solid rgba(255, 255, 255, 0.8) !important; }
    #gtco-subscribe .form-control::-webkit-input-placeholder {
      color: #fff; }
    #gtco-subscribe .form-control:-moz-placeholder {
      /* Firefox 18- */
      color: #fff; }
    #gtco-subscribe .form-control::-moz-placeholder {
      /* Firefox 19+ */
      color: #fff; }
    #gtco-subscribe .form-control:-ms-input-placeholder {
      color: #fff; }
  #gtco-subscribe .btn {
    height: 46px;
    border: none !important;
    background: #fff;
    color: #66D37E;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 400;
    padding-left: 50px;
    padding-right: 50px; }
  #gtco-subscribe .form-inline .form-group {
    width: 100% !important;
    margin-bottom: 10px; }
    #gtco-subscribe .form-inline .form-group .form-control {
      width: 100%; }
  #gtco-subscribe .gtco-heading {
    margin-bottom: 30px; }
    #gtco-subscribe .gtco-heading h2 {
      color: #fff; }
    #gtco-subscribe .gtco-heading p {
      color: rgba(255, 255, 255, 0.5); }
</style>
