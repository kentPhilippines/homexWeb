<style lang="less" scoped>
@import './condoDetail.less';
</style>

<template>
  <div>
    <!-- condoDetail -->
    <div class="detail-body">
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
    <div class="detail-title">OWNER INFO：</div>
    <div class="detail-body">
      <a-row v-if="!isEditOwner" v-for="(owner, index) in ownerInfo.ownerList" :key="index" class="detail-body-row">
        <a-col :span="11">
          <span class="detail-body-label">Owner：</span>
          <span class="detail-body-content">{{ owner.owner }}</span>
        </a-col>
        <a-col :span="11">
          <span class="detail-body-label">ID No.：</span>
          <span class="detail-body-content">{{ owner.idnumber }}</span>
        </a-col>
      </a-row>
      <a-row v-if="isEditOwner" v-for="(owner, index) in editOwnerInfo.ownerList" :key="index" class="detail-body-row">
        <a-col :span="11">
          <span class="detail-body-label">Owner：</span>
          <a-input v-model="owner.owner" class="detail-body-content"></a-input>
        </a-col>
        <a-col :span="11">
          <span class="detail-body-label">ID No.：</span>
          <a-input v-model="owner.idnumber" class="detail-body-content"></a-input>
        </a-col>
        <a-col :span="2" style="text-align:right;">
          <div class="detail-body-icon"><a-icon type="minus-circle" @click="deleteSingleOwner(index)"/></div>
        </a-col>
      </a-row>
      <a-row class="detail-body-row">
        <a-col :span="11">
          <span class="detail-body-label">Contact No.：</span>
          <span v-if="!isEditOwner" class="detail-body-content">{{ ownerInfo.contactNumber }}</span>
          <a-input v-if="isEditOwner" v-model="editOwnerInfo.contactNumber" class="detail-body-content"></a-input>
        </a-col>
        <a-col :span="11">
          <span class="detail-body-label">Email：</span>
          <span v-if="!isEditOwner" class="detail-body-content">{{ ownerInfo.email }}</span>
          <a-input v-if="isEditOwner" v-model="editOwnerInfo.email" class="detail-body-content"></a-input>
        </a-col>
      </a-row>
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
      <a-row class="detail-body-row" style="margin-top:10px;text-align: right;">
        <a-button v-if="!isEditOwner" type="primary" @click="editOwner">Edit</a-button>
        <a-button v-if="isEditOwner" @click="cancelEditOwner">Cancel</a-button>
        <a-button v-if="isEditOwner" type="primary" @click="confirmEditOwner">Confirm</a-button>
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
          <span class="detail-body-label">Move out：</span>
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
      <a-row class="detail-body-row" style="margin-top:10px;text-align: right;">
        <a-button v-if="!isEditTenant" type="primary" @click="editTenant">Edit</a-button>
        <a-button v-if="isEditTenant" @click="cancelEditTenant">Cancel</a-button>
        <a-button v-if="isEditTenant" type="primary" @click="confirmEditTenant">Confirm</a-button>
      </a-row>
      <div v-if="isEditTenant" class="detail-title-icon"><a-icon type="plus-circle" @click="addTenant()"/></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'condoDetail',
  data () {
    return {
      tower: '',
      unit: '',
      basicInfo: {},
      ownerInfo: {ownerList:[]},
      editOwnerInfo: {},
      tenantInfo: {tenantList:[]},
      editTenantInfo: {},
      isEditOwner: false,
      isEditTenant: false,
    }
  },
  computed: {
		userInfo() {
			return JSON.parse(localStorage.getItem('userInfo'))
    }
  },
  methods: {
    getDetailInfo() {
      let params = {
        condo: '',
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
        } else {
          this.$message.error('failed get detailInfo for unit')
        }
      })
      // this.basicInfo = {
      //   area: 25,
      //   type: 'studio',
      //   parking: '12LC'
      // }
      // this.ownerInfo = {
      //   ownerList: [{owner: 'MASA JOAO', idnumber: '1648372rye2'},{owner: 'MASA JOAO', idnumber: '1648372rye2'}],
      //   contactNumber: '12345678',
      //   email: 'hanshanaslkjfaskdf@gmail.com',
      //   spa: '12345678',
      //   idnumber: '12345678',
      //   spacontactNumber: '12345678',
      //   spaemail: '12345678'
      // }
      // this.tenantInfo = {
      //   tenantList: [{tenant: 'MASA JOAO', idnumber: '1648372rye2'},{tenant: 'MASA JOAO', idnumber: '1648372rye2'}],
      //   contactNumber: '12345678',
      //   email: 'hanshanaslkjfaskdf@gmail.com',
      //   movein: '12345678',
      //   moveout: '12345678',
      //   broker: '12345678',
      //   brokeridnumber: '12345678',
      //   brokercontactNumber: '12345678',
      //   brokeremail: '12345678'
      // }
    },
    editOwner() {
      this.editOwnerInfo = JSON.parse(JSON.stringify(this.ownerInfo))
      this.isEditOwner = true
    },
    cancelEditOwner() {
      this.editOwnerInfo = {}
      this.isEditOwner = false
    },
    addOwner() {
      this.editOwnerInfo.ownerList.push({owner: '\xa0', idnumber: '\xa0'})
    },
    deleteSingleOwner(index) {
      this.editOwnerInfo.ownerList.splice(index, 1)
    },
    confirmEditOwner() {
      let params = {
        userID: this.userInfo.userID,
        tower: this.tower,
        unit: this.unit,
        ownerList: this.editOwnerInfo.ownerList,
        contactNumber: this.editOwnerInfo.contactNumber,
        email: this.editOwnerInfo.email,
        spa: this.editOwnerInfo.spa,
        idnumber: this.editOwnerInfo.idnumber,
        spacontactNumber: this.editOwnerInfo.spacontactNumber,
        spaemail: this.editOwnerInfo.spaemail
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/editUnitOwner'),
        method: 'post',
        data: this.$http.adornData({...params})
      }).then((res) => {
        if (res.status == 200) {
          this.$message.success('success change Owner info')
          this.cancelEditOwner()
        } else {
          this.$message.error('failed change Owner info')
        }
      })
    },
    editTenant() {
      this.editTenantInfo = JSON.parse(JSON.stringify(this.tenantInfo))
      this.isEditTenant = true
    },
    cancelEditTenant() {
      this.editTenantInfo = {}
      this.isEditTenant = false
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
    confirmEditTenant() {
      let params = {
        userID: this.userInfo.userID,
        tower: this.tower,
        unit: this.unit,
        tenantList: this.editTenantInfo.tenantList,
        contactNumber: this.editTenantInfo.contactNumber,
        email: this.editTenantInfo.email,
        movein: this.editTenantInfo.movein,
        moveout: this.editTenantInfo.moveout,
        broker: this.editTenantInfo.broker,
        brokeridnumber: this.editTenantInfo.brokeridnumber,
        // brokercontactNumber: this.editTenantInfo.brokercontactNumber,
        // brokeremail: this.editTenantInfo.brokeremail
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/editUnitTenant'),
        method: 'post',
        data: this.$http.adornData({...params})
      }).then((res) => {
        if (res.status == 200) {
          this.$message.success('success change Tenant info')
          this.cancelEditTenant()
        } else {
          this.$message.error('failed change Tenant info')
        }
      })
    }
  },
  created() {
    this.tower = this.$router.currentRoute.query.tower
    this.unit = this.$router.currentRoute.query.unit
    // this.getBasicInfo()
    // this.getOwnerInfo()
    // this.getTenantInfo()
    this.getDetailInfo()
  }
}
</script>
