<style lang="less" >
@import './login.less';
</style>

<template>
  <div class="allPage">
    <div v-show="type == 'login'" class="login">
      <a-form @submit="onSubmit" :form="form">
        <h3>HomeX Management System</h3>
        <a-alert
          type="error"
          :closable="true"
          v-show="error"
          :message="error"
          showIcon
          style="margin-bottom: 24px;"/>
        <a-form-item>
          <a-input
            v-decorator="[
              'email',
              {rules: [{ required: true, message: 'Please enter your email', whitespace: true }]}
            ]"
            size="large" placeholder="Email">
            <a-icon slot="prefix" type="user"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input-password
            v-decorator="[
              'password',
              {rules: [{ required: true, message: 'Please enter your password', whitespace: true }]}
            ]"
            size="large" placeholder="Password" type="password">
            <a-icon slot="prefix" type="lock"/>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a @click="changeType('forgot')">Forgot password</a>
          <a @click="changeType('register')">Register</a>
        </a-form-item>
        <a-form-item>
          <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit"
            type="primary">Login
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div v-show="type == 'register'" class="register">
      <div class="register-title">New User Registration</div>
      <a-form @submit="onRegisterSubmit" :form="registerForm">
        <a-form-item>
          <a-input
            v-decorator="[
              'name',
              {rules: [{ required: true, message: 'Please enter your name', whitespace: true }]}
            ]"
            size="large" placeholder="User Name">
            <a-icon slot="prefix" type="user"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'mobile',
              {rules: [{ required: true, message: 'Please enter your mobile number', whitespace: true }]}
            ]"
            size="large" placeholder="Mobile Number">
            <a-icon slot="prefix" type="phone"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'email',
              {rules: [{ required: true, message: 'Please enter your email', whitespace: true }]}
            ]"
            size="large" placeholder="Your email in Admin">
            <a-icon slot="prefix" type="global"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input style="width: calc(100% - 120px);"
            v-decorator="[
              'code',
              {rules: [{ required: true, message: 'Please enter your email code', whitespace: true }]}
            ]"
            size="large" placeholder="safety">
            <a-icon slot="prefix" type="user"/>
          </a-input>
          <a-button class="register-code" @click="sendCode">Send Code</a-button>
        </a-form-item>
        <a-form-item>
          <a-input style="width: calc(100% - 120px);"
            v-decorator="[
              'identify',
              {rules: [{ required: true, message: 'Please enter your identify code', whitespace: true }]}
            ]"
            size="large" placeholder="identify Code">
            <a-icon slot="prefix" type="barcode"/>
          </a-input>
          <div class="register-code" @click="changeImage('resigerValidImage')">
            <canvas id="resigerValidImage" style="width:450px;height:220px;"></canvas>
          </div>
        </a-form-item>
        <a-form-item>
          <a-input-password
            v-decorator="[
              'password',
              {rules: [{ required: true, message: 'Please enter your password', whitespace: true }]}
            ]"
            size="large" placeholder="Password" type="password">
            <a-icon slot="prefix" type="lock"/>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-input-password
            v-decorator="[
              'repassword',
              {rules: [{ required: true, message: 'Both passwords need to be the same', whitespace: true }]}
            ]"
            size="large" placeholder="Re-enter your password" type="password">
            <a-icon slot="prefix" type="lock"/>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <p>At least 6 and 8 letters and digits</p>
        </a-form-item>
        <a-form-item>
          <a @click="changeType('login')">Back to login</a>
        </a-form-item>
        <a-form-item style="margin-top:-20px;">
          <a-button :loading="logging" style="width:100%;" size="large" htmlType="submit"
            type="primary">Register
          </a-button>
        </a-form-item>
      </a-form>
    </div>
    <div v-show="type == 'forgot'" class="register">
      <div class="register-title">Reset password</div>
      <a-form @submit="onForgotSubmit" :form="forgotForm">
        <a-form-item>
          <a-input
            v-decorator="[
              'email',
              {rules: [{ required: true, message: 'Please enter your email', whitespace: true }]}
            ]"
            size="large" placeholder="Your email in Admin">
            <a-icon slot="prefix" type="global"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input style="width: calc(100% - 120px);"
            v-decorator="[
              'code',
              {rules: [{ required: true, message: 'Please enter your email code', whitespace: true }]}
            ]"
            size="large" placeholder="safety">
            <a-icon slot="prefix" type="user"/>
          </a-input>
          <a-button class="register-code" @click="forsendCode">Send Code</a-button>
        </a-form-item>
        <a-form-item>
          <a-input style="width: calc(100% - 120px);"
            v-decorator="[
              'identify',
              {rules: [{ required: true, message: 'Please enter your identify code', whitespace: true }]}
            ]"
            size="large" placeholder="identify Code">
            <a-icon slot="prefix" type="barcode"/>
          </a-input>
          <div class="register-code" @click="changeImage('forgotValidImage')">
            <canvas id="forgotValidImage" style="width:450px;height:220px;"></canvas>
          </div>
        </a-form-item>
        <a-form-item>
          <a-input-password
            v-decorator="[
              'password',
              {rules: [{ required: true, message: 'Please enter your password', whitespace: true }]}
            ]"
            size="large" placeholder="Password" type="password">
            <a-icon slot="prefix" type="lock"/>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-input-password
            v-decorator="[
              'repassword',
              {rules: [{ required: true, message: 'Both passwords need to be the same', whitespace: true }]}
            ]"
            size="large" placeholder="Re-enter your password" type="password">
            <a-icon slot="prefix" type="lock"/>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <p>At least 6 and 8 letters and digits</p>
        </a-form-item>
        <a-form-item>
          <a @click="changeType('login')">Back to login</a>
        </a-form-item>
        <a-form-item style="margin-top:-20px;">
          <a-button :loading="logging" style="width:100%;" size="large" htmlType="submit"
            type="primary">Reset
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import Main from '../../../src/Main.vue'

