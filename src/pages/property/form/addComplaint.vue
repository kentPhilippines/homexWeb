<style lang="less" scoped>
@import './form.less';
</style>
<style lang="less">
.about-body-body .ant-upload.ant-upload-select-picture-card {
  margin-top: 20px;
}
.account-card-content .ant-upload-list {
  display: none;
}
</style>

<template>
  <div>
    <!-- addComplaint -->
    <div class="search-head">
      <a-row>
        <a-col :span="20" class="search-head-logo">
          <img src="../../../../static/img/complaint.svg">
          <span>Complaint</span>
        </a-col>
      </a-row>
    </div>
    <div class="content-body">
      <div class="account-body">
        <div class="account-title">Complaint</div>
        <a-card class="account-card">
          <a-row>
            <a-col :span="24">
              <a-textarea v-model="complaint" placeholder="Please enter your complaint" :rows="8" />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="20" class="account-card-content" style="height:120px;">
              <img v-for="(photo, index3) in photoList" :key="index3" :src="photo.url">
              <a-upload
                list-type="picture-card"
                :before-upload="handleChange">
                <div style="margin:20px 0 0 20px;">
                  <a-icon type="plus" />
                  <div class="ant-upload-text" >
                    Upload
                  </div>
                </div>
              </a-upload>
            </a-col>
          </a-row>
          <div v-if="hasComplaint" class="redText ant-form-explain ant-form-extra" style="width:600px;left:0px;top:inherit;">Please complete the tenant info</div>
          <a-row>
            <a-col :span="24" style="text-align: right;">
              <a-button type="primary" @click="addComplaint">Submit</a-button>
              <a-button @click="cancelComplaint">Cancel</a-button>
            </a-col>
          </a-row>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addComplaint',
  data () {
    return {
      userInfo: {},
      complaint: '',
      photoList: [],
      hasComplaint: false
    }
  },
  methods: {
    handleChange(fileList) {
      let _this = this;
      if (!fileList || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(fileList); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function () {
          _this.photoList.push({...fileList, url: this.result});
          // _this.isShow = true;
      }
      return false;
    },
    addComplaint() {
      if (!this.complaint) {
        this.hasComplaint = true
      } else {
        this.hasComplaint = false
      }
      if (!this.hasComplaint) {
        let params = {
          userID: this.userInfo.userID,
          complaint: this.complaint,
          photoList: this.photoList
        }
        this.$http({
          url: this.$http.adornUrl('/dev-api/addComplaint'),
          method: 'post',
          data: this.$http.adornData({...params})
        }).then((res) => {
          if (res.status == 200) {
            this.$message.success('success send answer')
            this.cancelComplaint()
          } else {
            this.$message.error('failed send answer')
          }
        })
      }
    },
    cancelComplaint() {
      this.complaint = ''
      this.photoList = []
      this.$store.commit('setPath', '/property/form/complaint')
      this.$router.push('/property/form/complaint')
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  }
}
</script>
