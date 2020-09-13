<style lang="less" scoped>
@import './form.less';
</style>

<template>
  <div>
    <!-- complaint -->
    <div class="search-head">
      <a-row>
        <a-col :span="18" class="search-head-logo">
          <img src="../../../../static/img/complaint.svg">
          <span>Complaint</span>
        </a-col>
        <a-col :span="4">
          <a-button v-if="userRole > 5" class="search-addForm" type="primary" @click="gotoAdd()">Make a complaint</a-button>
        </a-col>
      </a-row>
    </div>
    <div class="content-body"> 
      <div class="content-body-list" v-for="(complaint, index) in complaintList" :key="index">
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
        <a-row style="min-height:40px;line-height:20px;font-size:16px;margin:10px 0px;cursor:pointer;">
          <a-col :span="2"></a-col>
          <a-col :span="20" @click="goToAnswer(complaint)">{{ complaint.content.text || 'no content' }}</a-col>
          <!-- <a-col :span="20" @click="goToAnswer(complaint)" :style="{background:(complaint.userInfo.role == 4)?'#F2F2F2':''}">{{ complaint.content.text || 'no content' }}</a-col> -->
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
      <a-row style="min-height:40px;line-height:20px;font-size:16px;margin:10px 0px;">
        <a-col :span="2"></a-col>
        <a-col :span="20">
          <a-pagination
            :total="total"
            :current="currentPage"
            :pageSize="pageSize"
            @change="handlePageChange"
            style="float:right;margin:16px 0;"/>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'complaint',
  data () {
    return {
      userID: '',
      userRole: '',
      complaintList: [],

      total: 100,
      currentPage: 1,
      pageSize: 20
    }
  },
  methods: {
    handlePageChange(page, pageSize) {
      this.currentPage = page
      this.pageSize = pageSize
      this.getComplaintList()
    },
    getComplaintList() {
      let params = {
        userID: this.userID,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/getComplaintList'),
        method: 'get',
        params: this.$http.adornParams({...params})
      }).then((res) => {
        if (res.status == 200) {
          this.complaintList = []
          this.complaintList = res.data.data.complaintList
          this.total = res.data.data.complaintTotal
        } else {
          this.$message.error('failed get complaintList')
        }
      })
      // this.complaintList = []
      // this.complaintList = [
      //   {id: 1, userInfo: {name: 'a', avator: '', role: 4,}, date: '2020-07-11', time: '14:00:00', status: true, content: {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.', imgUrls: ['','']}},
      //   {id: 2, userInfo: {name: 'a', avator: '', role: 1,}, date: '2020-07-11', time: '14:00:00', status: true, content: {text: '', imgUrls: []}},
      //   {id: 3, userInfo: {name: 'a', avator: '', role: 2,}, date: '2020-07-11', time: '14:00:00', status: true, content: {text: '', imgUrls: []}},
      //   {id: 4, userInfo: {name: 'a', avator: '', role: 1,}, date: '2020-07-11', time: '14:00:00', status: true, content: {text: '', imgUrls: []}},
      // ]
    },
    goToAnswer(obj) {
      let path = '/property/form/answer'
      this.$store.commit('setPath', path)
      this.$router.push({'path': path, query: {complaint: obj}})
    },
    gotoAdd() {
      let path = '/property/form/addcomplaint'
      this.$store.commit('setPath', path)
      this.$router.push(path)
    }
  },
  created() {
    this.userID = JSON.parse(localStorage.getItem('userInfo')).userID
    this.userRole = JSON.parse(localStorage.getItem('userInfo')).userRole
    this.getComplaintList()
  }
}
</script>
