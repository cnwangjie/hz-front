<template lang="html">
<div>
  <navbar></navbar>
  <div class="container main">
    <div class="row">
      <div class="col-sm-offset-1" v-bind:class="side ? 'col-sm-7' : 'col-sm-10'" v-html="content">
      </div>
      <sidebar v-if="sidebar"></sidebar>
    </div>
  </div>
  <foot></foot>
</div>
</template>

<script>
import sidebar from './../components/Sidebar'
import navbar from './../components/Navbar'
import foot from './../components/Foot'
export default {
  data() {
    return {
      content: 'ttt',
      sidebar: false
    }
  },
  components: {
    sidebar,
    navbar,
    foot
  }
}
</script>

<style lang="css">

</style>
