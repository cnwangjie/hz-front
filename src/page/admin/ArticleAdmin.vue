<template lang="html">
<div>
  <h1 class="page-header">文章管理</h1>
  <div class="row placeholders">
    <div class="col-xs-6 col-sm-3 placeholder">
      <div class="squre-block" style="background: lightgreen">
        <h4>文章总数</h4>
        <span class="text-muted">{{ articlesum }}</span>
      </div>
    </div>
  </div>
  <a v-on:click="newArticle()" class="btn btn-primary">添加文章</a>
  <h2 class="sub-header">管理</h2>
  <input type="text" class="form-control" placeholder="搜索" v-model="searchword"></input>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>标题</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in articles" v-if="!a.hide">
          <td>{{ a.id }}</td>
          <td>{{ a.title }}</td>
          <td>
            <a v-on:click="modifyAritcle(a.id)" class="btn btn-sm btn-warning">修改</a>
            <a v-on:click="removeArticle(a.id)" class="btn btn-sm btn-danger">删除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="modal fade bs-example-modal-lg" id="modarticle" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <input type="text" class="form-control" placeholder="标题" v-model="moding.title"></input>
          <input type="text" class="form-control" placeholder="作者" v-model="moding.author"></input>
          <quill-editor ref="myTextEditor"
              v-model="moding.content"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)">></quill-editor>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" v-on:click="savechange()">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {quillEditor} from 'vue-quill-editor'

import {
  getAllArticle,
  deleteArticle,
  getArticle,
  addArticle,
  editArticle
} from './../../service/getData'

export default {
  data() {
    return {
      moding: {
        id: null,
        title: '',
        author: '',
        content: '',
      },
      searchword: '',
      articlesum: 0,
      articles: [],
    }
  },
  watch: {
    'searchword': 'search'
  },
  components: {
    quillEditor
  },
  created() {
    getAllArticle().then(obj => {
      if (obj instanceof Array) {
        this.articles = obj
        this.articlesum = obj.length
      }
    })
  },
  methods: {
    removeArticle(id) {
      deleteArticle(id)
      this.articles = this.articles.filter(i => i.id != id)
    },
    newArticle() {
      $('#modarticle').modal('show')
      this.moding = {
        id: null,
        title: '',
        author: '',
        content: '',
      }
    },
    modifyAritcle(id) {
      getArticle(id).then(obj => {
        this.moding = obj
        $('#modarticle').modal('show')
      })
    },
    savechange() {
      if (!this.moding.id) {
        addArticle(this.moding).then(obj => {
          if ('error' in obj) {

          } else {
            this.articles.push(obj)
          }
        })
      } else {
        editArticle(this.moding.id, this.moding).then(obj => {
          this.articles.map(i => i.id == this.moding.id ? obj : i)
        })
      }
      $('#modarticle').modal('hide')
    },
    search() {
      const wd = this.searchword
      console.log(wd)
      this.articles.map(i => {
        if (i.id.toString().indexOf(wd) !== -1 || i.title.indexOf(wd) !== -1) {
          i.hide = false
        } else {
          i.hide = true
        }
        return i
      })
    }
  }
}
</script>

<style lang="scss">
.squre-block {
  margin: 20px;
  padding: 20px;
}
</style>
