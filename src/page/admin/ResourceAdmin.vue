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
  <a v-on:click="showModal('#mkdir')" class="btn btn-primary">创建目录</a>
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
          <td>{{ f.name }}</td>
          <td>{{ humanSize(f.size) }}</td>
          <td>{{ new Date(f.modified).toLocaleString() }}</td>
          <td>
            <a v-on:click="copyLink(f.path)" class="btn btn-sm btn-info" v-if="!f.isdir">复制链接</a>
            <a v-on:click="changePath(f.path)" class="btn btn-sm btn-primary" v-else>进入目录</a>
            <a v-on:click="remove(f.path)" class="btn btn-sm btn-danger" v-if="false">删除</a>
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
          <button type="button" class="btn btn-primary" v-on:click="uploadfile()">Upload</button>
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


</div>
</template>

<script>
import {apiurl} from './../../service/config'

import {
  getResources,
  mkdir,
  uploadFile,
} from './../../service/getData'

export default {
  data() {
    return {
      curpath: '',
      paths: [],
      files: [],
      toMadeDirName: '',
      toUploadFile: null,
      mkdirmsg: false,
      uploading: false,
      uploadProgress: '',
      uploadmsg: false,
    }
  },
  watch: {
    'searchword': 'search',
    'curpath': 'resolvePaths'
  },
  created() {
    this.changePath('/')
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
