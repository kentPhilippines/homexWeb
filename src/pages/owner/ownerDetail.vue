<style lang="less" scoped>
@import './detail.less';
</style>
<style lang="less">
.detail-body-content .ant-input, .detail-body-content .ant-select-selection--single{
  height: 40px !important;
  font-size: 20px !important;
}
.detail-body-content .ant-select-selection__rendered {
  line-height: 40px !important;
}
</style>

<template>
  <div>
    <!-- ownerDetail -->
    <div class="detail-top"><a @click="gotoAbout()">{{ condo }}</a></div>
    <div class="detail-body">
      <div class="detail-body-top">
        <span class="detail-body-label-top">Tower：</span>
        <span class="detail-body-content-top">{{ tower }}</span>
        <span class="detail-body-label-top">Unit：</span>
        <span class="detail-body-content-top">{{ unit }}</span>
        <span class="detail-body-label-top">Area：</span>
        <span class="detail-body-content-top">{{ basicInfo.area }}&nbsp;&nbsp;sqm</span>
        <span class="detail-body-label-top">Type：</span>
        <span class="detail-body-content-top">{{ basicInfo.type }}</span>
        <span class="detail-body-label-top">Parking：</span>
        <span class="detail-body-content-top">{{ basicInfo.parking }}</span>
      </div>
    </div>
    <div class="detail-title">OWNER INFO：</div>
    <div class="detail-body">
      <a-row class="detail-body-row">
        <a-col :span="11">
          <span class="detail-body-label">SPA：</span>
          <span v-if="!isEditOwner" class="detail-body-content">{{ ownerInfo.spa }}</span>
          <a-input v-if="isEditOwner" v-model="editOwnerInfo.spa" class="detail-body-content"></a-input>
        </a-col>
        <a-col :span="11">
          <span class="detail-body-label">ID No.：</span>
          <span v-if="!isEditOwner" class="detail-body-content">{{ ownerInfo.idnumber }}</span>
          <a-input v-if="isEditOwner" v-model="editOwnerInfo.idnumber" class="detail-body-content"></a-input>
        </a-col>
      </a-row>
      <a-row class="detail-body-row">
        <a-col :span="11">
          <span class="detail-body-label">Contact No.：</span>
          <span v-if="!isEditOwner" class="detail-body-content">{{ ownerInfo.spacontactNumber }}</span>
          <a-input v-if="isEditOwner" v-model="editOwnerInfo.spacontactNumber" class="detail-body-content"></a-input>
        </a-col>
        <a-col :span="11">
          <span class="detail-body-label">Email：</span>
          <span v-if="!isEditOwner" class="detail-body-content">{{ ownerInfo.spaemail }}</span>
          <a-input v-if="isEditOwner" v-model="editOwnerInfo.spaemail" class="detail-body-content"></a-input>
        </a-col>
      </a-row>
      <div v-if="isEditOwner" class="detail-title-icon"><a-icon type="plus-circle" @click="addOwner()"/></div>
    </div>
    <div class="detail-title">TENANT INFO：</div>
    <div class="detail-body">
      <a-row v-if="!isEditTenant" v-for="(tenant, index) in tenantInfo.tenantList" :key="index" class="detail-body-row">
        <a-col :span="11">
          <span class="detail-body-label">Tenant：</span>
          <span class="detail-body-content">{{ tenant.tenant }}</span>
        </a-col>
        <a-col :span="11">
          <span class="detail-body-label">ID No.：</span>
          <span class="detail-body-content">{{ tenant.idnumber }}</span>
        </a-col>
      </a-row>
      <a-row v-if="isEditTenant" v-for="(tenant, index) in editTenantInfo.tenantList" :key="index" class="detail-body-row">
        <a-col :span="11">
          <span class="detail-body-label">Tenant：</span>
          <a-input v-model="tenant.tenant" class="detail-body-content"></a-input>
        </a-col>
        <a-col :span="11">
          <span class="detail-body-label">ID No.：</span>
          <a-input v-model="tenant.idnumber" class="detail-body-content"></a-input>
        </a-col>
        <a-col :span="2" style="text-align:right;">
          <div class="detail-body-icon"><a-icon type="minus-circle" @click="deleteSingleTenant(index)"/></div>
        </a-col>
      </a-row>
      <a-row class="detail-body-row">
        <a-col :span="11">
          <span class="detail-body-label">Contact No.：</span>
          <span v-if="!isEditTenant" class="detail-body-content">{{ tenantInfo.contactNumber }}</span>
          <a-input v-if="isEditTenant" v-model="editTenantInfo.contactNumber" class="detail-body-content"></a-input>
        </a-col>
        <a-col :span="11">
          <span class="detail-body-label">Email：</span>
          <span v-if="!isEditTenant" class="detail-body-content">{{ tenantInfo.email }}</span>
          <a-input v-if="isEditTenant" v-model="editTenantInfo.email" class="detail-body-content"></a-input>
        </a-col>
      </a-row>
      <a-row class="detail-body-row">
        <a-col :span="11">
          <span class="detail-body-label">Move in：</span>
          <span v-if="!isEditTenant" class="detail-body-content">{{ tenantInfo.movein }}</span>
          <a-date-picker v-if="isEditTenant" format="YYYY/MM/DD" class="detail-body-content" @change="getTenantMoveinDateChange" />
        </a-col>
        <a-col :span="11">
          <span class="detail-body-label">Move out.：</span>
          <span v-if="!isEditTenant" class="detail-body-content">{{ tenantInfo.moveout }}</span>
          <a-date-picker v-if="isEditTenant" format="YYYY/MM/DD" class="detail-body-content" @change="getTenantMoveoutDateChange" />
        </a-col>
      </a-row>
      <a-row class="detail-body-row">
        <a-col :span="11">
          <span class="detail-body-label">Broker：</span>
          <span v-if="!isEditTenant" class="detail-body-content">{{ tenantInfo.broker }}</span>
          <a-input v-if="isEditTenant" v-model="editTenantInfo.broker" class="detail-body-content"></a-input>
        </a-col>
        <a-col :span="11">
          <span class="detail-body-label">Contact No.：</span>
          <span v-if="!isEditTenant" class="detail-body-content">{{ tenantInfo.brokeridnumber }}</span>
          <a-input v-if="isEditTenant" v-model="editTenantInfo.brokeridnumber" class="detail-body-content"></a-input>
        </a-col>
      </a-row>
      <!-- <a-row class="detail-body-row">
        <a-col :span="11">
          <span class="detail-body-label">Contact No.：</span>
          <span v-if="!isEditTenant" class="detail-body-content">{{ tenantInfo.brokercontactNumber }}</span>
          <a-input v-if="isEditTenant" v-model="editTenantInfo.brokercontactNumber" class="detail-body-content"></a-input>
        </a-col>
        <a-col :span="11">
          <span class="detail-body-label">Email：</span>
          <span v-if="!isEditTenant" class="detail-body-content">{{ tenantInfo.brokeremail }}</span>
          <a-input v-if="isEditTenant" v-model="editTenantInfo.brokeremail" class="detail-body-content"></a-input>
        </a-col>
      </a-row> -->
      <div v-if="isEditTenant" class="detail-title-icon"><a-icon type="plus-circle" @click="addTenant()"/></div>
    </div>
    <div class="detail-title">Rental payment：</div>
    <div class="detail-body">
      <a-row class="detail-body-row">
        <a-col :span="22">
          <span class="detail-body-label">Contract：</span>
          <span class="detail-body-content">
            <div v-if="!isEditRental" style="display:inline-block;min-width:340px;">
              {{ rentalInfo.contactStartDate }} ~ {{ rentalInfo.contactEndDate }}
            </div>
            <a-select v-if="isEditRental" style="width:200px;" @change="changeRentalContactDate">
              <a-select-option v-for="(cont, ind1) in contractList" :key="ind1" :value="cont.value">{{ cont.label }}</a-select-option>
            </a-select>
            <a-range-picker v-if="isEditRental" style="width:340px;" :value="rentalContactDate" @change="getRentalContactDateChange" />
          </span>
        </a-col>
      </a-row>
      <a-row class="detail-body-row">
        <a-col :span="11">
          <span class="detail-body-label">Deposit：</span>
          <span v-if="!isEditRental" class="detail-body-content-2">{{ rentalInfo.deposit || '\xa0' }}</span>
          <a-input-number v-if="isEditRental" v-model="editRentalInfo.deposit" class="detail-body-content-2"></a-input-number>
          <span class="detail-body-content-unit">Pesos</span>
        </a-col>
        <a-col :span="11">
          <span class="detail-body-label">Rental Rate：</span>
          <span v-if="!isEditRental" class="detail-body-content-2">{{ rentalInfo.rentalRate || '\xa0' }}</span>
          <a-input-number v-if="isEditRental" v-model="editRentalInfo.rentalRate" class="detail-body-content-2" @click="changeRate"></a-input-number>
          <span class="detail-body-content-unit">Pesos</span>
        </a-col>
      </a-row>
      <a-row class="detail-body-row">
        <a-col :span="11">
          <span class="detail-body-label">Payment Terms：</span>
          <span v-if="!isEditRental" class="detail-body-content">{{ rentalInfo.terms || '\xa0' }}</span>
          <a-select v-if="isEditRental" class="detail-body-content" v-model="editRentalInfo.terms" @change="changeRentalTerms">
            <a-select-option v-for="(term, ind2) in paymentTerms" :key="ind2" :value="term.value">{{ term.label }}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="11" style="text-align:left;">
          <a-checkbox v-if="rentalInfo.isReminder || isEditRental" :checked="editRentalInfo.isReminder" style="width:20px;"></a-checkbox>
          <span v-if="rentalInfo.isReminder || isEditRental" class="detail-body-label">Reminder：</span>
          <span v-if="!isEditRental && rentalInfo.isReminder" class="detail-body-content">
            {{ rentalInfo.reminderDay || '\xa0' }}
            <span v-if="rentalInfo.reminderDay">{{ rentalInfo.reminderDay>1?' days':'day' }}</span>
            <!-- {{ (''+rentalInfo.reminderDay+rentalInfo.reminderDay>1?' days':'day') || '\xa0' }} -->
            <span class="detail-body-content-unit" style="width:140px;text-align:right;">ahead of time</span>
            {{ rentalInfo.reminderTime || '\xa0' }}
          </span>
          <span v-if="isEditRental" class="detail-body-content">
            <a-select style="width: 200px;" v-model="editRentalInfo.reminderDay">
              <a-select-option v-for="(day, ind3) in dayList" :key="ind3" :value="day">{{ day+(day>1?' days':'day') }}</a-select-option>
            </a-select>
            <span class="detail-body-content-unit" style="width:140px;text-align:right;">ahead of time</span>
            <a-time-picker v-model="rentalReminderTime" format="HH:mm" size="large" style="width: calc(100% - 352px);" @change="getRentalReminderTime"/>
          </span>
        </a-col>
      </a-row>
      <a-row class="detail-body-row">
        <a-col :span="22">
          <table style="width:100%;font-size:16px;">
            <thead class="ant-table-thead">
              <tr>
                <th style="width:15%;text-align:center;">Due Date</th>
                <th style="width:15%;text-align:center;">Amount</th>
                <th style="width:40%;text-align:center;">Deposit Slip</th>
                <th style="width:15%;text-align:center;">Status</th>
                <th style="width:15%;text-align:center;">Action</th>
              </tr>
            </thead>
            <tbody class="ant-table-tbody">
              <tr v-for="(rental,ind4) in rentalInfo.rentalList" :key="ind4" class="ant-table-row">
                <td style="width:15%;text-align:center;">{{ rental.date }}</td>
                <td style="width:15%;text-align:center;">{{ rental.amount }}</td>
                <td style="width:40%;text-align:center;">
                  <img v-for="(slip,ind5) in rental.slip" :key="ind5" :src="slip.url">
                  <img v-for="(newslip,ind6) in uploadImg[ind4]" :key="ind6" :src="newslip.url">
                  <span v-if="userRole == 7" style="display:inline-block;position:relative;">
                    <a-icon type="upload" style="cursor: pointer;"></a-icon>
                    <input type="file" @change="beforeUpload($event,ind4)" class="account-card-content-file">
                  </span>
                </td>
                <td style="width:15%;text-align:center;">{{ rental.status }}</td>
                <td style="width:15%;text-align:center;">
                  <a-button v-if="userRole == 6 && rental.status == 'paid'" type="primary" size="small" @click="confirmPay(rental)">Confirm</a-button>
                  <a-button v-if="userRole == 7 && rental.status != 'paid'" type="primary" size="small" @click="sendPay(rental, ind4)">Send</a-button>
                </td>
              </tr>
            </tbody>
          </table>
        </a-col>
      </a-row>
    </div>
    <div class="detail-body" v-if="userRole == 6">
      <a-row class="detail-body-row" style="margin-top:10px;text-align: right;">
        <a-button v-if="!isEditOwner" type="primary" @click="editOwnerDetail">Edit</a-button>
        <a-button v-if="isEditOwner" @click="cancelOwnerDetail">Cancel</a-button>
        <a-button v-if="isEditOwner" type="primary" @click="confirmOwnerDetail">Confirm</a-button>
      </a-row>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'ownerDetail',
  data () {
    return {
      condo: '',
      user: '',
      userRole: '',
      tower: '',
      unit: '',
      basicInfo: {},

      isEditOwner: false,
      ownerInfo: {ownerList:[]},
      editOwnerInfo: {},

      isEditTenant: false,
      tenantInfo: {tenantList:[]},
      editTenantInfo: {},
      
      isEditRental: false,
      rentalInfo: {rentalList:[]},
      editRentalInfo: {},

      contractList: [
        {value:0, label:'6 Months'}, 
        {value:1, label:'1 Year'}, 
        {value:2, label:'2 Years'}, 
        {value:-1, label:'Other'}, 
      ],
      paymentTerms: [
        {value:1, label:'Monthly'}, 
        {value:2, label:'Every 2 months'}, 
        {value:3, label:'Every 3 months'}, 
        {value:4, label:'Every 4 months'}, 
        {value:5, label:'Every 5 months'}, 
        {value:6, label:'Every 6 months'}, 
        {value:12, label:'One Year'}
      ],
      dayList: [1,2,3,4,5,6,7],
      
      rentalContactStartDateString: '',
      rentalContactEndDateString: '',
      rentalContactDate: [],

      rentalReminderTimeString: '',
      rentalReminderTime: '',

      uploadImg: [[]],
      currentFile: null
    }
  },
  methods: {
    moment,
    changeDate3(time) {
      var date = new Date(time)
      let year = date.getFullYear()
      let monthtemp = date.getMonth() + 1
      let month = (monthtemp >= 10)? monthtemp: ('0'+monthtemp)
      let daytemp = date.getDate()
      let day = (daytemp >= 10)? daytemp: ('0'+daytemp)
      return year + '-' + month + '-' + day
    },
    formatNum (floatNum){	
      let st1=String(floatNum);      // 将浮点数转换为字符串
      let index=st1.indexOf('.');    // 取小数点下标
      let st2=st1.slice(0,index);	  // 将小数点前面的字符串截取出来
      let len=st2.length;
      if(len<3) return st2.concat(st1.slice(index));
      let r=len%3;
        return  (r>0?
          st2.slice(0,r)+','+st2.slice(r,len).match(/\d{3}/g).join():
          st2.slice(r,len).match(/\d{3}/g).join())
            .concat(st1.slice(index));
    },
    beforeUpload(e, index) {
      this.currentFile = e.target.files[0]
      let _this = this;
      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(_this.currentFile); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function () {
        _this.$nextTick(()=>{
          _this.uploadImg[index].push({file:_this.currentFile, url:this.result});
        })
      }
      return false;
    },
    getDetailInfo() {
      let params = {
        condo: this.condo,
        tower: this.tower,
        unit: this.unit
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/getUnitDetail'),
        method: 'get',
        params: this.$http.adornParams({...params})
      }).then((res) => {
        if (res.status == 200) {
          this.basicInfo = {
            area: res.data.data.basicInfo.area,
            type: res.data.data.basicInfo.type,
            parking: res.data.data.basicInfo.parking
          }
          this.ownerInfo = {
            ownerList: res.data.data.ownerInfo.ownerList,
            contactNumber: res.data.data.ownerInfo.contactNumber,
            email: res.data.data.ownerInfo.email,
            spa: res.data.data.ownerInfo.spa,
            idnumber: res.data.data.ownerInfo.idnumber,
            spacontactNumber: res.data.data.ownerInfo.spacontactNumber,
            spaemail: res.data.data.ownerInfo.spaemail
          }
          this.tenantInfo = {
            tenantList: res.data.data.tenantInfo.tenantList,
            contactNumber: res.data.data.tenantInfo.contactNumber,
            email: res.data.data.tenantInfo.email,
            movein: res.data.data.tenantInfo.movein,
            moveout: res.data.data.tenantInfo.moveout,
            broker: res.data.data.tenantInfo.broker,
            brokeridnumber: res.data.data.tenantInfo.brokeridnumber,
            // brokercontactNumber: res.data.data.tenantInfo.brokercontactNumber,
            // brokeremail: res.data.data.tenantInfo.brokeremail,
          }
          this.rentalInfo = {
            contactStartDate: res.data.data.paymentInfo.contractStart,//'2020/10/01',//
            contactEndDate: res.data.data.paymentInfo.contractEnd,//'2021/10/01',//
            deposit: res.data.data.paymentInfo.deposit,//'20',//
            rentalRate: res.data.data.paymentInfo.rentalRate,//'30',//
            terms: res.data.data.paymentInfo.terms,//3,//
            isReminder: res.data.data.paymentInfo.isReminder,//false,//
            reminderDay: res.data.data.paymentInfo.reminderDay,//4,//
            reminderTime: res.data.data.paymentInfo.reminderTime,//'20:30:00',//
            rentalList: res.data.data.paymentInfo.dueList//[]//
          }
          res.data.data.paymentInfo.dueList.forEach((due)=>{
            this.rentalInfo.rentalList.push({
              date: due.dueDate || '\xa0',
              amount: due.dueAmount || '\xa0',
              slip: due.dueSlip || [],
              status: due.dueStatus || '\xa0',
            })
          })
        } else {
          this.$message.error('failed get detailInfo for unit')
        }
      })
    },
    editOwnerDetail() {
      // this.editOwnerInfo = JSON.parse(JSON.stringify(this.ownerInfo))
      // this.isEditOwner = true
      // this.editTenantInfo = JSON.parse(JSON.stringify(this.tenantInfo))
      // this.isEditTenant = true
      this.isEditRental = true
      this.editRentalInfo = JSON.parse(JSON.stringify(this.rentalInfo))
      this.rentalContactDate = [moment(this.editRentalInfo.contactStartDate, 'YYYY/MM/DD'), moment(this.editRentalInfo.contactEndDate, 'YYYY/MM/DD')]
      this.rentalContactStartDateString = this.editRentalInfo.contactStartDate
      this.rentalContactEndDateString = this.editRentalInfo.contactEndDate
      this.rentalReminderTime = moment(this.editRentalInfo.reminderTime, 'HH:mm')
      this.rentalReminderTimeString = this.editRentalInfo.reminderTime
    },
    cancelOwnerDetail() {
      // this.editOwnerInfo = {}
      // this.isEditOwner = false
      // this.editTenantInfo = {}
      // this.isEditTenant = false
      this.editRentalInfo = {}
      this.isEditRental = false
      this.rentalContactStartDateString = ''
      this.rentalContactEndDateString = ''
      this.rentalContactDate = []

      this.rentalReminderTimeString = ''
      this.rentalReminderTime = ''
      
    },
    changeRentalList() {
      this.editRentalInfo.rentalList = []
      if (this.editRentalInfo.terms && this.rentalContactStartDateString && this.rentalContactEndDateString) {
        let totaldays = moment(this.rentalContactEndDateString).diff(moment(this.rentalContactStartDateString), 'days')
        let termStartDate = (moment(this.rentalContactStartDateString).add(-1,'days')).format('YYYY/MM/DD')
        let termEndDate = moment(termStartDate).add(this.editRentalInfo.terms, 'month')
        let termtotaldays = moment(this.rentalContactEndDateString).diff(termEndDate, 'days')
        let termNextEndDate = moment(termEndDate).add(this.editRentalInfo.terms, 'month')
        if (totaldays <= 31 || (totaldays > 31 && termtotaldays <= 0)) {
          let diff2 = termEndDate.diff(moment(termStartDate), 'days')
          let amount = ((this.editRentalInfo.rentalRate * this.editRentalInfo.terms * totaldays) / diff2).toFixed(2)
          this.editRentalInfo.rentalList.push(
            {date: termStartDate, amount: amount, status: 'pending', slip: []}
          )
          // this.editRentalInfo.rentalList.push(
          //   {date: termStartDate, amount: this.editRentalInfo.rentalRate * this.editRentalInfo.terms, status: 'pending', slip: []}
          // )
        } else {
          let termStartDate = (moment(this.rentalContactStartDateString).add(-1,'days')).format('YYYY/MM/DD')
          this.editRentalInfo.rentalList.push(
            {date: termStartDate, amount: this.editRentalInfo.rentalRate * this.editRentalInfo.terms, status: 'pending', slip: []}
          )
          let termEndDate = moment(termStartDate).add(this.editRentalInfo.terms, 'month')
          let termdays = moment(this.rentalContactEndDateString).diff(termEndDate, 'days')
          let termNextEndDate = moment(termEndDate).add(this.editRentalInfo.terms, 'month')
          let termNextdays = moment(this.rentalContactEndDateString).diff(termNextEndDate, 'days')
          while(termNextdays > 0) {
            termStartDate = termEndDate.format('YYYY/MM/DD')
            termEndDate = moment(termStartDate).add(this.editRentalInfo.terms, 'month')
            termdays = moment(this.rentalContactEndDateString).diff(termEndDate, 'days')
            termNextEndDate = moment(termEndDate).add(this.editRentalInfo.terms, 'month')
            termNextdays = moment(this.rentalContactEndDateString).diff(termNextEndDate, 'days')
            this.editRentalInfo.rentalList.push(
              {date: termStartDate, amount: this.editRentalInfo.rentalRate * this.editRentalInfo.terms, status: 'pending', slip: []}
            )
          } 
          if (termNextdays < 0) {
            let diff2 = termNextEndDate.diff(termEndDate, 'days')
            let amount = ((this.editRentalInfo.rentalRate * this.editRentalInfo.terms * termdays) / diff2).toFixed(2)
            termStartDate = termEndDate.format('YYYY/MM/DD')
            this.editRentalInfo.rentalList.push(
              {date: termStartDate, amount: amount, status: 'pending', slip: []}
            )
            // this.editRentalInfo.rentalList.push(
            //   {date: termStartDate, amount: this.editRentalInfo.rentalRate * this.editRentalInfo.terms, status: 'pending', slip: []}
            // )
          }
        }
      }
    },
    confirmOwnerDetail() {
      let params = {
        tower: this.tower,
        unit: this.unit,
        userID: this.userID,
        contactStartDate: this.rentalContactStartDateString,
        contactEndDate: this.rentalContactEndDateString,
        deposit: this.editRentalInfo.deposit,
        rentalRate: this.editRentalInfo.rentalRate,
        terms: this.editRentalInfo.terms,
        isReminder: this.editRentalInfo.isReminder,
        reminderDay: this.editRentalInfo.reminderDay,
        reminderTime: this.rentalReminderTimeString,
        rentalList: this.editRentalInfo.rentalList
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/editUnitPayment'),
        method: 'post',
        data: this.$http.adornData({...params})
      }).then((res) => {
        if (res.status == 200) {
          this.$message.success('success set payment info')
          this.cancelOwnerDetail()
          this.getDetailInfo()
        } else {
          this.$message.error('failed set payment info')
        }
      })
    },
    addOwner() {
      this.editOwnerInfo.ownerList.push({owner: '\xa0', idnumber: '\xa0'})
    },
    deleteSingleOwner(index) {
      this.editOwnerInfo.ownerList.splice(index, 1)
    },
    addTenant() {
      this.editTenantInfo.tenantList.push({tenant: '\xa0', idnumber: '\xa0'})
    },
    deleteSingleTenant(index) {
      this.editTenantInfo.tenantList.splice(index, 1)
    },
    getTenantMoveinDateChange(date, dateString) {
      this.editTenantInfo.movein = dateString
    },
    getTenantMoveoutDateChange(date, dateString) {
      this.editTenantInfo.moveout = dateString
    },
    getRentalReminderTime(date, dateString) {
      this.rentalReminderTimeString = dateString
    },
    changeRentalContactDate(value) {
      switch(value) {
        case 0: 
          this.rentalContactDate = [moment(), moment().add(6,'month')]
          this.getRentalContactDateChange({value: this.rentalContactDate})
          break
        case 1: 
          this.rentalContactDate = [moment(), moment().add(1,'year')]
          this.getRentalContactDateChange({value: this.rentalContactDate})
          break
        case 2: 
          this.rentalContactDate = [moment(), moment().add(2,'year')]
          this.getRentalContactDateChange({value: this.rentalContactDate})
          break
        default: break
      }
    },
    getRentalContactDateChange(dateParams){
      // value, dateString
      this.rentalContactDate = dateParams
      this.rentalContactStartDateString = dateParams[0]? this.changeDate3(dateParams[0]._d): ''
      this.rentalContactEndDateString = dateParams[1]? this.changeDate3(dateParams[1]._d): ''
      this.changeRentalList()
    },
    changeRate() {
      this.editRentalInfo.rentalList.forEach((rental)=>{
        rental.amount = this.editRentalInfo.rentalRate
      })
    },
    changeRentalTerms() {
      this.changeRentalList()
    },    
    confirmPay(rental) {
      let params = {
        tower: this.tower,
        unit: this.unit,
        userID: this.userID,
        dueDate: rental.date
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/confirmUnitDatePayment'),
        method: 'post',
        data: this.$http.adornData({...params})
      }).then((res) => {
        if (res.status == 200) {
          this.$message.success('success confirm payment')
          this.getDetailInfo()
          this.uploadImg = [[]]
          this.currentFile = null
        } else {
          this.$message.error('failed confirm payment')
        }
      })
    },
    sendPay(rental, ind4) {
      // // let params = {
      // //   tower: this.tower,
      // //   unit: this.unit,
      // //   userID: this.userID,
      // //   dueDate: rental.date,
      // //   slip: this.uploadImg[ind4]
      // // }
      // this.$http({
      //   url: this.$http.adornUrl('/dev-api/sendUnitDatePayment'),
      //   method: 'post',
      //   data: this.$http.adornData({...params})
      // }).then((res) => {
      //   if (res.status == 200) {
      //     this.$message.success('success send payment voucher')
      //     this.getRentalList()
      //     this.uploadImg = [[]]
      //     this.currentFile = null
      //   } else {
      //     this.$message.error('failed confirm payment voucher')
      //   }
      // })
    },
    gotoAbout() {
      this.$bus.emit('gotoAbout', this.condo)
    }
  },
  created() {
    this.userID = JSON.parse(localStorage.getItem('userInfo')).userID
    this.userRole = JSON.parse(localStorage.getItem('userInfo')).userRole
    this.condoID = this.$router.currentRoute.query.condoID
    this.condo = this.$router.currentRoute.query.condo
    this.tower = this.$router.currentRoute.query.tower
    this.unit = this.$router.currentRoute.query.unit
    this.getDetailInfo()
  }
}
</script>
