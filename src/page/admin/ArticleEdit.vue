<template lang="html">
<div class="">
  <h1 class="page-header">编辑文章
    <a v-on:click="savechange()" class="btn btn-primary pull-right">保存</a>
    <a v-on:click="$router.go(-1)" class="btn pull-right">返回</a>
  </h1>

  <div class="alert alert-dismissible fade in" role="alert" :class="savesuccess ? 'alert-success' : 'alert-danger'" v-if="savesuccess !== null">
    <button type="button" class="close" aria-label="Close" v-on:click="savesuccess = null"><span aria-hidden="true">×</span></button>
    <strong>{{ savesuccess ? 'success' : 'failed' }}</strong>
  </div>


  <div class="form-group">
    <label>标题</label>
    <input type="text" class="form-control" placeholder="标题" v-model="moding.title"></input>
  </div>
  <div class="form-group">
    <label>作者</label>
    <input type="text" class="form-control" placeholder="作者(可选)" v-model="moding.author"></input>
  </div>
  <div class="form-group">
    <label>分类</label>
    <select multiple class="form-control" v-model="moding.cates">
      <option v-for="cate in cates" v-bind:value="cate.id" :selected="moding.cates.indexOf(cate.id) !== -1">{{ cate.name }}</option>
    </select>
  </div>
  <div class="">
    <label>内容</label>
    <ueditor
    v-model="moding.content"
    ref="myUeditor"></ueditor>
  </div>
</div>
</template>

<script>
import ueditor from '@/components/Ueditor'
import {mapState, mapMutations} from 'vuex'

import {
  getArticle,
  addArticle,
  editArticle,
  getAllCates,
} from './../../service/getData'

export default {
  data() {
    return {
      savesuccess: null,
      moding: {
        id: null,
        title: '',
        author: '',
        content: '',
        cates: [],
      },
      cates: {},
    }
  },
  computed: {
    ...mapState(['articles'])
  },
  components: {
    ueditor,
  },
  watch: {
    '$route': 'changeContent'
  },
  created() {
    getAllCates().then(obj => {
      if (Array.isArray(obj)) {
        obj.map(i => {
          this.cates[i.id] = i
        })
      }
    })

    this.changeContent()
  },
  actived() {
    this.changeContent()
  },
  methods: {
    changeContent() {
      this.savesuccess = null

      const routeName = this.$route.name
      if (routeName === 'articleNew') this.newArticle()
      else if (routeName === 'articleEdit') {
        const articleId = this.$route.params.id
        this.modifyAritcle(articleId)
      }
    },
    newArticle() {
      this.moding = {
        id: null,
        title: '',
        author: '',
        content: '',
        cates: [],
      }
    },
    modifyAritcle(id) {
      getArticle(id).then(obj => {
        if (obj.author === 'null' || obj.author === null) {
          obj.author = ''
        }
        obj.cates = obj.cates.map(i => i.id)
        this.moding = obj
      })
    },
    savechange() {
      const params = Object.assign({}, this.moding)
      params.cates = params.cates.map(i => i + '').join(',')
      if (!this.moding.id) {
        addArticle(params).then(obj => {
          if ('error' in obj) {
            this.savesuccess = false
          } else {
            this.articles.push(obj)
            this.savesuccess = true
          }
        })
      } else {
        editArticle(this.moding.id, params).then(obj => {
          if ('error' in obj) {
            this.savesuccess = false
          } else {
            this.savesuccess = true

            this.articles = this.articles.map(i => {
              if (i.id === this.moding.id) {
                return this.moding
              } else {
                return i
              }
            })
          }
        })
      }
    },
  }
}
</script>

<style lang="scss">
</style>
