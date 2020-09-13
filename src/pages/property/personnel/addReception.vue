<style lang="less">
@import './addPersonnel.less';
</style>
<template>
  <div class="add-form">
		<a-form @submit.self="submitForm" :form="addform" layout="inline" ref="form" class="search-form-set">
      <a-form-item label="Staff Name">
        <a-input
          v-decorator="[
            'staffName',
            {rules: [{ required: true, message: 'Please Input Staff Name', whitespace: true }]}
          ]"
          placeholder="Please Input Staff Name" style="width:300px;" />
      </a-form-item>
      <a-form-item label="Tower">
        <a-select 
          v-decorator="[
            'tower',
            {rules: [{ required: true, message: 'Please Input tower'}]}
          ]"
          style="width:300px;">
          <a-select-option v-for="tower in towerList" :key="tower.id" :value="tower.id">{{ tower.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="phone">
        <a-input
          v-decorator="[
            'phone',
            {rules: [{ required: true, message: 'Please Input phone', whitespace: true }]}
          ]"
          placeholder="Please Input phone" style="width:300px;" />
      </a-form-item>
      <a-form-item label="Email">
        <a-input
          v-decorator="[
            'email',
            {rules: [{ required: true, message: 'Please Input email', whitespace: true }]}
          ]"
          placeholder="Please Input email" style="width:300px;" />
      </a-form-item>
      <a-form-item label="Code" v-if="type == 'add'">
        <a-input style="width: calc(100% - 100px);"
          v-decorator="[
            'code',
            {rules: [{ required: true, message: 'Please enter your email code', whitespace: true }]}
          ]"
          size="large" placeholder="safety">
          <a-icon slot="prefix" type="user"/>
        </a-input>
        <a-button class="register-code" @click="sendCode">Send Code</a-button>
      </a-form-item>
      <a-form-item label="Password" v-if="type == 'add'">
        <a-input
          v-decorator="[
            'password',
            {rules: [{ required: true, message: 'Please Input password', whitespace: true }]}
          ]"
          type="password"
          placeholder="Please Input password" style="width:300px;" />
      </a-form-item>
      <a-form-item>
        <a-row style="width:420px;">
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" htmlType="submit">Save</a-button>
            <a-button @click="goback">Cancel</a-button>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'addReception',
	data () {
		return {
      type: 'add',
      userID: '',
      addform: this.$form.createForm(this),
      towerList: [],
      receptionID: null
		}
  },
  methods: {
    sendCode() {
      this.$http({
        url: this.$http.adornUrl('/dev-api/getCode'),
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
    // 提交表单数据
    submitForm(e) {
      // console.log(this.addform.getFieldValue('staffName'))
      // console.log(this.addform.getFieldValue('phone'))
      // console.log(this.addform.getFieldValue('email'))
      // console.log(this.addform.getFieldValue('password'))
      // console.log(this.addform.getFieldValue('tower'))
      e.preventDefault()
      this.addform.validateFields(async (err, values) => {
        if (!err) {
          this.logging = true
          if (this.type == 'add') {
            this.$http({
              url: this.$http.adornUrl('/dev-api/resiger'),
              method: 'post',
              data: this.$http.adornData({
                name: this.addform.getFieldValue('staffName'),
                mobile: this.addform.getFieldValue('phone'),
                email: this.addform.getFieldValue('email'),
                code: this.addform.getFieldValue('code'),
                password: this.addform.getFieldValue('password'),
                tower: this.addform.getFieldValue('tower'),
                userID: this.userID,
                role: 5
              })
            }).then((res) => {
              if (res.status == 200) {
                this.$message.success('success submit')
                this.addform.resetFields()
                this.goback()
              } else {
                this.$message.error(res.data.message, 3)
              }
            })
          } else {
            this.$http({
              url: this.$http.adornUrl('/dev-api/editReception'),
              method: 'post',
              data: this.$http.adornData({
                id: this.receptionID,
                name: this.addform.getFieldValue('staffName'),
                mobile: this.addform.getFieldValue('phone'),
                email: this.addform.getFieldValue('email'),
                tower: this.addform.getFieldValue('tower'),
              })
            }).then((res) => {
              if (res.status == 200) {
                this.$message.success('success edit')
                this.addform.resetFields()
                this.goback()
              } else {
                this.$message.error(res.data.message, 3)
              }
            })
          }
        }
      })
    },
    goback() {
      this.$store.commit('setPath', '/property/personnel/reception')
      this.$router.push('/property/personnel/reception')
    },
    getTowerList() {
      let params = {
        userID: this.userID
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/getTowerList'),
        method: 'get',
        params: this.$http.adornParams({...params})
      }).then((res) => {
        if (res.status == 200) {
          this.towerList = []
          this.towerList = res.data.data.towerList
        } else {
          this.$message.error('failed get towerlist')
        }
      })
      // this.towerList = []
      // this.towerList = [
      //   {id: '1', name: 'Tower1'},
      //   {id: '2', name: 'Tower2'},
      //   {id: '3', name: 'Tower3'}
      // ]
    },
  },
	created() {
    this.userID = JSON.parse(localStorage.getItem('userInfo')).userID
    let info = this.$router.currentRoute.query.receptionInfo
    if (!info) {
      this.type = 'add'
    } else {
      this.type = 'edit'
      this.receptionID = info.id
      let _that = this
      setTimeout(() => {
        _that.addform.setFieldsValue({
          'staffName': info.staffName,
          'phone': info.phone,
          'email': info.email,
          'tower': info.tower
        })
      }, 0)
    }
    this.getTowerList()
	}
}
</script>

