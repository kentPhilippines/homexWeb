<style lang="less" scoped>
@import './account.less';
</style>
<style lang="less">
.account-card-content .ant-upload {
  margin: 20px 0 0 0 !important;
  padding: 0 !important;
  width: 30px !important;
  height: 30px !important;
}
</style>

<template>
  <div class="account-page">
    <div class="account-body" v-if="!isEdit">
      <div class="account-title">Admin info</div>
      <!-- <a-card class="account-card">
        <a-row>
          <a-col :span="4" class="account-card-label">Profile</a-col>
          <a-col :span="20">
            <span>Some info may be visible to other people</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="4" class="account-card-label" style="line-height:70px;">Photo</a-col>
          <a-col :span="20" class="account-card-content" style="height:65px;">
            <input v-if="isEdit" type="file" @change="beforeUpload" class="account-card-content-file">
            <img v-if="isEdit" :src="editUserInfo.userAvtar">
            <img v-if="!isEdit" :src="userInfo.userAvtar">
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="4" class="account-card-label">Name</a-col>
          <a-col :span="20" class="account-card-content">
            <a-input v-if="isEdit" v-model="editUserInfo.userName"></a-input>
            <span v-else>{{ userInfo.userName }}</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="4" class="account-card-label">Phone</a-col>
          <a-col :span="20" class="account-card-content">
            <a-input v-if="isEdit" v-model="editUserInfo.userPhone"></a-input>
            <span v-else>{{ userInfo.userPhone }}</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="4" class="account-card-label">Email</a-col>
          <a-col :span="20" class="account-card-content">
            <a-input v-if="isEdit" v-model="editUserInfo.userEmail"></a-input>
            <span v-else>{{ userInfo.userEmail }}</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="4" class="account-card-label">Password</a-col>
          <a-col :span="20" class="account-card-content">
            <a-input v-if="isEdit" type="password" v-model="editUserInfo.password"></a-input>
            <span v-else>********</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-button v-if="!isEdit" type="primary" @click="clickEdit">Edit</a-button>
            <a-button v-if="isEdit" type="primary" @click="confirmEdit">Submit</a-button>
            <a-button v-if="isEdit" @click="cancelEdit">Cancel</a-button>
          </a-col>
        </a-row>
      </a-card> -->
      <a-card class="account-card">
        <a-row>
          <a-col :span="4" class="account-card-label">Profile</a-col>
          <a-col :span="20">
            <span>Some info may be visible to other people</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="4" class="account-card-label" style="line-height:70px;">Photo</a-col>
          <a-col :span="20" class="account-card-content account-card-edit" style="height:65px;">
            <img :src="userInfo.userAvtar" @click="clickEdit('photo')">
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="4" class="account-card-label">Name</a-col>
          <a-col :span="20" class="account-card-content account-card-edit" @click="clickEdit('name')">
            <span>{{ userInfo.userName }}</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="4" class="account-card-label">Phone</a-col>
          <a-col :span="20" class="account-card-content account-card-edit" @click="clickEdit('phone')">
            <span>{{ userInfo.userPhone }}</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="4" class="account-card-label">Email</a-col>
          <a-col :span="20" class="account-card-content">
            <span >{{ userInfo.userEmail }}</span>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="4" class="account-card-label">Password</a-col>
          <a-col :span="20" class="account-card-content account-card-edit" @click="clickEdit('password')">
            <span>********</span>
          </a-col>
        </a-row>
      </a-card>
    </div>
    <div class="account-body" v-if="isEditPhoto">
      <div class="account-title">Profile Photo</div>
      <a-card class="account-card">
        <a-row>
          <a-col :span="24" class="account-card-content" style="height:200px;">
            <input type="file" @change="beforeUpload" class="account-card-content-file" style="width:160px;height:160px;">
            <img :src="editUserInfo.userAvtar" style="width:160px;height:160px;">
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" style="margin-top:120px;width:100%;text-align:right;">
            <a-button @click="cancelEdit">Cancel</a-button>
            <a-button type="primary" @click="confirmEdit">Save</a-button>
          </a-col>
        </a-row>
      </a-card>
    </div>
    <div class="account-body" v-if="isEditName">
      <div class="account-title" style="text-align:left;">Name</div>
      <a-card class="account-card">
        <a-row>
          <a-col :span="24" class="account-card-label" style="text-align:center;">New Name</a-col>
        </a-row>
        <a-form @submit.self="confirmEdit" :form="editForm" layout="inline" ref="form" class="search-form-set">
          <a-form-item></a-form-item>
          <a-form-item label="" style="width:100%;" required>
            <a-row style="width:600px;">
              <a-col :span="6" class="account-card-label">First Name</a-col>
              <a-col :span="18" class="account-card-content">
                <a-input
                  v-decorator="[
                    'firstName',
                    {rules: [{ required: true, message: 'please input first name', whitespace: true }]}
                  ]"
                  placeholder="please input first name"/>
              </a-col>
            </a-row>
            <!-- <a-input
              v-decorator="[
                'firstName',
                {rules: [{ required: true, message: 'please input first name', whitespace: true }]}
              ]"
              placeholder="please input first name" style="width:380px;"/> -->
          </a-form-item>
          <a-form-item label="" style="width:100%;" required>
            <a-row style="width:600px;">
              <a-col :span="6" class="account-card-label">Last Name</a-col>
              <a-col :span="18" class="account-card-content">
                <a-input
                  v-decorator="[
                    'lastName',
                    {rules: [{ required: true, message: 'please input last name', whitespace: true }]}
                  ]"
                  placeholder="please input last name"/>
              </a-col>
            </a-row>
            <!-- <a-input
              v-decorator="[
                'lastName',
                {rules: [{ required: true, message: 'please input last name', whitespace: true }]}
              ]"
              placeholder="please input last name" style="width:380px;"/> -->
          </a-form-item>
          <div style="margin-top:80px;width:100%;text-align:right;">
            <a-button @click="cancelEdit">Cancel</a-button>
            <a-button type="primary" html-type="submit">Save</a-button>
          </div>
        </a-form>
      </a-card>
    </div>
    <div class="account-body" v-if="isEditPhone">
      <div class="account-title" style="text-align:left;">Contact No.</div>
      <a-card class="account-card">
        <a-row>
          <a-col :span="24" class="account-card-label" style="text-align:center;">NEW CONTACT NUMBER</a-col>
        </a-row>
        <a-form @submit.self="confirmEdit" :form="editForm" layout="inline" ref="form" class="search-form-set">
          <a-form-item></a-form-item>
          <a-form-item label="" style="width:100%;" required>
            <a-row style="width:600px;">
              <a-col :span="24" class="account-card-content">
                <a-input
                  v-decorator="[
                    'phone',
                    {rules: [{ required: true, message: 'please input contact number', whitespace: true }]}
                  ]"
                  placeholder="please input contact number"/>
              </a-col>
            </a-row>
          </a-form-item>
          <div style="margin-top:140px;width:100%;text-align:right;">
            <a-button @click="cancelEdit">Cancel</a-button>
            <a-button type="primary" html-type="submit">Save</a-button>
          </div>
        </a-form>
      </a-card>
    </div>
    <div class="account-body" v-if="isEditPassword">
      <div class="account-title" style="text-align:left;">Password</div>
      <a-card class="account-card">
        <a-row>
          <a-col :span="24" class="account-card-label" style="text-align:center;">NEW PASSWORD</a-col>
        </a-row>
        <a-form @submit.self="confirmEdit" :form="editForm" layout="inline" ref="form" class="search-form-set">
          <a-form-item></a-form-item>
          <a-form-item label="" style="width:100%;" required>
            <a-row style="width:600px;">
              <a-col :span="24" class="account-card-content">
                <a-input
                  v-decorator="[
                    'password',
                    {rules: [{ required: true, message: 'please input password', whitespace: true }]}
                  ]"
                  placeholder="password"/>
              </a-col>
            </a-row>
            <!-- <a-input
              v-decorator="[
                'firstName',
                {rules: [{ required: true, message: 'please input first name', whitespace: true }]}
              ]"
              placeholder="please input first name" style="width:380px;"/> -->
          </a-form-item>
          <a-form-item label="" style="width:100%;" required>
            <a-row style="width:600px;">
              <a-col :span="24" class="account-card-content">
                <a-input
                  v-decorator="[
                    'repassword',
                    {rules: [{ required: true, message: 'please input confirm password', whitespace: true }]}
                  ]"
                  placeholder="confirm password"/>
              </a-col>
            </a-row>
            <!-- <a-input
              v-decorator="[
                'lastName',
                {rules: [{ required: true, message: 'please input last name', whitespace: true }]}
              ]"
              placeholder="please input last name" style="width:380px;"/> -->
          </a-form-item>
          <div style="margin-top:80px;width:100%;text-align:right;">
            <a-button @click="cancelEdit">Cancel</a-button>
            <a-button type="primary" html-type="submit">Save</a-button>
          </div>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'account',
  data () {
    return {
      isEdit: false,
      isEditPhoto: false,
      isEditName: false,
      isEditPhone: false,
      isEditPassword: false,
      type: '',

      editForm: this.$form.createForm(this),
      userInfo: {},
      editUserInfo: {},
      file: null,
    }
  },
  methods: {
    beforeUpload(e) {
      this.file = e.target.files[0]
      let _this = this;
      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(_this.file); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function () {
          _this.editUserInfo.userAvtar = this.result;
          // _this.isShow = true;
      }
      return false;
    },
    clickEdit(type) {
      this.editUserInfo = JSON.parse(JSON.stringify(this.userInfo))
      this.isEdit = true
      this.type = type
      switch(type) {
        case 'photo': this.isEditPhoto = true;break
        case 'name': this.isEditName = true;break
        case 'phone': this.isEditPhone = true;break
        case 'password': this.isEditPassword = true;break
        default: break
      }
    },
    confirmEdit(e) {
      // let formdata = new FormData();
      // formdata.append('files', this.file);
      // formdata.append('userInfo', this.editUserInfo);
      e.preventDefault()
      this.editForm.validateFields(async (err, values) => {
        if (!err) {
          let params = {

            userId: this.userInfo.userId,
            userName: (this.type == 'name')? (this.editForm.getFieldValue('firstName')+this.editForm.getFieldValue('lastName')): this.editUserInfo.userName,
            userAvtar: this.editUserInfo.userAvtar,
            userEmail: this.editUserInfo.userEmail,
            userPhone: (this.type == 'phone')? this.editForm.getFieldValue('phone'): this.editUserInfo.userPhone,
            password: (this.type == 'password')? this.editForm.getFieldValue('password'): this.editUserInfo.password
          }
          debugger;
          this.$http({
            url: this.$http.adornUrl('/dev-api/editAccount'),
            method: 'post',
            data: this.$http.adornData({...params})
          }).then((res) => {
            if (res.status == 200) {
              this.$message.success('success change profile')
              localStorage.setItem('userInfo', {
                userId: '',
                userName: '',
                userAvtar: '',
                userEmail: '',
                userPhone: '',
                password: '',
                userRole: ''
              })
              this.cancelEdit()
              if (this.type == 'password') {
                this.$cookie.set('token', '')
                this.$store.commit('setPath', '/login')
                this.$router.push('/login')
              }
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      })
    },
    cancelEdit() {
      this.editUserInfo = {}
      this.editForm.resetFields()
      this.file = null
      this.isEdit = false
      this.isEditPhoto = false
      this.isEditName = false
      this.isEditPhone = false
      this.isEditPassword = false
      this.type = ''
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  }
  // mounted() {
  //   let _that = this
  //   this.$bus.on('changeEdit', (status)=>{
  //     _that.isEdit = status
  //   })
  // },
  // beforeDestroy() {
  //   this.$bus.off('changeEdit')
  // }
}
</script>

