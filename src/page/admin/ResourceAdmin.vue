<template lang="html">
<div>
  <h1 class="page-header">资源管理</h1>
  <ol class="breadcrumb">
    <li v-for="path, index in paths" :class="index === paths.length - 1 ? 'active' : ''">
      <a v-if="index !== paths.length - 1" v-on:click="changePath(path.path)" style="cursor: pointer">{{ path.name }}</a>
      <span v-if="index === paths.length - 1">{{ path.name }}</span>
    </li>
  </ol>
  <a v-on:click="showModal('#uploadfile')" class="btn btn-primary">上传文件</a>
  <!-- <a v-on:click="showModal('#mkdir')" class="btn btn-primary">创建目录</a> -->
  <a v-on:click="changePath(curpath)" class="btn btn-primary">刷新目录</a>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>文件</th>
          <th>大小</th>
          <th>修改时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="f in files">
          <td>
            <a v-on:click="preview(f.path)" v-if="isVisable(f.name)">{{ f.name }}</a>
            <a v-on:click="changePath(f.path)" v-else-if="f.isdir">{{ f.name }}</a>
            <span v-else>{{ f.name }}</span>
          </td>
          <td>{{ humanSize(f.size) }}</td>
          <td>{{ new Date(f.modified).toLocaleString() }}</td>
          <td>
            <a
            data-toggle="tooltip"
            data-placement="bottom"
            title="copied!"
            data-trigger="click"
            :clipdata="f.path" class="btn btn-sm btn-info clipbtn" v-if="!f.isdir">复制链接</a>
            <a v-on:click="changePath(f.path)" class="btn btn-sm btn-primary" v-if="f.isdir">进入目录</a>
            <a v-on:click="remove(f.path)" class="btn btn-sm btn-danger" v-if="false">删除</a>
            <a v-on:click="preview(f.path)" class="btn btn-sm" v-if="!f.isdir && isVisable(f.name)">设置属性</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="modal fade bs-example-modal-lg" id="uploadfile" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">上传文件</h4>
        </div>
        <div class="modal-body">

          <dropzone
            id="dropzone"
            :url="uploadApiUrl"
            :param-name="'file'"
            :headers="uploadHeaders"
            :maxFileSizeInMB="2048"
            :max-number-of-files="20"
            :timeout="60000"
            :vdropzone-success="() => {changePath(curpath)}">
            <input type="hidden" name="path" v-model="curpath">
          </dropzone>

          <!-- <div class="alert alert-dismissible fade in" role="alert" :class="uploadmsg.status === 'success' ? 'alert-success' : 'alert-danger'" v-if="uploadmsg">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
            <strong>{{ uploadmsg.status }}</strong> {{ uploadmsg.msg }}
          </div>

          <div v-if="uploading" class="progress">
            <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" v-bind:style="'width: ' + uploadProgress">
              <span class="sr-only">{{ uploadProgress }} Complete</span>
            </div>
          </div> -->

          <!-- <input v-on:change="changeToUploadFile" name="file" type="file"></input> -->
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <!-- <button type="button" class="btn btn-primary" v-on:click="uploadfile()">Upload</button> -->
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade bs-example-modal-lg" id="mkdir" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">创建目录</h4>
        </div>
        <div class="modal-body">
          <div class="alert alert-dismissible fade in" role="alert" :class="mkdirmsg.status === 'success' ? 'alert-success' : 'alert-danger'" v-if="mkdirmsg">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
            <strong>{{ mkdirmsg.status }}</strong> {{ mkdirmsg.msg }}
          </div>
          <input v-model="toMadeDirName" class="form-control" name="path" type="text"></input>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" v-on:click="makeDirectory()">Add</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade bs-example-modal-lg" id="preview" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{ previewingFilename }}</h4>
        </div>
        <div class="modal-body">
          <img class="preview-item" v-if="previewingFiletype === 'img'" :src="`${apiurl}/resource/${previewingFilename}`"></img>
          <video class="preview-item" v-if="previewingFiletype === 'video'" :src="`${apiurl}/resource/${previewingFilename}`" controls="controls"></video>

          <div class="form-group">
            <label>描述</label>
            <input type="text" class="form-control" placeholder="描述" v-model="previewingResource.description"></input>
          </div>

          <div class="form-group">
            <label>链接</label>
            <select class="form-control" v-model="previewingLinktype">
              <option :value="'link'">外部链接</option>
              <option :value="'article'">站内文章</option>
            </select>
            <!-- <input type="text" class="form-control" placeholder="链接" v-model="previewingResource.link"></input> -->
          </div>

          <div class="form-group">
            <label>链接</label>
            <input v-if="previewingLinktype === 'link'" class="form-control" v-model="previewingResource.link"></input>
            <select v-if="previewingLinktype === 'article'" class="form-control" v-model="previewingResource.link" >
               <option v-for="a in articles" :value="a.id">{{a.title}}</option>
            </select>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" v-on:click="editInfo()">Save</button>
        </div>
      </div>
    </div>
  </div>


