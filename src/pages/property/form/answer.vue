
<style lang="less" scoped>
@import './form.less';
</style>

<template>
  <div>
    <!-- answer -->
    <div class="search-head">
      <a-row>
        <a-col :span="20" class="search-head-logo">
          <img src="../../../../static/img/complaint.svg">
          <span>Complaint</span>
        </a-col>
      </a-row>
    </div>
    <div class="content-body">
      <div class="content-body-list">
        <a-row style="height:40px;line-height:40px;font-size:18px;font-weight: bold;">
          <a-col :span="2" style="text-align:right;">
            <img class="user-avator" :src="complaint.userInfo.avator || '../../../../static/img/head_icon_black.svg'">
          </a-col>
          <a-col :span="4">
            <span>Name</span>
            <span>{{ complaint.userInfo.name }}</span>
          </a-col>
          <a-col :span="4">
            <span>{{ complaint.date }}</span>
            <span>{{ complaint.time }}</span>
          </a-col>
          <a-col :span="9"></a-col>
          <a-col :span="3" style="text-align:right;">
            <span class="complaint-status">{{ complaint.status? 'Fixed': 'Not Fixed' }}</span>
          </a-col>
          <a-col :span="2"></a-col>
        </a-row>
        <a-row style="min-height:40px;line-height:20px;font-size:16px;margin:10px 0px;">
          <a-col :span="2"></a-col>
          <a-col :span="20">{{ complaint.content.text || 'no content' }}</a-col>
          <a-col :span="2"></a-col>
        </a-row>
        <a-row style="min-height:40px;">
          <a-col :span="2"></a-col>
          <a-col :span="20">
            <div v-for="(imgurl, ind) in complaint.content.imgUrls" :key="ind" class="content-img">
              <img :src="imgurl || '../../../../static/img/head_icon_black.svg'">
            </div>
          </a-col>
          <a-col :span="2"></a-col>
        </a-row>
      </div>
      <div v-if="userInfo.userRole == 4" class="content-body-list">
        <a-row style="height:40px;line-height:40px;font-size:18px;font-weight: bold;">
          <a-col :span="2" style="text-align:right;">
            <img class="user-avator" :src="userInfo.avator || '../../../../static/img/head_icon_black.svg'">
          </a-col>
          <a-col :span="4">
            <span>Name</span>
            <span>{{ userInfo.name }}</span>
          </a-col>
          <a-col :span="16"></a-col>
          <a-col :span="2"></a-col>
        </a-row>
        <a-row style="min-height:40px;line-height:20px;font-size:16px;margin:10px 0px;cursor:pointer;">
          <a-col :span="2"></a-col>
          <a-col :span="20">
            <a-textarea
              :row="4"
              v-model="newAnswer"
              placeholder="please input answer" />
          </a-col>
          <a-col :span="2"></a-col>
        </a-row>
        <a-row style="height:40px;line-height:40px;">
          <a-col :span="2"></a-col>
          <a-col :span="17"></a-col>
          <a-col :span="3" style="text-align:right;">
            <a-button type="primary" @click="addAnswer">Send</a-button>
          </a-col>
          <a-col :span="2"></a-col>
        </a-row>
      </div>
      <div class="content-body-list" v-for="(answer, index) in answerList" :key="index">
        <a-row style="height:40px;line-height:40px;font-size:18px;font-weight: bold;">
          <a-col :span="2" style="text-align:right;">
            <img class="user-avator" :src="answer.userInfo.avator || '../../../../static/img/head_icon_black.svg'">
          </a-col>
          <a-col :span="4">
            <span>Name</span>
            <span>{{ answer.userInfo.name }}</span>
          </a-col>
          <a-col :span="4">
            <span>{{ answer.date }}</span>
            <span>{{ answer.time }}</span>
          </a-col>
          <a-col :span="9"></a-col>
          <a-col :span="3"></a-col>
          <a-col :span="2"></a-col>
        </a-row>
        <a-row style="min-height:40px;line-height:20px;font-size:16px;margin:10px 0px;">
          <a-col :span="2"></a-col>
          <a-col :span="20" :style="{background:(answer.userInfo.role == 4)?'#F2F2F2':''}">{{ answer.content || 'no content' }}</a-col>
          <a-col :span="2"></a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'answer',
  data () {
    return {
      userInfo: {},
      complaint: {},
      answerList: [],
      newAnswer: '',
    }
  },
  methods: {
    changeDate1(time) {
      var date = new Date(time)
      let year = date.getFullYear()
      let monthtemp = date.getMonth() + 1
      let month = (monthtemp >= 10) ? monthtemp : ('0' + monthtemp)
      let daytemp = date.getDate()
      let day = (daytemp >= 10) ? daytemp : ('0' + daytemp)
      let hourtemp = date.getHours()
      let hour = (hourtemp >= 10) ? hourtemp : ('0' + hourtemp)
      let minutetemp = date.getMinutes()
      let minute = (minutetemp >= 10) ? minutetemp : ('0' + minutetemp)
      return year + '/' + month + '/' + day + '/ '
    },
    changeDate2(time) {
      var date = new Date(time)
      let year = date.getFullYear()
      let monthtemp = date.getMonth() + 1
      let month = (monthtemp >= 10) ? monthtemp : ('0' + monthtemp)
      let daytemp = date.getDate()
      let day = (daytemp >= 10) ? daytemp : ('0' + daytemp)
      let hourtemp = date.getHours()
      let hour = (hourtemp >= 10) ? hourtemp : ('0' + hourtemp)
      let minutetemp = date.getMinutes()
      let minute = (minutetemp >= 10) ? minutetemp : ('0' + minutetemp)
      return hour + ':' + minute
    },
    getComplaintInfo() {
      let params = {
        // userID: this.userInfo.userID,
        complaintID: this.complaint.id
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/getAnswerList'),
        method: 'get',
        params: this.$http.adornParams({...params})
      }).then((res) => {
        if (res.status == 200) {
          this.answerList = []
          this.answerList = res.data.data.answerList
        } else {
          this.$message.error('failed get answer info')
        }
      })
      // this.answerList = []
      // this.answerList = [
      //   {id: 1, userInfo: {name: 'a', avator: ''}, date: '2020-07-11', time: '14:00:00', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. '},
      //   {id: 2, userInfo: {name: 'a', avator: ''}, date: '2020-07-11', time: '14:00:00', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. '},
      //   {id: 3, userInfo: {name: 'a', avator: ''}, date: '2020-07-11', time: '14:00:00', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. '},
      //   {id: 4, userInfo: {name: 'a', avator: ''}, date: '2020-07-11', time: '14:00:00', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.'},
      // ]
    },
    addAnswer() {
      let params = {
        userID: this.userInfo.userID,
        complaintID: this.complaint.id,
        answer: this.newAnswer
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/addAnswer'),
        method: 'post',
        data: this.$http.adornData({...params})
      }).then((res) => {
        if (res.status == 200) {
          this.$message.success('success send answer')
          this.newAnswer = ''
          this.getComplaintInfo()
        } else {
          this.$message.error('failed send answer')
        }
      })
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.complaint = this.$router.currentRoute.query.complaint
    this.getComplaintInfo()
  }
}
</script>
