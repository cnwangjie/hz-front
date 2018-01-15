<template lang="html">
  <div class="player">
    <img v-if="src" class="player-control" :src="playing ? '/static/pause.svg' : '/static/mic.svg'" v-on:click="play()"></img>
    <audio :id="id" v-if="src" :src="src" display="none"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playing: false,
      id: '',
    }
  },
  props: {
    src: {
      type: String,
      default: null,
    }
  },
  created() {
    this.initPlayer()
  },
  methods: {
    initPlayer() {
      this.id = (Math.random() * 0xffffffff << 0).toString(16)
    },
    async play() {
      const player = document.getElementById(this.id)
      if (this.playing) await player.pause()
      else await player.play()

      this.playing = !player.paused
    },
  },
}
</script>

<style lang="scss">
.player {
  display: inline;
  .player-control {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
}
</style>
