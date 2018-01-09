<template lang="html">
<div>
  <h1 class="page-header">文章管理</h1>
  <!-- <div class="row placeholders">
    <div class="col-xs-6 col-sm-3 placeholder">
      <div class="squre-block" style="background: lightgreen">
        <h4>文章总数</h4>
        <span class="text-muted">{{ articlesum }}</span>
      </div>
    </div>
  </div> -->
  <a v-on:click="getArticleList()" class="btn btn-primary">更新文章列表</a>
  <!-- <a v-on:click="newArticle()" class="btn btn-primary">添加文章</a> -->
  <router-link :to="'/admin/article/new'" class="btn btn-primary">添加文章</router-link>
  <span>共有 <b>{{ articlesum }}</b> 篇文章</span>
  <h2 class="sub-header">管理</h2>
  <input type="text" class="form-control" placeholder="搜索" v-model="searchword"></input>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>标题</th>
          <th>分类</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="a in articles" v-if="!a.hide">
          <td>{{ a.id }}</td>
          <td><router-link :to="'/article/' + a.id">{{ a.title }}</router-link></td>
          <td>{{ a.cates.map(i => cates[i].name).join(',') }}</td>
          <td>
            <!-- <a v-on:click="modifyAritcle(a.id)" class="btn btn-sm btn-warning">编辑</a> -->
            <router-link :to="`/admin/article/${a.id}`" class="btn btn-sm btn-warning">编辑</router-link>
            <a v-on:click="removeArticle(a.id)" class="btn btn-sm btn-danger">删除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- <div class="modal fade bs-example-modal-lg" id="modarticle" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">编辑文章</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="">标题</label>
            <input type="text" class="form-control" placeholder="标题" v-model="moding.title"></input>
          </div>
          <div class="form-group">
            <label for="">作者</label>
            <input type="text" class="form-control" placeholder="作者" v-model="moding.author"></input>
          </div>
          <div class="form-group">
            <label for="">分类</label>
            <select multiple class="form-control" v-model="moding.cates">
              <option v-for="cate in cates" v-bind:value="cate.id" :selected="moding.cates.indexOf(cate.id) !== -1">{{ cate.name }}</option>
            </select>
          </div>
          <div class="">
            <label for="">内容</label>
            <quill-editor ref="myTextEditor"
            v-model="moding.content"
            :options="editorOption"></quill-editor>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" v-on:click="savechange()">Save changes</button>
        </div>
      </div>
    </div>
  </div> -->
</div>
</template>

<script>
import {quillEditor} from 'vue-quill-editor'

import {
  getAllArticle,
  deleteArticle,
  getArticle,
  addArticle,
  editArticle,
  getAllCates,
} from './../../service/getData'

export default {
  data() {
    return {
      moding: {
        id: null,
        title: '',
        author: '',
        content: '',
        cates: [],
      },
      editorOption: {
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],
              [{ 'indent': '-1'}, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
            handlers: {
              'image': function() {
                const range = this.quill.getSelection()
                const value = prompt('What is the image URL')
                if (value)
                  this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER)
              }
            }
         }
        }
      },
      searchword: '',
      articlesum: 0,
      articles: [],
      lastUpdate: 0,
      cates: {},
    }
  },
  watch: {
    'searchword': 'search'
  },
  components: {
    quillEditor,
  },
  created() {
    getAllCates().then(obj => {
      if (Array.isArray(obj)) {
        obj.map(i => {
          this.cates[i.id] = i
        })
      }
    })
    this.getArticleList()
  },
  actived() {
    if (Date.now() - this.lastUpdate > 60 * 1E3) {
      this.getArticleList()
    }
  },
  methods: {
    getArticleList() {
      getAllArticle().then(obj => {
        if (Array.isArray(obj)) {
          this.articles = obj
          this.articlesum = obj.length
          this.lastUpdate = Date.now()
        }
      })
    },
    removeArticle(id) {
      if (confirm(`确定删除《${this.articles.filter(i => i.id === id).shift().title}》 吗？`)) {
        deleteArticle(id)
        this.articles = this.articles.filter(i => i.id != id)
      }
    },
    newArticle() {
      $('#modarticle').modal('show')
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
        $('#modarticle').modal('show')
      })
    },
    savechange() {
      const params = Object.assign({}, this.moding)
      params.cates = params.cates.map(i => i + '').join(',')
      if (!this.moding.id) {
        addArticle(params).then(obj => {
          if ('error' in obj) {

          } else {
            this.articles.push(obj)
          }
        })
      } else {
        editArticle(this.moding.id, params).then(obj => {
          if ('error' in obj) {

          } else {
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
      $('#modarticle').modal('hide')
    },
    search() {
      const wd = this.searchword
      this.articles.map(i => {
        const matched = i.id.toString().indexOf(wd) !== -1
          || i.title.indexOf(wd) !== -1
          || i.cates.map(j => this.cates[j].name).join(',').indexOf(wd) !== -1
        if (matched) {
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
