<template lang="html">
<div class="admin-body">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <!-- <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button> -->
          <router-link class="navbar-brand" :to="'/admin'">管理页</router-link>
        </div>
        <!--
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
          </ul>
        </div>
        -->
      </div>
    </nav>


    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
          <ul class="nav nav-sidebar">
            <li v-for="nav in navs" :class="$route.path === nav.link ? 'active' : ''">
              <router-link :to="nav.link">
                {{ nav.name }} <span v-if="false" class="sr-only">(current)</span>
              </router-link>
            </li>
          </ul>
        </div>


        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 admin-main">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>

      </div>
    </div>

    <div class="modal fade" id="loginform" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div v-if="loginerror" class="alert alert-warning alert-dismissible fade in" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
            {{ loginerror.msg }}
          </div>
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabel">Login</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Username</label>
              <input v-model="username" type="text" class="form-control" classplaceholder="username">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input v-model="password" type="password" class="form-control" placeholder="Password">
            </div>
            <button class="btn btn-default" v-on:click="login()">Submit</button>
          </div>
        </div>
      </div>
    </div>

</div>
</template>

<script>
import {getAllArticle, getToken, authValid} from './../../service/getData'

export default {
  data() {
    return {
      username: '',
      password: '',
      token: '',
      loginerror: false,
      navs: [
        {
          name: '文章管理',
          link: '/admin/article'
        },
        {
          name: '资源管理',
          link: '/admin/resource'
        }
      ]
    }
  },
  created() {
  },
  updated() {
    this.authTest()
  },
  methods: {
    authTest() {
      const token = localStorage.getItem('admin-token')
      if (!token) {
        $('#loginform').modal('show')
      } else if (!this.token) {
        authValid().then(valid => {
          if (!valid) {
            console.log(valid)
            localStorage.removeItem('admin-token')
            $('#loginform').modal('show')
          } else {
            this.token = localStorage.getItem('admin-token')
            $('#loginform').modal('hide')
          }
        })
      }
    },
    login() {
      getToken(this.username, this.password).then(obj => {
        if (obj.status === 'success') {
          $('#loginform').modal('hide')
          localStorage.setItem('admin-token', obj.token)
          this.loginerror = false
          this.$forceUpdate()
        } else {
          this.loginerror = obj
        }
      })
    }
  }
}
</script>

<style lang="scss">
/*
 * Base structure
 */

/* Move down content because we have a fixed navbar that is 50px tall */
.admin-body {
  padding-top: 50px;
  background: #fff;
}


/*
 * Global add-ons
 */

.sub-header {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

/*
 * Top navigation
 * Hide default border to remove 1px line.
 */
.navbar-fixed-top {
  border: 0;
}

/*
 * Sidebar
 */

/* Hide for mobile, show later */
.sidebar {
  display: none;
}
@media (min-width: 768px) {
  .sidebar {
    position: fixed;
    top: 51px;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: block;
    padding: 20px;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
    background-color: #f5f5f5;
    border-right: 1px solid #eee;
  }
}

/* Sidebar navigation */
.nav-sidebar {
  margin-right: -21px; /* 20px padding + 1px border */
  margin-bottom: 20px;
  margin-left: -20px;
}
.nav-sidebar > li > a {
  padding-right: 20px;
  padding-left: 20px;
}
.nav-sidebar > .active > a,
.nav-sidebar > .active > a:hover,
.nav-sidebar > .active > a:focus {
  color: #fff;
  background-color: #428bca;
}


/*
 * Main content
 */

.admin-main {
  padding: 20px;
}
@media (min-width: 768px) {
  .admin-main {
    padding-right: 40px;
    padding-left: 40px;
  }
}
.admin-main .page-header {
  margin-top: 0;
}


/*
 * Placeholder dashboard ideas
 */

.placeholders {
  margin-bottom: 30px;
  text-align: center;
}
.placeholders h4 {
  margin-bottom: 0;
}
.placeholder {
  margin-bottom: 20px;
}
.placeholder img {
  display: inline-block;
  border-radius: 50%;
}
</style>
