<style lang="less" scoped>
@import './addTodoNotice.less';
</style>

<template>
  <div class="add-back">
    <div class="add-notice">
      <div class="add-title">To do list</div>
      <a-row class="add-search">
        <a-col :span="11">
          <span class="add-search-label">Date:</span>
          <a-date-picker class="add-search-content" format="MM/DD/YYYY HH:mm" show-time placeholder="Select Time" @change="onChange"  @ok="onOk"/>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col :span="12">
          <span class="add-search-label">To:</span>
          <div class="add-search-content" style="display:flex;align-items:center;margin-top:19px;">
            <a-select v-model="towerChoose" style="width:55%;" @change="getUnitList()">
              <a-select-option v-for="tower in towerList" :key="tower.id" :value="tower.id">{{ tower.name }}</a-select-option>
            </a-select>
            <a-select v-model="towerUnit1" style="width:20%;">
              <a-select-option v-for="unit in unitList" :key="unit.id" :value="unit.id">{{ unit.unit }}</a-select-option>
            </a-select>
            <span style="display:inline-block;line-height:20px;">-</span>
            <a-select v-model="towerUnit2" style="width:20%;">
              <a-select-option v-for="unit in unitList" :key="unit.id" :value="unit.id">{{ unit.unit }}</a-select-option>
            </a-select>
            <!-- <a-input v-model="towerInput" placeholder="input search text" style="width:45%;"/> -->
          </div>
        </a-col>
      </a-row>
      <a-row class="add-search">
        <a-col :span="24">
          <span class="add-search-label">Subject:</span>
          <a-input class="add-search-content" v-model="subject" placeholder="water disconnection"></a-input>
        </a-col>
      </a-row>
      <div class="add-title">edit tools + add pics</div>
      <a-input class="add-content" v-model="content"></a-input>
      <a-row class="add-search">
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" @click="addTodo">Send</a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addTodo',
  data () {
    return {
      dateString: '',
      towerChoose: '',
      towerList: [],
      towerUnit1: '',
      towerUnit2: '',
      unitList: [],
      towerInput: '',
      subject: '',
      content: ''
    }
  },
  computed: {
    userInfo() {
			return JSON.parse(localStorage.getItem('userInfo'))
    }
  },
  methods: {
    onChange(value, dateString) {
      console.log('Selected Time: ', value);
      console.log('Formatted Selected Time: ', dateString);
      this.dateString = dateString
    },
    onOk(value) {
      console.log('onOk: ', value);
    },
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
    getUnitList() {
      let params = {
        userId: this.userInfo.userId,
        tower: this.towerChoose || '',
        unit: '',
        condo: this.userInfo.userId,
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
      //   {id: '1', unit: 'unit1'},
      //   {id: '2', unit: 'unit2'},
      //   {id: '3', unit: 'unit3'}
      // ]
    },
    addTodo() {
      let params = {
        time: this.dateString,
        toTower: this.towerChoose,
        toUnit: this.towerUnit1 + (this.towerUnit2? ('-'+this.towerUnit2): ''),//this.towerInput,
        subject: this.subject,
        content: this.content,
        userId: this.userInfo.userId
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/addNotice'),
        method: 'post',
        data: this.$http.adornData({...params})
      }).then((res) => {
        if (res.status == 200) {
          this.$message.success('success add to do')
          this.$router.push('/property/dashboard')
        } else {
          this.$message.error('failed add to do')
        }
      })
    }
  },
  created() {
    this.getTowerList()
    this.getUnitList()
  }
}
</script>
