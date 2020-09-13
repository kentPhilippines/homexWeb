<style lang="less" scoped>
@import './personnel.less';
</style>
<template>
  <div>
		<div class="search-head">
      <a-row>
        <a-col :span="20" class="search-head-logo">
          <img src="../../../../static/img/reception.jpg">
          <span>Reception</span>
        </a-col>
        <a-col :span="4" style="line-height:74px;text-align:right">
          <a-button type="primary" @click="addReception">+Add</a-button>
        </a-col>
      </a-row>
    </div>
    <div class="content-body">
      <a-table ref="table" class="order-list-table" :columns="columns" :dataSource="receptionList" :loading="loading"
        :pagination="false">
        <template slot="number" slot-scope="text, record, index">{{index+1}}</template>
        <template slot="staffName" slot-scope="text">{{text}}</template>
        <template slot="tower" slot-scope="text">{{text}}</template>
        <template slot="phone" slot-scope="text">{{text}}</template>
        <template slot="email" slot-scope="text">{{text}}</template>
        <template slot="createDate" slot-scope="text">{{text}}</template>
        <template slot="operation" slot-scope="text, record, index">
          <span style="display:inline-block;min-width:90px;">
            <a-icon type="edit" @click="editReception(record)"></a-icon>
            <a-icon type="delete" @click="deleteReception(record)"></a-icon>
          </span>
        </template>
      </a-table>
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
</template>

<script>
export default {
  name: 'reception',
	data () {
		return {
      userID: '',
      condoName: '',
      columns: [
        {
          align: 'center',
          title: 'No.',
          key: 'number',
          scopedSlots: {
            customRender: 'number'
          }
        },
        {
          align: 'center',
          title: 'Staff Name',
          dataIndex: 'staffName'
        },
        {
          align: 'center',
          title: 'Tower',
          dataIndex: 'tower'
        },
        {
          align: 'center',
          title: 'Phone',
          dataIndex: 'phone'
        },
        {
          align: 'center',
          title: 'Email',
          dataIndex: 'email'
        },
        {
          align: 'center',
          title: 'Create Date',
          dataIndex: 'createDate',
          scopedSlots: {
            customRender: 'createDate'
          }
        },
        {
          align: 'center',
          title: 'Admin',
          key: 'operation',
          scopedSlots: {
            customRender: 'operation'
          }
        },
      ],
      loading: false,
      receptionList: [],
      total: 100,
      currentPage: 1,
      pageSize: 20,
		}
  },
  // computed: {
	// 	userInfo () {
	// 		return JSON.parse(localStorage.getItem('userInfo'))
  //   }
	// },
  methods: {
    onSearch(value) {
      this.currentPage = 1
      this.pageSize = 20
      this.getReceptionList()
    },
    showTotal() {
      return '共 ' + Math.ceil(this.total / this.pageSize) + ' 页\xa0\xa0\xa0\xa0\xa0\xa0当前 ' + this.currentPage + '/' + Math.ceil(this.total / this.pageSize) + ' 页'
    },
    handlePageChange(page, pageSize) {
      this.currentPage = page
      this.pageSize = pageSize
      this.getMTable()
    },
    handlePageSizeChange(current, size) {
      this.currentPage = current
      this.pageSize = size
      this.getMTable()
    },
    getReceptionList() {
      let params = {
        userID: this.userID,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.loading = true
      this.$http({
        url: this.$http.adornUrl('/dev-api/getReceptionList'),
        method: 'get',
        params: this.$http.adornParams({...params})
      }).then(res => {
        if (res.status === 200) {
          this.receptionList = []
          this.receptionList = res.data.data.receptionList
          this.total = res.data.data.receptionTotal
          this.loading = false
        } else {
          this.$message.error(res.data.message, 3)
        }
      })
      // this.loading = false
      // this.receptionList = []
      // let len = parseInt(Math.random() * 10)
      // this.total = len
      // for (let i = 0; i < len; i++) {
      //   this.receptionList.push({
      //     key: i + 1,
      //     staffName: 'alice',
      //     phone: '09272895968',
      //     email: 'a;sl;kasj;kdfa;skdfjaasdf@homex.ph',
      //     tower: '1,2,3,4',
      //     createDate: '2020-10-5',
      //   })
      // }
    },
    addReception() {
      this.$store.commit('setPath', '/property/personnel/addreception')
      this.$router.push({'path':'/property/personnel/addreception',query:{receptionInfo:null}})
    },
    editReception(record) {
      this.$store.commit('setPath', '/property/personnel/addreception')
      this.$router.push({'path':'/property/personnel/addreception',query:{receptionInfo:record}})
    },
    deleteReception(record) {
      let params = {
        receptionID: record.id,
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/deleteReception'),
        method: 'post',
        data: this.$http.adornData({...params})
      }).then(res => {
        if (res.status == 200) {
          this.$message.success('success delete reception', 3)
          this.currentPage = 1
          this.getReceptionList()
        } else {
          this.$message.error(res.data.message, 3)
        }
      })
    }
  },
	created() {
    this.userID = JSON.parse(localStorage.getItem('userInfo')).userID
    this.getReceptionList()
	}
}
</script>


