<style lang="less" scoped>
@import './dashboard.less';
</style>
<template>
  <div>
    <a-row class="board-row">
      <a-card class="board-card">
        <div class="board-card-title">BEACON CONDO</div>
        <div class="board-card-body">
          <div class="board-card-body-center">
            <a-select v-model="towerChoose" style="width:20%;">
              <a-select-option v-for="tower in towerList" :key="tower.id" :value="tower.id">{{ tower.name }}</a-select-option>
            </a-select>
            <a-input-search v-model="towerInput" placeholder="input search text" enter-button @search="onSearchTower" style="width:40%;"/>
          </div>
        </div>
      </a-card>
      <a-card class="board-card">
        <div class="board-card-title">FORM</div>
        <div class="board-card-body">
          <div class="board-card-body-row">
            <div class="board-card-body-logo" v-for="(logo,index) in formLogos" :key="index" v-if="index < formLogos.length/2" @click="gotoForm(logo)">
              <img v-bind:src="logo.icon">
              <p>{{ logo.title }}</p>
            </div>
          </div>
          <div class="board-card-body-row">
            <div class="board-card-body-logo" v-for="(logo,index) in formLogos" :key="index" v-if="index >= formLogos.length/2" @click="gotoForm(logo)">
              <img v-bind:src="logo.icon">
              <p>{{ logo.title }}</p>
            </div>
          </div>
        </div>
      </a-card>
      <a-card class="board-card">
        <div class="board-card-title">BILL</div>
        <div class="board-card-body">
          <div class="board-card-body-row">
            <div class="board-card-body-logo" v-for="(logo,index) in billLogos" :key="index" v-if="index < billLogos.length/2" @click="gotoBill(logo)" style="cursor:default;">
              <img v-bind:src="logo.icon">
              <p>{{ logo.title }}</p>
            </div>
          </div>
          <div class="board-card-body-row">
            <!-- <div class="board-card-body-logo" v-for="(logo,index) in billLogos" :key="index" v-if="index >= billLogos.length/2" @click="gotoBill(logo)" :style="{cursor:(logo.path)?'pointer':'default'}"> -->
            <div class="board-card-body-logo" v-for="(logo,index) in billLogos" :key="index" v-if="index >= billLogos.length/2" @click="gotoBill(logo)" style="cursor:default;">
              <img v-if="logo.icon" v-bind:src="logo.icon">
              <p>{{ logo.title }}</p>
            </div>
          </div>
        </div>
      </a-card>
    </a-row>
    <a-row class="board-row" style="margin-top:30px;">
      <a-card class="board-card">
        <div class="board-card-title">Statistics</div>
        <div class="board-card-body">
          <div id="pie" class="board-card-body-chart"></div>
          <div class="board-card-body-chart-title">{{ tenantsNum }}Tenants</div>
        </div>
      </a-card>
      <a-card class="board-card">
        <div class="board-card-title-left">To do list</div>
        <div class="board-card-title-icon"><a-icon type="plus-circle" @click="addTodoList()"/></div>
        <div class="board-card-body">
          <div class="todo-list" v-for="(todo, index) in todolist" :key="index">
            <a-icon type="setting" />
            <span class="todo-list-content">
              <span>{{ todo.time }}</span>
              <span :title="todo.content">{{ todo.content }}</span>
            </span>
            <a-icon type="delete" @click="deleteTodo(todo)"/>
          </div>
        </div>
      </a-card>
      <a-card class="board-card">
        <div class="board-card-title-left">Notice</div>
        <div class="board-card-title-icon"><a-icon type="plus-circle" @click="addNotice()"/></div>
        <div class="board-card-body">
          <div class="todo-list" v-for="(notice, index) in noticelist" :key="index">
            <a-icon type="bell" />
            <span class="todo-list-content">
              <span>{{ notice.time }}</span>
              <span :title="notice.content">{{ notice.subject }}</span>
            </span>
            <a-icon type="delete" @click="deleteNotice(notice)"/>
          </div>
        </div>
      </a-card>
    </a-row>
  </div>
</template>

