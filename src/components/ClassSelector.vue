<template lang="html">
<div class="class-btn">
  <ul>
    <li v-for="c, index in classes" v-if="index > from - 1 && index < from + length"
      :style="{'max-width': 99 / col + '%'}">
      <router-link :to="'/class/' + c.title + '/' + ($route.params.type ? $route.params.type : 'photo')">
        <img
        :src="'/static/rightlogo/' + c.btnImg" alt=""></img>
      </router-link>
    </li>
  </ul>
</div>
</template>

<script>
import classBtn from './../assets/classBtn'

export default {
  data() {
    return {
      classes: {},
    }
  },
  props: {
    from: {
      type: Number,
      default: 0,
    },
    length: {
      type: Number,
      default: Infinity,
    },
    col: {
      type: Number,
      default: 1,
    },
  },
  created() {
    const btnSum = Object.keys(classBtn).length
    const add = ((btnSum / this.col << 0) + (btnSum / this.col)==0 ? 0:1) * this.col - btnSum
    this.classes = Object.keys(classBtn).map(i => {
      return {
        title: i,
        btnImg: classBtn[i],
      }
    })
    for (let i = 0; i < add; i += 1) {
      this.classes.push(this.classes[i])
    }
  }
}
</script>

<style lang="scss">
.class-btn {
  position: relative;
  ul {
    padding: 0;
    margin-left: auto;
    margin-right: auto;
    li {
      display: inline-block;
      list-style: none;
      padding: 5px;
      img {
        width: 100%;
        height: auto;
        background-color: #e7e5d0;
        border-radius: 80px;
        box-shadow: 1px 1px 4px black;
        transition: 0.5s;
        &:hover {
          transition: 0.5s;
          box-shadow: 2px 2px 8px black;
        }
      }
    }

    @media (max-width: 767px) {
      li {
        max-width: 33%;
      }
    }
  }
}
</style>
