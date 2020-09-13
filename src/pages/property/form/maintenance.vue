<style lang="less" scoped>
@import './form.less';
</style>
<style lang="less">
.form-modal {
  width: 950px !important;
}
</style>
<template>
  <div>
    <!-- maintenance -->
    <div v-if="type == 'list'">
      <div class="search-head">
        <a-row>
          <a-col :span="4" class="search-head-logo">
            <img src="../../../../static/img/maintenance.svg">
            <span>MAINTANENCE</span>
          </a-col>
          <a-col :span="16">
            <div class="search-top">
              <div class="search-status" @click="changeStatus('all')">ALL</div>
              <div class="search-status" @click="changeStatus('approved')">Approved</div>
              <div class="search-status" @click="changeStatus('rejected')">Rejected</div>
              <div class="search-status" @click="changeStatus('pending')" style="border-right:none;">Pending</div>
            </div>
          </a-col> 
          <a-col :span="4">
            <a-button v-if="userRole > 5" class="search-addForm" type="primary" @click="showChooseModal()">New MAINTANENCE Form</a-button>
          </a-col>
        </a-row>
      </div>
      <div class="content-body">
        <table class="form-table">
          <thead class="ant-table-thead">
            <tr>
              <th style="width:10%;text-align:center;">Tower</th>
              <th style="width:10%;text-align:center;">Unit</th>
              <th style="width:15%;text-align:center;">Name</th>
              <th style="width:10%;text-align:center;">Phone</th>
              <th style="width:10%;text-align:center;">Schedule</th>
              <th style="width:25%;text-align:center;">Problem</th>
              <th style="width:10%;text-align:center;">Status</th>
              <th style="width:10%;text-align:center;">Action</th>
            </tr>
          </thead>
        </table>
        <a-row class="search-center">
          <a-col :span="20">
            <div class="board-card-body-center">
              <a-select v-model="towerChoose" style="width:120px;">
                <a-select-option v-for="tower in towerList" :key="tower.id" :value="tower.id">{{ tower.name }}</a-select-option>
              </a-select>
              <a-input-search v-model="towerInput" placeholder="input search text" enter-button @search="onSearchTower" style="width:200px;margin-left:-5px;"/>
            </div>
          </a-col>
          <a-col :span="4" style="line-height:34px;text-align:right">
            <a-button @click="getHistory()">History</a-button>
          </a-col>
        </a-row>
        <div class="form-table">
          <div v-for="(forms, index) in formData" :key="index" style="margin-bottom:20px;">
            <div class="form-table-owner" style="width:100%;">
              <span>{{ forms.date }}</span>
              <span>{{ forms.time }}</span>
              <span>{{ forms.owner }}</span>
              <span style="float:right;cursor:pointer;" @click="deleteForm(forms)"><a-icon type="delete"></a-icon></span>
            </div>
            <table class="form-table">
              <tbody class="ant-table-tbody">
                <tr>
                  <td style="width:10%;text-align:center;">{{ forms.tower }}</td>
                  <td style="width:10%;text-align:center;">{{ forms.unit }}</td>
                  <td style="width:15%;text-align:center;">{{ forms.name }}</td>
                  <td style="width:10%;text-align:center;">{{ forms.phone }}</td>
                  <td style="width:10%;text-align:center;">{{ forms.schedule }}</td>
                  <td style="width:25%;text-align:center;">{{ forms.problem }}</td>
                  <td style="width:10%;text-align:center;">{{ forms.status }}</td>
                  <td style="width:10%;text-align:center;">
                    <!-- <span v-if="userRole == 4">
                      <a-button v-if="forms.status == 'pending'" @click="approveForm(forms)">approve</a-button>
                      <a-button v-if="forms.status == 'pending'" @click="clickReject(forms)">reject</a-button>
                    </span>
                    <span v-if="userRole == 5">
                      <a-button v-if="forms.status == 'approved'" @click="confirmForm(forms)">confirm</a-button>
                    </span> -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="content-pagination" style="font-size:12pt;">
          <a-pagination
            :total="total"
            :current="currentPage"
            :pageSize="pageSize"
            @change="handlePageChange"
            style="float:right;margin:16px 0;"/>
        </div> 
      </div>
    </div>
    <div v-else-if="type == 'form'">
      <div class="form-body">
        <div class="form-body-title">Maintanence Form</div>
        <a-form class="form-body-form" 
          :labelCol="{xs: { span: 24 },sm: { span: 6 }}" 
          :wrapperCol="{xs: { span: 24 },sm: { span: 18 }}" 
          layout="inline" @submit="sendForm">
          <a-form-item label="Condo" required>
            <a-input class="form-body-form-input" v-model="chooseCondo" :disabled="true"></a-input>
          </a-form-item>
          <a-form-item label="Tower" required>
            <a-input class="form-body-form-input" v-model="chooseTower" :disabled="true"></a-input>
          </a-form-item>
          <a-form-item label="Unit" required>
            <a-input class="form-body-form-input" v-model="chooseUnit" :disabled="true"></a-input>
          </a-form-item>

          <a-form-item label="Name" required>
            <a-input class="form-body-form-input" v-model="tenantInfo.name"></a-input>
          </a-form-item>
          <a-form-item label="Phone" required>
            <a-input class="form-body-form-input" v-model="tenantInfo.phone"></a-input>
          </a-form-item>

          <a-form-item label="Schedule" required>
            <div class="form-body-form-input">
              <a-date-picker v-model="tenantInfo.dateFor" format="YYYY/MM/DD" placeholder="Select Date" style="width:49%;" @change="changeDate"/>
              <a-time-picker v-model="tenantInfo.timeFor" format="HH:mm" placeholder="Select Time" style="width:49%;" @change="changeTime"></a-time-picker>
            </div>
          </a-form-item>          
          
          <a-form-item label="Problem" required>
            <a-textarea class="form-body-form-input" v-model="tenantInfo.problem" :rows="4" style="width:400px;"></a-textarea>
          </a-form-item>
          
          <div v-if="isLack" class="redText ant-form-explain ant-form-extra" style="width:600px;left:0px;top:inherit;">Please complete the information</div>
          <div style="margin-top:20px;width:100%;text-align:right;">
            <a-button type="primary" html-type="submit">Send</a-button>
            <a-button @click="cancelForm">Cancel</a-button>
          </div>
        </a-form>
      </div>
    </div>
    <a-modal v-model="isReject" title="Reject" :footer="null" @cancel="cancelReject">
      <a-form @submit.self="rejectForm" :form="maintenanceform" layout="inline" ref="form" class="search-form-set">
        <a-form-item label="reason">
          <a-input
            v-decorator="[
              'reason',
              {rules: [{ required: true, message: 'please input reason', whitespace: true }]}
            ]"
            placeholder="please input reason" style="width:380px;"/>
        </a-form-item>
      </a-form>
      <div style="margin-top:20px;width:100%;text-align:center;">
        <a-button type="primary" @click="rejectForm">submit</a-button>
      </div>
    </a-modal>
    <a-modal v-model="isShowForm" class="form-modal" title="UnitList" :footer="null" @cancel="cancelShowForm">
      <div class="modal-body">
        <div class="modal-body-type">
          <div v-if="ownerList.length > 0 && tenantList.length > 0">
            <div style="width:50%" class="modal-body-type-owner">IM Owner</div>
            <div style="width:50%" class="modal-body-type-tenant">IM Tenant</div>
          </div>
          <div v-else-if="ownerList.length > 0">
            <div style="width:100%" class="modal-body-type-owner">IM Owner</div>
          </div>
          <div v-else-if="tenantList.length > 0">
            <div style="width:100%" class="modal-body-type-tenant">IM Tenant</div>
          </div>
        </div>
        <div class="modal-body-condo">
          <div class="modal-body-card" v-for="(unit, index) in unitList" :key="index" @click="chooseOneUnit(unit)">
            <div class="modal-body-condo-body">
              <div v-if="unit.type == 'owner'" class="modal-body-condo-title-owner">{{ unit.condoName }}</div>
              <div v-else-if="unit.type == 'tenant'" class="modal-body-condo-title-tenant">{{ unit.condoName }}</div>
              <div class="modal-body-condo-card">
                <div class="modal-body-condo-top">{{ unit.tower }}</div>
                <div class="modal-body-condo-bottom">{{ unit.unit }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'maintenance',
  data () {
    return {
      type: 'list',
      
      user: '',
      userRole: '',
      status: 'all',

      towerChoose: '',
      towerList: [],
      towerInput: '',
      
      loading: false,
      formData: [],

      total: 100,
      currentPage: 1,
      pageSize: 20,

      isReject: false,
      maintenanceform: this.$form.createForm(this),
      rejectInfo: {},

      isShowForm: false,
      unitList: [],
      ownerList: [],
      tenantList: [],
      chooseCondo: '',
      chooseTower: '',
      chooseUnit: '',

      tenantInfo: {},
      isLack: false,
    }
  },
  methods: {
    changeStatus(type) {
      this.status = type
      this.currentPage = 1
      this.getForms()
    },
    handlePageChange(page, pageSize) {
      this.currentPage = page
      this.pageSize = pageSize
      this.getForms()
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
          // this.towerChoose = this.$store.state.condoInfo.tower || ''
          // this.towerInput = this.$store.state.condoInfo.unit || ''
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
      this.currentPage = 1
      this.getForms()
    },
    getForms() {
      let params = {
        userID: this.userID,
        status: this.status,
        tower: this.towerChoose,
        unit: this.towerInput,
        isHisTory: false,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/getMaintenanceList'),
        method: 'get',
        params: this.$http.adornParams({...params})
      }).then(res => {
        if (res.status === 200) {
          this.formData = []
          this.formData = res.data.data.formList
          this.total = res.data.data.formTotal
          this.loading = false
        } else {
          this.$message.error(res.data.message)
        }
      })
      // this.loading = false
      // this.formData = []
      // let len = parseInt(Math.random() * 10)
      // this.total = len
      // for (let i = 0; i < len; i++) {
      //   this.formData.push({
      //     key: i + 1,
      //     tower: '1001',
      //     unit: '1234',
      //     name: 'jazz residence',
      //     phone: '09272895968',
      //     schedule: '2020-10-5',
      //     problem: 'a;sl;kasj;kdfa;skdfjaasdf@homex.ph',
      //     status: 'pending',
      //     date: '2020-10-5',
      //     time: '14:00:00',
      //     owner: 'ABC'
      //   })
      // }
    },
    getHistory() {
      this.currentPage = 1
      let params = {
        userID: this.userID,
        status: this.status,
        tower: this.towerChoose,
        unit: this.towerInput,
        isHisTory: true,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/getMaintenanceList'),
        method: 'get',
        params: this.$http.adornParams({...params})
      }).then(res => {
        if (res.status === 200) {
          this.formData = []
          this.formData = res.data.data.formList
          this.total = res.data.data.formTotal
          this.loading = false
        } else {
          this.$message.error(res.data.message)
        }
      })
      // this.loading = false
      // this.formData = []
      // let len = parseInt(Math.random() * 10)
      // this.total = len
      // for (let i = 0; i < len; i++) {
      //   this.formData.push({
      //     key: i + 1,
      //     tower: '1001',
      //     unit: '1234',
      //     name: 'jazz residence',
      //     phone: '09272895968',
      //     schedule: '2020-10-5',
      //     problem: 'a;sl;kasj;kdfa;skdfjaasdf@homex.ph',
      //     status: 'pending',
      //     date: '2020-10-5',
      //     time: '14:00:00',
      //     owner: 'ABC'
      //   })
      // }
    },
    approveForm(forms) {
      let params = {
        userID: this.userID,
        oldstatus: 'pending',
        newstatus: 'approved',
        formID: forms.id,
        reason: ''
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/changeMaintenanceStatus'),
        method: 'post',
        data: this.$http.adornData({...params})
      }).then(res => {
        if (res.status === 200) {
          this.getForms()
          this.loading = false
          this.$message.success('success approve')
        } else {
          this.loading = false
          this.$message.error('failed approve')
        }
      })
    },
    clickReject(forms) {
      this.isReject = true
      this.rejectInfo = JSON.parse(JSON.stringify(forms))
    },
    cancelReject() {
      this.isReject = false
      this.rejectInfo = {}
      this.maintenanceform.resetFields()
    },
    rejectForm(e) {
      e.preventDefault()
      this.maintenanceform.validateFields(async (err, values) => {
        if (!err) {
          let params = {
            userID: this.userID,
            oldstatus: 'pending',
            newstatus: 'rejected',
            formID: this.rejectInfo.id,
            reason: this.maintenanceform.getFieldValue('reason')
          }
          this.$http({
            url: this.$http.adornUrl('/dev-api/changeMaintenanceStatus'),
            method: 'post',
            data: this.$http.adornData({...params})
          }).then(res => {
            if (res.status === 200) {
              this.cancelReject()
              this.getForms()
              this.loading = false
              this.$message.success('success reject')
            } else {
              this.loading = false
              this.$message.error('failed reject')
            }
          })
        }
      })
    },
    confirmForm(forms) {
      let params = {
        userID: this.userID,
        oldstatus: 'approved',
        newstatus: 'finished',
        formID: forms.id,
        reason: ''
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/changeMaintenanceStatus'),
        method: 'post',
        data: this.$http.adornData({...params})
      }).then(res => {
        if (res.status === 200) {
          this.getForms()
          this.loading = false
          this.$message.success('success confirm')
        } else {
          this.loading = false
          this.$message.error('failed confirm')
        }
      })
    },
    deleteForm(forms) {
      let params = {
        userID: this.userID,
        formID: forms.id
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/deleteMaintenance'),
        method: 'post',
        data: this.$http.adornData({...params})
      }).then(res => {
        if (res.status === 200) {
          this.getForms()
          this.loading = false
          this.$message.success('success delete')
        } else {
          this.loading = false
          this.$message.error('failed delete')
        }
      })
    },
    getUnitList() {
      let params = {
        tower: this.towerChoose,
        unit: this.towerInput
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/getUnitList'),
        method: 'get',
        params: this.$http.adornParams({...params})
      }).then((res) => {
        if (res.status == 200) {
          this.unitList = []
          this.unitList = res.data.data.unitList
          this.ownerList = []
          this.tenantList = []
          this.unitList.forEach((unit)=>{
            if (unit.type == 'owner') {
              this.ownerList.push(unit)
            } else if (unit.type == 'tenant') {
              this.tenantList.push(unit)
            }
          })
        } else {
          this.$message.error('failed get unitList')
        }
      })
      // this.unitList = []
      // this.unitList = [
      //   {id: '1', condo: 'Beacon Condo', tower: 'Tower1', unit: '1001', type: 'owner'},
      //   {id: '2', condo: 'Avida Towers San Lorenzo', tower: 'Tower2', unit: '1010', type: 'owner'},
      //   {id: '3', condo: 'Avida Towers San Lorenzo', tower: 'Tower3', unit: '1011', type: 'tenant'},
      //   {id: '1', condo: 'Beacon Condo', tower: 'Tower1', unit: '1001', type: 'owner'},
      //   {id: '2', condo: 'Avida Towers San Lorenzo', tower: 'Tower2', unit: '1010', type: 'owner'},
      //   {id: '3', condo: 'Avida Towers San Lorenzo', tower: 'Tower3', unit: '1011', type: 'tenant'},
      //   {id: '1', condo: 'Beacon Condo', tower: 'Tower1', unit: '1001', type: 'owner'},
      //   {id: '2', condo: 'Avida Towers San Lorenzo', tower: 'Tower2', unit: '1010', type: 'owner'},
      //   {id: '3', condo: 'Avida Towers San Lorenzo', tower: 'Tower3', unit: '1011', type: 'tenant'}
      // ]
    },
    showChooseModal() {
      this.getUnitList()
      this.isShowForm = true
    },
    cancelShowForm() {
      this.chooseCondo = ''
      this.chooseTower = ''
      this.chooseUnit = ''
      this.ownerList = []
      this.tenantList = []
      this.isShowForm = false
    },
    chooseOneUnit(unit) {
      this.chooseCondo = unit.condo
      this.chooseTower = unit.tower
      this.chooseUnit = unit.unit
      this.isShowForm = false
      this.type = 'form'
    },
    changeDate(date, dateString) {
      this.tenantInfo.date = dateString
    },
    changeTime(time, timeString) {
      this.tenantInfo.time = timeString
    },
    sendForm() {
      if (!this.tenantInfo.name || !this.tenantInfo.phone
      || !this.tenantInfo.date || !this.tenantInfo.time 
      || !this.tenantInfo.problem ) {
        this.isLack = true
      } else {
        this.isLack = false
      }
      if (!this.isLack) {
        let params = {
          user: this.user,
          other: this.chooseCondo,
          tower: this.chooseTower,
          unit: this.chooseUnit,
          tenantInfo: this.tenantInfo
        }
        this.$http({
          url: this.$http.adornUrl('/dev-api/addMaintenance'),
          method: 'post',
          data: this.$http.adornData({...params})
        }).then(res => {
          if (res.status === 200) {
            this.$message.success('success send')
            this.getForms()
            this.cancelForm()
            this.loading = false
          } else {
            this.loading = false
            this.$message.error('failed confirm')
          }
        })
      }
    },
    cancelForm() {
      this.tenantInfo = {}
      this.isLack = false
      this.cancelShowForm()
      this.type = 'list'
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('userInfo')).userName
    this.userRole = JSON.parse(localStorage.getItem('userInfo')).userRole
    this.getTowerList()
    this.getForms()
  }
}
</script>



