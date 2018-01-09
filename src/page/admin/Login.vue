<template lang="html">
<div class="login-page">
  <div class="container">

    <div class="form-signin">
      <h2 class="form-signin-heading">请登录</h2>

      <div v-if="loginerror" class="alert alert-warning alert-dismissible fade in" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
        {{ loginerror.msg }}
      </div>

      <label class="sr-only">用户名</label>
      <input type="text" v-model="username" class="form-control" placeholder="用户名" required autofocus>
      <label class="sr-only">密码</label>
      <input type="password" v-model="password" class="form-control" placeholder="密码" required>
      <button class="btn btn-lg btn-primary btn-block" v-on:click="login()">登录</button>
    </div>

  </div> <!-- /container -->

</div>
</template>

<script>
import {getToken, authValid} from './../../service/getData'

export default {
  data() {
    return {
      username: '',
      password: '',
      token: '',
      loginerror: false,
    }
  },
  created() {

  },
  methods: {
    login() {
      getToken(this.username, this.password).then(obj => {
        if (obj.status === 'success') {
          localStorage.setItem('admin-token', obj.token)
          this.$router.push('/admin')
          this.loginerror = false
        } else {
          this.loginerror = obj
        }
      })
    },
  }
}
</script>

<style lang="scss">
.login-page {
  height: 100vh;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #eee;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="text"] {
  margin-bottom: -2px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  background: white;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background: white;
}
</style>
