<style lang="less" scoped>
@import './about.less';
</style>
<style lang="less">
.about-body-body .ant-upload.ant-upload-select-picture-card {
  margin-top: 20px;
}
.about-body-body .ant-upload-list {
  display: none;
}
</style>

<template>
  <div class="about-page">
    <div class="about-body-left">
      <div class="about-body-title">About</div>
      <div class="about-body-body" v-if="isEditLeft">
        <div>
          <a-textarea class="about-body-content" v-model="editAbout"></a-textarea>
        </div>
        <div>
          <img v-for="(editimg, index3) in editCondoImgs" :key="index3" :src="editimg.url">
          <a-upload
            list-type="picture-card"
            :before-upload="handleChange">
            <div>
              <a-icon type="plus" />
              <div class="ant-upload-text" >
                Upload
              </div>
            </div>
          </a-upload>
        </div>
      </div>
      <div class="about-body-body" v-else>
        <div>{{ about }}</div>
        <div>
          <img v-for="(condo, index) in condoImgs" :key="index" :src="condo">
        </div>
      </div>
      <div class="about-body-title">Contact</div>
      <div class="about-body-body" v-if="isEditLeft">
        <a-row class="about-body-body-row">
          <a-col :span="24">
            <div class="about-body-body-label">Office time:</div>
            <a-input class="about-body-body-content" v-model="editContactInfo.time"></a-input>
          </a-col>
        </a-row>
        <a-row class="about-body-body-row">
          <a-col :span="11">
            <div class="about-body-body-label">Admin:</div>
            <a-input class="about-body-body-content" v-model="editContactInfo.phone"></a-input>
          </a-col>
          <a-col :span="2"></a-col>
          <a-col :span="11">
            <a-icon type="plus-circle" @click="addTower"></a-icon>
            add tower
          </a-col>
        </a-row>
        <div v-for="(tower, index2) in editContactInfo.tower" :key="index2">
          <div class="about-body-body-row-small">
            <a-input class="about-body-body-label" v-model="tower.name"></a-input>
            <a-input class="about-body-body-content" v-model="tower.phone"></a-input>
          </div>
          <a-icon class="about-body-body-row-small-icon" type="minus-circle" @click="editContactInfo.tower.splice(index2, 1)"></a-icon>
        </div>
        <div style="clear:both;"></div>
        <a-row class="about-body-body-row">
          <a-col :span="24">
            <div class="about-body-body-label">Admin Email:</div>
            <a-input class="about-body-body-content" v-model="editContactInfo.email"></a-input>
          </a-col>
        </a-row>
        <a-row class="about-body-body-row">
          <a-col :span="24">
            <div class="about-body-body-label">Location:</div>
            <a-input class="about-body-body-content" v-model="editContactInfo.location"></a-input>
          </a-col>
        </a-row>
      </div>
      <div class="about-body-body" v-else>
        <a-row class="about-body-body-row">
          <a-col :span="24">
            <div class="about-body-body-label">Office time:</div>
            <div class="about-body-body-content">{{ contactInfo.time }}</div>
          </a-col>
        </a-row>
        <a-row class="about-body-body-row">
          <a-col :span="11">
            <div class="about-body-body-label">Admin:</div>
            <div class="about-body-body-content">{{ contactInfo.phone }}</div>
          </a-col>
          <a-col :span="2"></a-col>
        </a-row>
        <div v-for="(tower, index2) in contactInfo.tower" :key="index2" v-if="index2 > 0">
          <div class="about-body-body-row-small">
            <div class="about-body-body-label">{{ tower.name }}</div>
            <div class="about-body-body-content">{{ tower.phone }}</div>
          </div>
        </div>
        <a-row class="about-body-body-row">
          <a-col :span="24">
            <div class="about-body-body-label">Admin Email:</div>
            <div class="about-body-body-content">{{ contactInfo.email }}</div>
          </a-col>
        </a-row>
        <a-row class="about-body-body-row">
          <a-col :span="24">
            <div class="about-body-body-label">Location:</div>
            <div class="about-body-body-content">{{ contactInfo.location }}</div>
          </a-col>
        </a-row>
      </div>
      <!-- <a-row>
        <a-col :span="24" style="text-align:right;">
          <a-button v-if="!isEditLeft && userInfo.userRole == 4" type="primary" @click="clickEditLeft">Edit</a-button>
          <a-button v-if="isEditLeft" type="primary" @click="confirmEditLeft">Submit</a-button>
          <a-button v-if="isEditLeft" @click="cancelEditLeft">Cancel</a-button>
        </a-col>
      </a-row> -->
    </div>
    <div class="about-body-right">
      <div class="about-body-title">Rules</div>
      <div class="about-body-rule" v-if="isEditRight">
        <div v-for="(rule, index4) in editRules" :key="index4" style="margin-bottom:20px;">
          <a-textarea class="about-body-rule-content" v-model="rule.text"></a-textarea>
          <a-icon type="minus-circle" @click="editRules.splice(index4, 1)">-reduce</a-icon>
        </div>
        <a-row>
          <a-col :span="24" style="text-align:right;">
            <a-button type="primary" @click="addRules">+Add</a-button>
          </a-col>
        </a-row>
      </div>
      <div class="about-body-rule" v-else>
        <div v-for="(rule, index5) in rules" :key="index5" style="margin-bottom:20px;">
          {{ (index5+1)+':'+rule.text }}
        </div>
      </div>
      <!-- <a-row>
        <a-col :span="24" style="text-align:right;">
          <a-button v-if="!isEditRight && userInfo.userRole == 4" type="primary" @click="clickEditRight">Edit</a-button>
          <a-button v-if="isEditRight" type="primary" @click="confirmEditRight">Submit</a-button>
          <a-button v-if="isEditRight" @click="cancelEditRight">Cancel</a-button>
        </a-col>
      </a-row> -->
    </div>
    <div class="about-body-bottom">
      <a-row>
        <a-col :span="24" style="text-align:right;">
          <a-button v-if="!isEdit && userInfo.userRole == 4" type="primary" @click="clickEdit">Edit</a-button>
          <a-button v-if="isEdit" type="primary" @click="confirmEdit">Submit</a-button>
          <a-button v-if="isEdit" @click="cancelEdit">Cancel</a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
      userInfo: {},
      condo: '',

      isEditLeft: false,
      about: '',
      condoImgs: [{url:''}],
      contactInfo: {
        time:'',phone:'',tower:[],email:'',location:''
      },
      rules: [],

      isEditRight: false,
      editAbout: '',
      editCondoImgs: [],
      editContactInfo: {
        time:'',phone:'',tower:[],email:'',location:''
      },
      editRules: [],

      isEdit: false,
    }
  },
  methods: {
    handleChange(fileList) {
      let _this = this;
      if (!fileList || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(fileList); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function () {
          _this.editCondoImgs.push({...fileList, url: this.result});
          // _this.isShow = true;
      }
      return false;
    },
    getAboutInfo() {
      let params = {
        userId: this.userInfo.userId,
        condo: this.condo
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/condo/getCondoAbout'),
        method: 'post',
        params: this.$http.adornParams({...params})
      }).then((res) => {
        debugger;
        if (res.status == 200) {
          this.about = res.data.result.basicInfo.content
          this.condoImgs = res.data.result.basicInfo.condoImgs
          this.contactInfo = res.data.result.contactInfo
          this.rules = res.data.result.rules
          // this.about = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.'
          // this.condoImgs = [
          //   {url:'../../../static/img/head_icon_black.svg'},
          //   {url:'../../../static/img/head_icon_black.svg'}
          // ]
          // this.contactInfo = {
          //   time:'',admin:'',tower:['aaa','bbb'],email:'',location:''
          // }
          // this.rules = [
          //   {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.'},
          //   {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.'},
          //   {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.'},
          // ]
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    clickEditLeft() {
      this.editAbout = JSON.parse(JSON.stringify(this.about))
      this.editCondoImgs = JSON.parse(JSON.stringify(this.condoImgs))
      this.editContactInfo = JSON.parse(JSON.stringify(this.contactInfo))
      this.isEditLeft = true
    },
    confirmEditLeft() {
      // let formdata = new FormData();
      // formdata.append('files', this.editCondoImgs);
      // formdata.append('userInfo', params);
      let params = {
        content: this.editAbout,
        condoImgs: this.editCondoImgs,
        ...this.editContactInfo,
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/editCondoBasicAbout'),
        method: 'post',
        data: this.$http.adornData({...params})
      }).then((res) => {
        if (res.status == 200) {
          this.$message.success('success change content')
          this.cancelEditLeft()
          this.getAboutInfo()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    cancelEditLeft() {
      this.editAbout = ''
      this.editCondoImgs = []
      this.editContactInfo = {
        time:'',phone:'',tower:[],email:'',location:''
      }
      this.isEditLeft = false
    },
    clickEditRight() {
      this.editRules = JSON.parse(JSON.stringify(this.rules))
      this.isEditRight = true
    },
    confirmEditRight() {
      let params = {
        rules: this.editRules
      }
      // this.$http({
      //   url: this.$http.adornUrl('api/login'),
      //   method: 'post',
      //   data: this.$http.adornData({...params})
      // }).then((res) => {
      //   if (res.status == 200) {
          this.$message.success('success change profile')
          this.cancelEditRight()
          this.getAboutInfoRight()
      //   } else {
      //     this.$message.error(res.data.message)
      //   }
      // })
    },
    cancelEditRight() {
      this.editRules = []
      this.isEditRight = false
    },
    addRules() {
      this.editRules.push({text:''})
    },
    addTower() {
      this.editContactInfo.tower.push({name:'', phone:''})
    },
    clickEdit() {
      this.clickEditLeft()
      this.clickEditRight()
      this.isEdit = true
    },
    confirmEdit() {
      // let formdata = new FormData();
      // formdata.append('files', this.editCondoImgs);
      // formdata.append('userInfo', params);
      let params = {
        content: this.editAbout,
        condoImgs: this.editCondoImgs,
        ...this.editContactInfo,
        rules: this.editRules
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/editCondoAbout'),
        method: 'post',
        data: this.$http.adornData({...params})
      }).then((res) => {
        if (res.status == 200) {
          this.$message.success('success change about info')
          this.cancelEdit()
          this.getAboutInfo()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    cancelEdit() {
      this.isEdit = false
      this.cancelEditLeft()
      this.cancelEditRight()
    },
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.condo = this.$router.currentRoute.query.condo
    this.getAboutInfo()
  }
}
</script>

