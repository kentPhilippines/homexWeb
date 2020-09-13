<style lang="less">
@import './addcondo.less';
</style>
<template>
  <div class="add-form">
		<a-form @submit.self="submitForm" :form="addform" layout="inline" ref="form" class="search-form-set">
      <a-form-item label="Condo Name">
        <a-input
          v-decorator="[
            'condoName',
            {rules: [{ required: true, message: 'Please Input Condo Name', whitespace: true }]}
          ]"
          placeholder="Please Input Condo Name" style="width:300px;" />
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
      <a-form-item label="Password">
        <a-input
          v-decorator="[
            'password',
            {rules: [{ required: true, message: 'Please Input password', whitespace: true }]}
          ]"
          type="password"
          placeholder="Please Input password" style="width:300px;" />
      </a-form-item>
      <a-form-item label="Tower">
        <a-input
          v-decorator="[
            'tower',
            {rules: [{ required: true, message: 'Please Input tower', whitespace: true }]}
          ]"
          placeholder="Please Input tower" style="width:300px;" />
        <div class="subtitle">Comma(,) division</div>
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
	data () {
		return {
      addform: this.$form.createForm(this),
		}
  },
  methods: {
    // 提交表单数据
    submitForm(e) {
      // console.log(this.addform.getFieldValue('condoName'))
      // console.log(this.addform.getFieldValue('phone'))
      // console.log(this.addform.getFieldValue('email'))
      // console.log(this.addform.getFieldValue('password'))
      // console.log(this.addform.getFieldValue('tower'))
      e.preventDefault()
      this.addform.validateFields(async (err, values) => {
        if (!err) {
          this.logging = true
          let params = {
            condoName: this.addform.getFieldValue('condoName'),
            phone: this.addform.getFieldValue('phone'),
            email: this.addform.getFieldValue('email'),
            password: this.addform.getFieldValue('password'),
            tower: this.addform.getFieldValue('tower')
          }
          this.$http({
            url: this.$http.adornUrl('/dev-api/condo/add'),
            method: 'post',
            data: this.$http.adornData({
              ...params
            })
          }).then(res => {
            if (res.status === 200) {
              this.$message.success('success add condo')
              this.addform.resetFields()
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      })
    },
    goback() {
      this.$store.commit('setPath', '/company/condo')
      this.$router.push('/company/condo')
    },
  },
	created() {


	}
}
</script>

