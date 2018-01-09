<template lang="html">
<div class="">
  <h1 class="page-header">编辑文章
    <a v-on:click="savechange()" class="btn btn-primary pull-right">保存</a>
    <a v-on:click="$router.go(-1)" class="btn pull-right">返回</a>
    <a v-on:click="clearContent()" class="btn pull-right">清空</a>
  </h1>

  <div class="alert alert-dismissible fade in" role="alert" :class="savesuccess ? 'alert-success' : 'alert-danger'" v-if="savesuccess !== null">
    <button type="button" class="close" aria-label="Close" v-on:click="savesuccess = null"><span aria-hidden="true">×</span></button>
    <strong>{{ savesuccess ? '保存成功' : '保存失败' }}</strong>
    <div v-if="savesuccess">
      <router-link :to="'/article/' + moding.id">查看</router-link>
      <router-link :to="'/admin/article'">返回</router-link>
      <a href="javascript:void(0)" v-on:click="newArticle()">继续添加一下篇</a>
    </div>
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
      <option v-for="cate in cates"
        v-bind:value="cate.id"
        :selected="moding.cates.indexOf(cate.id) !== -1">
        {{ cate.name }}
      </option>
    </select>
  </div>
  <div v-if="moding.id" class="form-group">
    <label>链接到该文章的图片</label>
    <div>
      <img v-on:click="showUploadImageModal()" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" class="add-btn-image linked-image img-thumbnail"></img>
      <img v-on:click="previewImage(image)" v-for="image in linkedImages" :src="image.url" alt="" class="linked-image img-thumbnail"></img>
    </div>
  </div>

  <div class="">
    <label>内容</label>
    <ueditor
    v-model="moding.content"
    ref="myUeditor"></ueditor>
  </div>



  <div class="modal fade bs-example-modal-lg" id="uploadImage" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">上传图片</h4>
        </div>
        <div class="modal-body">

          <div class="form-group">
            <label>分类</label>
            <select class="form-control" v-model="uploadImageCateId">
              <option v-for="cate in cates"
                v-bind:value="cate.id">
                {{ cate.name }}
              </option>
            </select>
          </div>

          <div class="alert alert-dismissible fade in" role="alert" :class="uploadmsg.status === 'success' ? 'alert-success' : 'alert-danger'" v-if="uploadmsg">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
            <strong>{{ uploadmsg.status }}</strong> {{ uploadmsg.msg }}
          </div>

          <div v-if="uploading" class="progress">
            <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" v-bind:style="'width: ' + uploadProgress">
              <span class="sr-only">{{ uploadProgress }} Complete</span>
            </div>
          </div>

          <input v-on:change="changeToUploadFile" name="file" type="file"></input>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" v-on:click="upload()">Upload</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade bs-example-modal-lg" id="preview" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{ previewingResource.path }}</h4>
        </div>
        <div class="modal-body">
          <img class="preview-item" :src="previewingResource.url"></img>

          <div class="form-group">
            <label>描述</label>
            <input type="text" class="form-control" placeholder="描述" v-model="previewingResource.description"></input>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary" v-on:click="editInfo()">保存</button>
          <button type="button" class="btn btn-warning" v-on:click="unbind()">取消链接</button>
          <button type="button" class="btn btn-danger" v-on:click="deleteImage()">删除</button>
        </div>
      </div>
    </div>
  </div>


</div>
</template>

<script>
import {apiurl} from '../../service/config'
import ueditor from '@/components/Ueditor'
import {mapState, mapMutations} from 'vuex'

import {
  getArticle,
  addArticle,
  editArticle,
  getAllCates,
  getArticleLinkedImage,
  editResourceInfo,
  uploadFile,
  deleteResource,
} from './../../service/getData'

const newArticle = {
  id: null,
  title: '',
  author: '',
  content: '',
  cates: [],
}

