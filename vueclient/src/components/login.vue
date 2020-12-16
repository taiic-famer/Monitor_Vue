<template>
  <div class="backlogin" :style="loginContainerStyle">
    <div style="height: 200px"></div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login_box"
      label-position="left"
    >
      <div class="title">智能无人集群系统运行状态监控平台</div>
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
        />
      </el-form-item>
      <el-form-item prop="password"
        ><el-input
          ref="password"
          v-model="loginForm.password"
          type="password"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >{{ loginText }}</el-button
      >
    </el-form>
    <pointwave :color="0x097bdb" style="margin: -300px 0 0 0" />
  </div>
</template>

<script>
import backgroundImg from '../assets/images/background.png'
import Pointwave from './Pointwave/index'
export default {
  name: 'backlogin',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginText: '登录',
    }
  },
  components: {
    Pointwave,
  },
  computed: {
    loginContainerStyle() {
      return {
        backgroundImage: `url(${backgroundImg})`,
      }
    },
  },
  methods: {
    handleLogin() {
      this.disablebtn = true
      this.loginText = '登录中...'
      if (this.loginForm.username == '' || this.loginForm.password == '') {
        alert('请填写用户名和密码')
        this.loginText = '登录'
      } else {
        if (this.loginForm.username == 'admin') {
          if (this.loginForm.password == '123456') {
            // alert('登录成功')
            this.$router.push('/planes/data')
          } else {
            alert('密码错误')
            this.loginText = '登录'
          }
        } else {
          alert('用户名不存在')
          this.loginText = '登录'
        }
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.backlogin {
  height: 100vh;
  overflow: hidden;
}
.login_box {
  position: relative;
  z-index: 9999;
  width: 340px;
  margin: 0 auto;
}

.title {
  color: white;
  font-size: 1.5em;
  text-align: center;
  margin: 0 0 40px 0;
}
</style>
