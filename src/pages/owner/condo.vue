<style lang="less" scoped>
@import './condo.less';
</style>

<template>
  <div>
    <div class="search-head-short">
      <a-row>
        <a-col :span="18">
          <div class="board-card-body-center">
            <a-select v-model="condoChoose" style="width:120px;">
              <a-select-option v-for="condo in condoList" :key="condo.condoID" :value="condo.condoID">{{ condo.condoName }}</a-select-option>
            </a-select>
            <a-select v-model="towerChoose" style="width:120px;">
              <a-select-option v-for="tower in towerList" :key="tower.id" :value="tower.id">{{ tower.name }}</a-select-option>
            </a-select>
            <a-input-search v-model="towerInput" placeholder="input search text" enter-button @search="onSearchTower" style="width:200px;margin-left:-5px;"/>
          </div>
        </a-col>
        <a-col :span="6" style="line-height:34px;text-align:right">
          <div v-if="tenantList.length > 0" class="im-tenant">IM Tenant</div>
          <div v-if="ownerList.length > 0" class="im-owner">IM Owner</div>
        </a-col>
      </a-row>
    </div>
    <div class="content-body">
      <div class="content-body-condo" v-for="(unit, index) in unitList" :key="index">
        <div class="content-body-condo-body" v-if="unit.type == 'owner'" @click="unitOwnerUnit(unit)">
          <div class="content-body-condo-title-owner">{{ unit.condoName }}</div>
          <div class="content-body-condo-card">
            <div class="content-body-condo-top">{{ unit.tower }}</div>
            <div class="content-body-condo-bottom">{{ unit.unit }}</div>
          </div>
        </div>
        <div class="content-body-condo-body" v-if="unit.type == 'tenant'" @click="unitTenantUnit(unit)">
          <div class="content-body-condo-title-tenant">{{ unit.condoName }}</div>
          <div class="content-body-condo-card">
            <div class="content-body-condo-top">{{ unit.tower }}</div>
            <div class="content-body-condo-bottom">{{ unit.unit }}</div>
          </div>
        </div>
      </div>
    </div>
    <router-view v-if="!showMenu" style="position:absolute;top:64px;left:100px;right:0px;bottom:64px;background:white;overflow:auto;"></router-view>
  </div>
</template>

<script>
export default {
  name: 'condo',
  data () {
    return {
      userID: '',
      showMenu: true,
      condoChoose: '',
      condoList: [],
      towerChoose: '',
      towerList: [],
      towerInput: '',
      unitList: [],

      ownerList: [],
      tenantList: []
    }
  },
  watch: {
    currentPath: function(val, oldval) {
      if (val == '/owner/condo') {
        this.showMenu = true
      }
    }
  },
  computed: {
    currentPath() {
      return this.$store.state.menu.path
    },
    userInfo() {
			return JSON.parse(localStorage.getItem('userInfo'))
		}
  },
  methods: {
    getCondoList() {
      let params = {
        userID: this.userID,
        condoName: '',
        currentPage: '',
        pageSize: ''
      }
      this.loading = true
      this.$http({
        url: this.$http.adornUrl('/dev-api/condo/getCondoList'),
        method: 'get',
        params: this.$http.adornParams({
          ...params
        })
      }).then(res => {
        if (res.status === 200) {
          debugger;
          this.condoList = []
          this.condoList = res.data.data
          this.condoChoose = this.condoList[0].condoID
        } else {
          this.$message.error(res.data.message)
        }
      })
      // this.condoList = []
      // this.condoList = [
      //   {id: '1', name: 'condo1'},
      //   {id: '2', name: 'condo2'},
      //   {id: '3', name: 'condo3'}
      // ]
      // this.condoChoose = this.condoList[0].id
    },
    getTowerList() {
      let params = {
        userID: this.userInfo.userID
      }
      this.$http({
        url: this.$http.adornUrl('/condo/getTowerList'),
        method: 'get',
        params: this.$http.adornParams({...params})
      }).then((res) => {
        if (res.status == 200) {
          this.towerList = []
          this.towerList = res.data.data.towerList
          this.towerChoose = this.$store.state.condoInfo.tower || this.towerList[0].id
          this.towerInput = this.$store.state.condoInfo.unit || ''
          this.getUnitList()
        } else {
          this.$message.error(res.data.message)
        }
      })
      // this.towerList = []
      // this.towerList = [
      //   {id: '1', name: 'Tower1'},
      //   {id: '2', name: 'Tower2'},
      //   {id: '3', name: 'Tower3'}
      // ]
      // this.towerChoose = this.$store.state.condoInfo.tower || this.towerList[0].id
      // this.towerInput = this.$store.state.condoInfo.unit || ''
      // this.getUnitList()
    },
    onSearchTower() {
      this.getUnitList()
    },
    getUnitList() {
      let params = {
        userID: this.userID,
        condo: this.condoChoose,
        tower: this.towerChoose,
        unit: this.towerInput
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/condo/getUnitList'),
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
          // this.unitList.forEach((unit, i)=>{
          //   if (i % 2 == 0) {
          //     unit.type = 'owner'
          //     this.ownerList.push(unit)
          //   } else {
          //     unit.type = 'tenant'
          //     this.tenantList.push(unit)
          //   }
          // })
        } else {
          this.$message.error(res.data.message)
        }
      })
      // this.unitList = []
      // this.unitList = [
      //   {id: '1', condoID: '1', condoName: 'Beacon Condo', tower: 'Tower1', unit: '1001', type: 'owner'},
      //   {id: '2', condoID: '2', condoName: 'Avida Towers San Lorenzo', tower: 'Tower2', unit: '1010', type: 'owner'},
      //   {id: '3', condoID: '3', condoName: 'Avida Towers San Lorenzo', tower: 'Tower3', unit: '1011', type: 'tenant'}
      // ]
    },
    unitOwnerUnit(obj) {
      this.showMenu = false
      let path = '/owner/condo/ownerdetail'
      this.$store.commit('setPath', path)
      this.$router.push({'path': path, query: {condo: obj.condoName, condoID: obj.condoID, tower: obj.towerID, unit: obj.id}})
    },
    unitTenantUnit(obj) {
      this.showMenu = false
      let path = '/owner/condo/tenantdetail'
      this.$store.commit('setPath', path)
      this.$router.push({'path': path, query: {condo: obj.condoName, condoID: obj.condoID, tower: obj.towerID, unit: obj.id}})
    }
  },
  created() {
    this.userID = JSON.parse(localStorage.getItem('userInfo')).userID
    this.getCondoList()
    this.getTowerList()
  }
}
</script>