</div>
</template>

<script>
import {apiurl} from './../../service/config'
import Dropzone from 'vue2-dropzone'
import Clipboard from 'clipboard'

import {
  getResources,
  getAllArticle,
  mkdir,
  uploadFile,
  getResourceInfo,
  editResourceInfo,
} from './../../service/getData'

export default {
  data() {
    return {
      articles: [],
      uploadApiUrl: `${apiurl}/api/resource/upload`,
      uploadHeaders: {
        Authorization: localStorage.getItem('admin-token'),
      },
      apiurl: apiurl,
      curpath: '',
      paths: [],
      files: [],
      toMadeDirName: '',
      toUploadFile: null,
      mkdirmsg: false,
      uploading: false,
      uploadProgress: '',
      uploadmsg: false,
      previewingFilename: '',
      previewingFiletype: '',
      previewingResource: {},
      previewingLinktype: 'article',
    }
  },
  components: {
    Dropzone,
  },
  watch: {
    'searchword': 'search',
    'curpath': 'resolvePaths',
    '$route.params': 'syncRouteToPath',
  },
  created() {
    this.syncRouteToPath()
    getAllArticle().then(obj => {
      if (Array.isArray(obj)) {
        this.articles = obj
      }
    })
  },
  updated() {
    new Clipboard('.clipbtn', {
      text: (trigger) => {
        const path = trigger.getAttribute('clipdata')
        return apiurl + '/resource/' + path
      }
    })
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-toggle="tooltip"]').each((index, item) => {
      $(item).on('shown.bs.tooltip', () => {
        setTimeout(() => {
          $(item).tooltip('hide')
        }, 1000)
      })
    })
  },
  methods: {
    resolvePaths() {
      this.paths = [{path: '/', name: 'root'}]
      if (this.curpath !== '/') {
        this.curpath.split('/').filter(i => i).map(i => {
          const lastPath = this.paths[this.paths.length - 1].path
          this.paths.push({
            path: lastPath + (lastPath === '/' ? '' : '/') + i,
            name: i,
          })
        })
      }
    },
    changePath(path) {
      this.curpath = path
      this.$router.replace(`/admin/resource/${path[0] === '/' ? path.substr(1) : path}`)
      getResources(path).then(obj => {
        if (obj instanceof Array) {
          this.files = obj
        }
      })
    },
    humanSize(b) {
      if (b === 0) return 0
      const i = Math.floor(Math.log(b) / Math.log(1024))
      return (b / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB'][i]
    },
    showModal(seletor) {
      $(seletor).modal('show')
    },
    makeDirectory() {
      mkdir(this.curpath, this.toMadeDirName).then(json => {
        if ('status' in json) {
          this.mkdirmsg = json
        } else {
          this.mkdirmsg = false
        }
      })
    },
    changeToUploadFile(e) {
      this.toUploadFile = e.target.files
    },
    uploadfile() {
      this.uploading = true
      const that = this
      uploadFile({
        path: this.curpath,
        files: this.toUploadFile,
        progressHandler(progress) {
          that.uploadProgress = progress + '%'
        }
      }).then(json => {
        if ('status' in json) {
          this.uploadmsg = json
        }
        this.uploading = false
      }).catch(err => {
        this.uploading = false
      })
    },
    copyLink(path) {
      prompt('请使用ctrl+c复制', apiurl + '/resource/' + path)
    },
    syncRouteToPath() {
      if (this.$route.name !== 'resourceAdmin')
        return

      if (this.$route.params.path)
        this.changePath(this.$route.params.path)
      else {
        this.changePath('/')
      }
    },
    isVisable(filename) {
      const suffix = filename.split('.').pop()
      const allowedSuffix = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'mp4']
      return allowedSuffix.indexOf(suffix.toLowerCase()) !== -1
    },
    preview(filepath) {
      switch (filepath.split('.').pop()) {
        case 'mp4':
          this.previewingFiletype = 'video'
          break;
        default:
          this.previewingFiletype = 'img'
      }
      this.previewingFilename = filepath
      getResourceInfo(filepath).then(obj => {
        if ('path' in obj) {
          for (let key in obj) {
            if (obj[key] === 'null') {
              obj[key] = ''
            }
          }
          this.previewingResource = obj
        } else {
          this.previewingResource = {
            id: 0,
            path: filepath,
            name: '',
            description: '',
            link: '',
          }
        }
      })
      $('#preview').modal('show')
    },
    editInfo() {
      editResourceInfo(this.previewingResource).then(obj => {
        if ('path' in obj) {
          $('#preview').modal('hide')
        } else {

        }
      })
    },
  }
}
</script>

<style lang="scss">
.squre-block {
  margin: 20px;
  padding: 20px;
}

#preview {
  .preview-item {
    display: block;
    max-width: 100%;
  }
}
</style>
