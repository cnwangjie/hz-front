<template lang="html">
    <div class="row">
      <div class="col-sm-offset-1" v-bind:class="side ? 'col-sm-7' : 'col-sm-10'" v-html="content">
      </div>
      <sidebar v-if="sidebar"></sidebar>
    </div>
</template>

<script>
import sidebar from './Sidebar'
export default {
  data() {
    return {
      content: 'ttt',
      sidebar: false
    }
  },
  components: {
    sidebar
  }
}
</script>

<style lang="css">
</style>