<script>
import drawChart from '../../js/drawChart.js'
export default {
  data () {
    return {
      towerChoose: '',
      towerInput: '',
      towerList: [],

      formLogos: [
        {icon: '/static/img/move_in.png', title: 'Move In', path: 'movein'},
        {icon: '/static/img/move_out.svg', title: 'Move Out', path: 'moveout'},
        {icon: '/static/img/maintenance.svg', title: 'Maintenance', path: 'maintenance'},
        {icon: '/static/img/work_permit.svg', title: 'Work Permit', path: 'workpermit'},
        {icon: '/static/img/gate_pass.svg', title: 'Gate Pass', path: 'gatepass'},
        {icon: '/static/img/complaint.svg', title: 'Complaint', path: 'complaint'},
      ],

      billLogos: [
        {icon: '/static/img/internet.svg', title: 'Internet', path: 'internet'},
        {icon: '/static/img/electricity.svg', title: 'Electricity', path: 'electricity'},
        {icon: '/static/img/car_parking.svg', title: 'Car Parking', path: 'carparking'},
        {icon: '/static/img/water.svg', title: 'Water', path: 'water'},
        {icon: '/static/img/assc_dues.svg', title: 'Assc Dues', path: 'asscdues'},
        {icon: '', title: '', path: ''},
      ],

      tenantsNum: 1,
      tenantsTotal: 10,

      todolist: [],
      noticelist: [],
    }
  },
  computed: {
		userInfo() {
			return JSON.parse(localStorage.getItem('userInfo'))
    }
  },
  methods: {
    getTowerList() {
      let params = {
        userId: this.userInfo.userId
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/getTowerList'),
        method: 'get',
        params: this.$http.adornParams({...params})
      }).then((res) => {
        if (res.status == 200) {
          this.towerList = []
          this.towerList = res.data.data.towerList
          this.towerChoose = this.towerList[0].id
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
    onSearchTower() {
      let params = {
        tower: this.towerChoose,
        unit: this.towerInput
      }
      this.$store.commit('setCondoInfo', params)
      this.$bus.emit('changeMenu', '/property/condo')
    },

    gotoForm(logo) {
      if (logo.path) {
        let path = '/property/form/' + logo.path
        this.$store.commit('setPath', path)
        this.$bus.emit('changeMenu', path)
        // this.$router.push(path)
      }
    },
    gotoBill(logo) {
      // if (logo.path) {
      //   let path = '/property/bill/' + logo.path
      //   this.$store.commit('setPath', path)
      //   this.$bus.emit('changeMenu', path)
      //   // this.$router.push(path)
      // }
    },

    getTenants() {
      this.$http({
        url: this.$http.adornUrl('/dev-api/statisticsUnit'),
        method: 'get',
        params: this.$http.adornParams()
      }).then((res) => {
        if (res.status == 200) {
          this.tenantsNum = res.data.data.tenantsNum
          this.tenantsTotal = res.data.data.tenantsTotal
        } else {
          this.$message.error('failed get tenants')
        }
      })
      // this.tenantsNum = 335
      // this.tenantsTotal = 350
      drawChart.drawPie('pie', this.tenantsTotal, this.tenantsNum)
    },

    getTodoList() {
      let params = {
        userId: this.userInfo.userId
			}
			this.$http({
        url: this.$http.adornUrl('/dev-api/getNotice'),
        method: 'get',
        params: this.$http.adornParams({...params})
      }).then((res) => {
        if (res.status == 200) {
					this.todolist = []
					// this.todoTotal = res.data.data.todoTotal
					this.todolist = res.data.data.noticeList
        } else {
          this.logging = false
          this.$message.error(res.data.message)
        }
      })
      // this.todolist = []
      // this.todolist = [
      //   {id: '1', content: 'ABCDEDFGHIJKLMN', time: '12:00 PM 03/31/2020'},
      //   {id: '2', content: 'ABCDEDFGHIJKLMN', time: '12:00 PM 03/31/2020'},
      //   {id: '1', content: 'ABCDEDFGHIJKLMN', time: '12:00 PM 03/31/2020'},
      //   {id: '2', content: 'ABCDEDFGHIJKLMN', time: '12:00 PM 03/31/2020'},
      //   {id: '1', content: 'ABCDEDFGHIJKLMN', time: '12:00 PM 03/31/2020'},
      //   {id: '2', content: 'ABCDEDFGHIJKLMN', time: '12:00 PM 03/31/2020'},
      //   {id: '1', content: 'ABCDEDFGHIJKLMN', time: '12:00 PM 03/31/2020'},
      //   {id: '2', content: 'ABCDEDFGHIJKLMN', time: '12:00 PM 03/31/2020'}
      // ]
    },
    deleteTodo(todo) {
      let params = {
        userId: this.userInfo.userId,
        noticeID: notice.id
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/deleteTodo'),
        method: 'post',
        data: this.$http.adornData({...params})
      }).then((res) => {
        if (res.status == 200) {
          this.$message.success('success delete to do')
          this.getTodoList()
        } else {
          this.$message.error('failed delete to do')
        }
      })
    },
    addTodoList() {
      this.$store.commit('setPath', '/property/addtodo')
      this.$router.push('/property/addtodo')
    },

    getNoticeList() {
      let params = {
        userId: this.userInfo.userId
			}
			this.$http({
        url: this.$http.adornUrl('/dev-api/getNotice'),
        method: 'get',
        params: this.$http.adornParams({...params})
      }).then((res) => {
        if (res.status == 200) {
					this.noticelist = []
					// this.noticeTotal = res.data.data.noticeTotal
					this.noticelist = res.data.data.noticeList
        } else {
          this.logging = false
          this.$message.error(res.data.message)
        }
      })
      // this.noticelist = []
      // this.noticelist = [
      //   {id: '1', content: 'ABCDEDFGHIJKLMN', time: '12:00 PM 03/31/2020'},
      //   {id: '2', content: 'ABCDEDFGHIJKLMN', time: '12:00 PM 03/31/2020'}
      // ]
    },
    deleteNotice(notice) {
      let params = {
        userId: this.userInfo.userId,
        noticeID: notice.id
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/deleteNotice'),
        method: 'post',
        data: this.$http.adornData({...params})
      }).then((res) => {
        if (res.status == 200) {
          this.$message.success('success delete')
          this.getNoticeList()
        } else {
          this.$message.error('failed delete notice')
        }
      })
    },
    addNotice() {
      this.$store.commit('setPath', '/property/addnotice')
      this.$router.push('/property/addnotice')
    }
  },
  created() {
    let userInfo = this.userInfo
    this.getTowerList()
    this.getTodoList()
    this.getNoticeList()
  },
  mounted() {
    this.getTenants()
  }
}
</script>

