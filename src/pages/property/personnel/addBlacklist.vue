<style lang="less">
@import './addPersonnel.less';
</style>
<template>
  <div class="add-form">
		<a-form @submit.self="submitForm" :form="addform" layout="inline" ref="form" class="search-form-set">
      <a-form-item label="Name">
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: 'Please Input Name', whitespace: true }]}
          ]"
          placeholder="Please Input Name" style="width:300px;" />
      </a-form-item>
      <a-form-item label="ID No.">
        <a-input
          v-decorator="[
            'idnumber',
            {rules: [{ required: true, message: 'Please Input idnumber', whitespace: true }]}
          ]"
          placeholder="Please Input ID No." style="width:300px;" />
      </a-form-item>
      <a-form-item label="phone">
        <a-input
          v-decorator="[
            'phone',
            {rules: [{ required: true, message: 'Please Input phone', whitespace: true }]}
          ]"
          placeholder="Please Input phone" style="width:300px;" />
      </a-form-item>
      <a-form-item label="Reason">
        <a-textarea
          v-decorator="[
            'reason',
            {rules: [{ required: true, message: 'Please Input Reason', whitespace: true }]}
          ]"
          placeholder="Please Input Reason" :rows="3" style="width:300px;" />
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
  name: 'addBlacklist',
	data () {
		return {
      type: 'add',
      userID: '',
      addform: this.$form.createForm(this),
      towerList: [],
      blackID: null
		}
  },
  methods: {
    // 提交表单数据
    submitForm(e) {
      // console.log(this.addform.getFieldValue('name'))
      // console.log(this.addform.getFieldValue('phone'))
      // console.log(this.addform.getFieldValue('reason'))
      // console.log(this.addform.getFieldValue('idnumber'))
      e.preventDefault()
      this.addform.validateFields(async (err, values) => {
        if (!err) {
          this.logging = true
          if (this.type == 'add') {
            this.$http({
              url: this.$http.adornUrl('/dev-api/addBlack'),
              method: 'post',
              data: this.$http.adornData({
                name: this.addform.getFieldValue('name'),
                phone: this.addform.getFieldValue('phone'),
                reason: this.addform.getFieldValue('reason'),
                idnumber: this.addform.getFieldValue('idnumber'),
                userID: this.userID,
              })
            }).then((res) => {
              if (res.status == 200) {
                this.$message.success('success submit', 3)
                this.addform.resetFields()
                this.goback()
              } else {
                this.$message.error(res.data.message, 3)
              }
            })
          } else {
            this.$http({
              url: this.$http.adornUrl('/dev-api/editBlack'),
              method: 'post',
              data: this.$http.adornData({
                id: this.blackID,
                name: this.addform.getFieldValue('name'),
                phone: this.addform.getFieldValue('phone'),
                reason: this.addform.getFieldValue('reason'),
                Idnumber: this.addform.getFieldValue('idnumber'),
              })
            }).then((res) => {
              if (res.status == 200) {
                this.$message.success('success edit', 3)
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
      this.$store.commit('setPath', '/property/personnel/blacklist')
      this.$router.push('/property/personnel/blacklist')
    },
  },
	created() {
    this.userID = JSON.parse(localStorage.getItem('userInfo')).userID
    let info = this.$router.currentRoute.query.blackInfo
    if (!info) {
      this.type = 'add'
    } else {
      this.type = 'edit'
      this.blackID = info.id
      let _that = this
      setTimeout(() => {
        _that.addform.setFieldsValue({
          'name': info.name,
          'phone': info.phone,
          'reason': info.reason,
          'idnumber': info.idnumber
        })
      }, 0)
    }
		
	}
}
</script>

