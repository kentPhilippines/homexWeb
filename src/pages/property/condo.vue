<style lang="less" scoped>
@import './condo.less';
</style>

<template>
  <div>
    <div class="search-head-short">
      <a-row>
        <a-col :span="20">
          <div class="board-card-body-center">
            <a-select v-model="towerChoose" style="width:120px;">
              <a-select-option v-for="tower in towerList" :key="tower.id" :value="tower.id">{{ tower.name }}</a-select-option>
            </a-select>
            <a-input-search v-model="towerInput" placeholder="input search text" enter-button @search="onSearchTower" style="width:200px;margin-left:-5px;"/>
          </div>
        </a-col>
        <a-col :span="4" style="line-height:34px;text-align:right">
          <a-button type="primary" @click="condoImport()">Import</a-button>
        </a-col>
      </a-row>
    </div>
    <div class="content-body">
      <div class="content-body-condo" v-for="(unit, index) in unitList" :key="index" @click="unitDetail(unit)">
        <div class="content-body-condo-card">
          <div class="content-body-condo-top">{{ unit.tower }}</div>
          <div class="content-body-condo-bottom">{{ unit.unit }}</div>
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
      showMenu: true,
      towerChoose: '',
      towerList: [],
      towerInput: '',
      unitList: [],
    }
  },
  watch: {
    currentPath: function(val, oldval) {
      if (val == '/property/condo') {
        this.showMenu = true
      }
    }
  },
  computed: {
    userInfo() {
			return JSON.parse(localStorage.getItem('userInfo'))
		},
    currentPath() {
      return this.$store.state.menu.path
    }
  },
  methods: {
    getTowerList() {
      let params = {
        userID: this.userInfo.userID
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/getTowerList'),
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
          this.$message.error('failed get towerlist')
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
        } else {
          this.$message.error('failed get unitList')
        }
      })
      // this.unitList = []
      // this.unitList = [
      //   {id: '1', tower: 'Tower1', unit: '1001'},
      //   {id: '2', tower: 'Tower2', unit: '1010'},
      //   {id: '3', tower: 'Tower3', unit: '1011'}
      // ]
    },
    condoImport() {
      this.showMenu = false
      let path = '/property/condo/condoImport'
      this.$store.commit('setPath', path)
      this.$router.push(path)
    },
    unitDetail(obj) {
      this.showMenu = false
      let path = '/property/condo/condoDetail'
      this.$store.commit('setPath', path)
      this.$router.push({'path': path, query: {tower: obj.towerID, unit: obj.id}})
    }
  },
  created() {
    this.getTowerList()
  }
}
</script>