export default {
  data() {
    return {
      savesuccess: null,
      moding: Object.assign({}, newArticle),
      cates: [],
      linkedImages: [],
      uploadImageCateId: null,
      uploadApiUrl: `${apiurl}/api/resource/upload`,
      uploadHeaders: {
        Authorization: localStorage.getItem('admin-token'),
      },
      toUploadFile: {},
      uploading: false,
      uploadmsg: null,
      uploadProgress: 0,
      previewingResource: {},
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
    this.getCates()
    this.changeContent()
  },
  actived() {
    this.changeContent()
  },
  methods: {
    clearContent() {
      if (confirm('确定清空？')) this.newArticle()
    },
    getCates() {
      if (Object.keys(this.cates).length === 0) {
        getAllCates().then(obj => {
          if (Array.isArray(obj)) {
            this.cates = obj
          }
        })
      }
    },
    changeContent() {
      this.savesuccess = null

      const routeName = this.$route.name
      if (this.moding.id !== null && routeName === 'articleNew') this.newArticle()
      else if (routeName === 'articleEdit') {
        const articleId = this.$route.params.id
        this.modifyAritcle(articleId)
      }
    },
    newArticle() {
      this.savesuccess = null
      this.linkedImages = []
      this.moding = Object.assign({}, newArticle)
    },
    getArticleLinkedImages() {
      getArticleLinkedImage(this.moding.id).then(obj => {
        if (Array.isArray(obj)) {
          this.linkedImages = obj
        }
      })
    },
    modifyAritcle(id) {
      this.newArticle()
      getArticle(id).then(obj => {
        if ('error' in obj) return

        if (obj.author === 'null' || obj.author === null) {
          obj.author = ''
        }
        obj.cates = obj.cates.map(i => i.id)
        this.moding = obj

        this.getArticleLinkedImages()
      })
    },
    savechange() {
      const params = {}
      if (this.moding.title) params.title = this.moding.title
      if (this.moding.author) params.author = this.moding.author
      if (this.moding.id) params.id = this.moding.id
      params.content = this.moding.content || ''
      if (this.moding.cates.length > 0)
        params.cates = this.moding.cates.map(i => i + '').join(',')

      if (!this.moding.id) {
        addArticle(params).then(obj => {
          if ('error' in obj) {
            this.savesuccess = false
          } else {
            this.articles.push(obj)
            this.moding = obj
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
    uploadSuccess() {
      this.$forceUpdate()
    },
    showUploadImageModal() {
      if (this.moding.id) {
        $('#uploadImage').modal('show')
      }
    },
    changeToUploadFile(e) {
      this.toUploadFile = e.target.files
    },
    upload() {
      this.uploading = true
      const that = this
      const path = 'photo/' + (this.uploadImageCateId ? this.cates
        .filter(cate => cate.id === this.uploadImageCateId).shift().name : '')
      uploadFile({
        path,
        files: this.toUploadFile,
        progressHandler(progress) {
          that.uploadProgress = progress + '%'
        }
      }).then(json => {
        this.uploading = false
        if ('status' in json) {
          this.uploadmsg = json
          if (json.status === 'success') {
            this.toUploadFile = {}
            editResourceInfo({
              path: json.resource.path,
              link: this.moding.id + '',
            }).then(obj => {
              this.getArticleLinkedImages()
            })
          }
        }
      }).catch(err => {
        this.uploading = false
      })
    },
    previewImage(image) {
      $('#preview').modal('show')
      this.previewingResource = image
    },
    editInfo() {
      editResourceInfo(this.previewingResource).then(obj => {
        if ('path' in obj) {
          $('#preview').modal('hide')
        } else {

        }
      })
    },
    deleteImage() {
      if (confirm(`确定删除 ${this.previewingResource.path} ?`)) {
        deleteResource(this.previewingResource.path).then(() => {
          this.getArticleLinkedImages()
          $('#preview').modal('hide')
        })
      }
    },
    unbind() {
      editResourceInfo({
        path: this.previewingResource.path,
        link: '',
      }).then(obj => {
        this.getArticleLinkedImages()
        $('#preview').modal('hide')
      })
    },
  }
}
</script>

<style lang="scss">
.linked-image {
  width: 150px;
  height: 150px;
  cursor: pointer;
}

.add-btn-image {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACbVBMVEUAAAAsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMAAAAEBQUsLzMsLzMsLzMAAAAEBAUsLzMsLzMsLzMAAAA8kso8kso8kso8kso8ksosLzMsLzMsLzMCAgM8kso8kso8kso8kso8ksosLzMsLzMsLzMsLzMEBAU8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8ksoAAAA8kso8kso8kso8kso8kso8kso8kso8kso8kso8ksoBAgI8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8ksoCBAU8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8ksoAAAA8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8kso8ksosLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMAAAAsLzMsLzMAAAAAAAAAAAAsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMsLzMAAADq2pejAAAAznRSTlMAAAAAAAAAAAAAAANhmpqampdAAAAJw8qZm5rdlwAACcJsAAAAAMJtAAAAAAAAAAADAwAAAAAAAABkbAAAAAAmFgAAm50AAAAGsWYAAAnDbQAACcJtAAAAAAAAAATBagAAAAAxbW1sctyram1lFgAAAFbCwsHE8MK0JwAAAAEICQgRxAkHAAAAAAAAAAAAAAAACcJtAAjAbgAAAVc4AAAAAAAAwmoAmQAJxK5qypoAAAWKxGkAAAAJCQMAAAAAAAAAAAAAnW0DnGwDAAAAAI91YOgAAAABYktHRACIBR1IAAAACXBIWXMAAAEYAAABGABXSV8eAAAAB3RJTUUH4AcaFhcKqulogwAAAZdJREFUOMtjYAABRiZmFlZMwMbOwQmWZ+Di5uHl48cAAoJCwhAFIqJi4hKSGEBKWkYWokBOXkFRSRkDqEgJqMIUqKlraKIDLWVJflYGRm0dXT2wAgZ0oA9WwGRgaGSMpMDE1MzcAlkBs6WVtQ2SAls7ewdHZAVOzi6ubkgK3D08vbyRFbDySyrrIynw8fXzD8CnIDAoOCQUh4Kw8IjIqOiY2Lj40ADvBAtMBYlJySmpaekZmVkh2Tm5eZgK8gsKi4pLSssyYoPLKyqrMBVU19TW1Tc0NqXHBDW3tLZhcWR7R2dXd0NJWnRgT29fPw5fTJg4aXIoPm9OmTpt+gx8CmbOmj1nLj4F8+YvWLgInwKM6CZWweIlSzUwgNIyPqiC5StWrlqtjgEU16xdB1GwfsPGlYvVMIDCps1bIAq2btuwXR4L2LFzF0TB7j3r98phASJcjGAFWhgpXnPf/gNQv6gKSKlgZhnlg4cO60IUyMpIS2FmOskjR4/pQBQICwkKYGZb/uMnTp6CKODkYGfDkvNPnznLCJYHAN2DmYjMyBOuAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTExLTEyVDExOjIyOjA3KzA4OjAwsTBz3wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNi0wNy0yNlQyMjoyMzoxMCswODowMI8xlM4AAABNdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDcuMC4xLTYgUTE2IHg4Nl82NCAyMDE2LTA5LTE3IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3Jn3dmlTgAAAGN0RVh0c3ZnOmNvbW1lbnQAIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgzkiQCwAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABl0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQAMjA5MWYNWhcAAAAYdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgAMjA5MXNEhg4AAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTQ2OTU0Mjk5MK5ZZI8AAAASdEVYdFRodW1iOjpTaXplADI4LjdLQgOFfUIAAABfdEVYdFRodW1iOjpVUkkAZmlsZTovLy9ob21lL3d3d3Jvb3Qvc2l0ZS93d3cuZWFzeWljb24ubmV0L2Nkbi1pbWcuZWFzeWljb24uY24vc3JjLzEyMDI2LzEyMDI2NTgucG5nCNTPlQAAAABJRU5ErkJggg==');
  background-repeat: no-repeat;
  background-size: 25%;
  background-position: center;
}
</style>