export default {
  name: 'login',
  data () {
    return {
      type: 'login',
      logging: false,
      error: '',
      form: this.$form.createForm(this),
      registerForm: this.$form.createForm(this),
      forgotForm: this.$form.createForm(this),
      identifyCode: '',

      fontSize: 20,
      backgroundColorMin: 255,
      backgroundColorMax: 255,
      colorMin: 50,
      colorMax: 160,
      lineColorMin: 150,
      lineColorMax: 250,
      dotColorMin: 0,
      dotColorMax: 25,
      contentWidth: 80,
      contentHeight: 30,
    }
  },
  methods: {
    // 生成一个随机数
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 生成一个随机的颜色
    randomColor (min, max) {
      let r = this.randomNum(min, max)
      let g = this.randomNum(min, max)
      let b = this.randomNum(min, max)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    // 绘制文字
    drawText (ctx, txt, i) {
      ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
      ctx.font = this.fontSize + 'px SimHei'
      let x = (i + 0.5) * (this.contentWidth / (this.identifyCode.length + 1))
      let y = this.randomNum(this.fontSize, this.contentHeight - 5)
      var deg = this.randomNum(-15, 15)
      // 修改坐标原点和旋转角度
      ctx.translate(x, y)
      ctx.rotate(deg * Math.PI / 180)
      ctx.fillText(txt, 0, 0)
      // 恢复坐标原点和旋转角度
      ctx.rotate(-deg * Math.PI / 180)
      ctx.translate(-x, -y)
    },
    // 绘制干扰线
    drawLine (ctx) {
      for (let i = 0; i < 6; i++) {
        ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax)
        ctx.beginPath()
        ctx.moveTo(0, this.randomNum(0, this.contentHeight))
        ctx.lineTo(this.contentWidth, this.randomNum(0, this.contentHeight))
        ctx.stroke()
      }
    },
    // 绘制干扰点
    drawDot (ctx) {
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = this.randomColor(0, 255)
        ctx.beginPath()
        ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI)
        ctx.fill()
      }
    },
    // 绘制验证码
    drawPic (id) {
      let canvas = document.getElementById(id)
      let ctx = canvas.getContext('2d')
      ctx.textBaseline = 'bottom'
      // 绘制背景
      ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax)
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
      // 绘制文字
      for (let i = 0; i < this.identifyCode.length; i++) {
        this.drawText(ctx, this.identifyCode[i], i)
      }
      this.drawLine(ctx)
      // this.drawDot(ctx)
      this.isLoad = false
    },
    changeImage (id) {
      this.isLoad = true
      this.identifyCode = Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 10) + '' + Math.floor(Math.random() * 10)
      this.drawPic(id)
    },
    // 遍历后台传来的路由字符串，转换为组件对象
    filterAsyncRouter(asyncRouterMap) {
      return asyncRouterMap.filter(route => {
        if (route.component) {
          // Layout组件特殊处理
          if (route.component === 'RouteView') {
            route.component = RouteView
          } else {
            route.component = loadView(route.component)
          }
        }

        if (route.children != null && route.children && route.children.length) {
          route.children = filterAsyncRouter(route.children)
        }
        return true
      })
    },
    onSubmit (e) {
      let _that = this
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.logging = true
          this.$http({
            url: this.$http.adornUrl('/dev-api/login'),
            method: 'post',
            data: this.$http.adornData({
              email: this.form.getFieldValue('email'),
              password: this.form.getFieldValue('password')
            })
          }).then((res) => {
            if (res.data.success === true) {
              debugger
              this.logging = false
               this.$cookie.set('token', res.data.result.sessionId);
              let userInfo = {
                userId: res.data.result.userId,
                userName: res.data.result.userName,
                userAvtar: res.data.result.userAvtar,
                userEmail: res.data.result.userEmail,
                userPhone: res.data.result.userPhone,
                password: res.data.result.password,
                userRole: res.data.result.userRole  // 1超级管理员、2经理、3员工，4物业、5前台，6房东、7租客
              }
              // this.$cookie.set('token', 'aaaaaaaaaaaaaa')
              // let userInfo = {
              //   userName: 'superManager',
              //   userAvtar: '../../../static/img/head_icon_black.svg',//'../../../static/img/head_icon.png',
              //   userEmail: this.form.getFieldValue('email'),
              //   userPhone: '12345678',
              //   password: '123456',
              //   userRole: '6',  // 1超级管理员、2经理、3员工，4物业、5前台，6房东、7租客
              // }
              debugger;
              localStorage.setItem('userInfo', JSON.stringify(userInfo))
              this.$message.success('success login', 3)

              let rootMenu = []
              let routerMemu = []
              let routerlist = []
              switch (userInfo.userRole) {
                case 1:
                case 2:
                case 3:
                  routerlist = [
                    {
                      key: '1',
                      path: '/company/condo',
                      // icon: 'container',
                      icon: 'static/img/condoManage.svg',
                      name: '管理公寓',
                      meta: null,
                      component: resolve => { require(['@/pages/company/condoManage.vue'], resolve);},
                      children: []
                    }
                  ]
                  break
                case 4:
                case 5:
                  routerlist = [
                    {
                      key: '1',
                      path: '/property/dashboard',
                      // icon: 'dashboard',
                      icon: 'static/img/dashboard.svg',
                      name: '仪表盘',
                      meta: null,
                      component: resolve => { require(['@/pages/property/dashboard.vue'], resolve);},
                      children: []
                    },
                    {
                      key: '2',
                      path: '/property/condo',
                      // icon: 'container',
                      icon: 'static/img/condoManage.svg',
                      name: '物业管理房间',
                      meta: null,
                      component: resolve => { require(['@/pages/property/condo.vue'], resolve);},
                      children: []
                    },

                    {
                      key: '3',
                      path: '/property/form',
                      // icon: 'file-text',
                      icon: 'static/img/form.svg',
                      name: '表单',
                      meta: null,
                      component: resolve => { require(['@/pages/property/form.vue'], resolve);},
                      children: []
                    },
                    {
                      key: '4',
                      path: '/property/bill',
                      // icon: 'calculator',
                      icon: 'static/img/bill.svg',
                      name: '账单',
                      meta: null,
                      component: resolve => { require(['@/pages/property/bill.vue'], resolve);},
                      children: []
                    },
                    {
                      key: '5',
                      path: '/property/personnel',
                      // icon: 'usergroup-add',
                      icon: 'static/img/personnel.svg',
                      name: '个人管理',
                      meta: null,
                      component: resolve => { require(['@/pages/property/personnel.vue'], resolve);},
                      children: []
                    }
                  ]
                  break
                case 6:
                case 7:
                  routerlist = [
                    {
                      key: '1',
                      path: '/owner/condo',
                      // icon: 'container',
                      icon: 'static/img/condoManage.svg',
                      name: '物业管理房间',
                      meta: null,
                      component: resolve => { require(['@/pages/owner/condo.vue'], resolve);},
                      children: []
                    },

                    {
                      key: '2',
                      path: '/property/form',
                      // icon: 'file-text',
                      icon: 'static/img/form.svg',
                      name: '表单',
                      meta: null,
                      component: resolve => { require(['@/pages/property/form.vue'], resolve);},
                      children: []
                    },
                    {
                      key: '3',
                      path: '/property/bill',
                      // icon: 'calculator',
                      icon: 'static/img/bill.svg',
                      name: '账单',
                      meta: null,
                      component: resolve => { require(['@/pages/property/bill.vue'], resolve);},
                      children: []
                    },
                  ]
                  break
                default: break
              }
              // routerMemu = this.filterAsyncRouter(routerlist)
              routerMemu = JSON.parse(JSON.stringify(routerlist))

              let root = [{
                path: '/',
                name: '框架',
                component: Main,
                icon: 'none',
                invisible: true,
                children: routerMemu
              }];

              localStorage.setItem('siderMenus', JSON.stringify(routerMemu))
              // this.$store.commit('setMenus',routerMemu)
              this.$router.push('/')
            } else {
              this.logging = false
              this.error = res.data.message

            }
          })
        }
      })
    },
    changeType(type) {
      this.type = type
      if (type == 'register') {
        this.changeImage('resigerValidImage')
      } else if (type == 'forgot') {
        this.changeImage('forgotValidImage')
      }
    },
    sendCode() {
      this.$http({
        url: this.$http.adornUrl('/user-api/getCode'),
        method: 'post',
        data: this.$http.adornData({
          email: this.registerForm.getFieldValue('email'),
        })
      }).then((res) => {
        if (res.status == 200) {
          this.$message.success('success send code')
        } else {
          this.logging = false
          this.error = res.data.message
        }
      })
    },
    onRegisterSubmit (e) {
      e.preventDefault()
      this.registerForm.validateFields(async (err, values) => {
        if (this.registerForm.getFieldValue('identify') != this.identifyCode) {
          this.$message.error('identify code is error', 3)
        } else if (this.registerForm.getFieldValue('password') != this.registerForm.getFieldValue('repassword')) {
          this.$message.error('two passwords are different', 3)
        } else {
          if (!err) {
            this.logging = true
            this.$http({
              url: this.$http.adornUrl('/dev-api/resiger'),
              method: 'post',
              data: this.$http.adornData({
                name: this.registerForm.getFieldValue('name'),
                mobile: this.registerForm.getFieldValue('mobile'),
                email: this.registerForm.getFieldValue('email'),
                code: this.registerForm.getFieldValue('code'),
                password: this.registerForm.getFieldValue('password'),
                role: 3
              })
            }).then((res) => {
              debugger;
              if (res.data.success === true) {
                this.$message.success('success register', 3)
                this.logging = false
                this.registerForm.resetFields()
                this.type = 'login'
              } else {
                this.$message.error(res.data.message, 3)
                this.logging = false
              }
            })
          }
        }
      })
    },
    forsendCode() {
      // this.$http({
      //   url: this.$http.adornUrl('api/login'),
      //   method: 'post',
      //   data: this.$http.adornData({
      //     email: this.forgotForm.getFieldValue('email'),
      //   })
      // }).then((res) => {
      //   if (res.status == 200) {
          this.$message.success('success send code')
      //   } else {
      //     this.logging = false
      //     this.error = data.message
      //   }
      // })
    },
    onForgotSubmit (e) {
      e.preventDefault()
      this.forgotForm.validateFields(async (err, values) => {
        if (this.forgotForm.getFieldValue('identify') != this.identifyCode) {
          this.$message.error('identify code is error', 3)
        } else if (this.forgotForm.getFieldValue('password') != this.forgotForm.getFieldValue('repassword')) {
          this.$message.error('two passwords are different', 3)
        } else {
          if (!err) {
            this.logging = true
            this.$http({
              url: this.$http.adornUrl('/dev-api/reset'),
              method: 'post',
              data: this.$http.adornData({
                email: this.forgotForm.getFieldValue('email'),
                code: this.forgotForm.getFieldValue('code'),
                password: this.forgotForm.getFieldValue('password'),
              })
            }).then((res) => {
              if (res.status === 200) {
                this.$message.success('success reset', 3)
                this.logging = false
                this.forgotForm.resetFields()
                this.type = 'login'
              } else {
                this.logging = false
                this.error = res.data.message
              }
            })
          }
        }
      })
    },
  },
  mounted() {
  }
}
</script>

