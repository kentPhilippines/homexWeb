<style lang="less" scoped>
@import './personnel.less';
</style>
<template>
  <div>
		<div class="search-head">
      <a-row>
        <a-col :span="20" class="search-head-logo">
          <img src="../../../../static/img/blacklist.svg">
          <span>Blacklist</span>
        </a-col>
        <a-col :span="4" style="line-height:74px;text-align:right">
          <a-button type="primary" @click="addBlacklist">+Add</a-button>
        </a-col>
      </a-row>
    </div>
    <div class="content-body">
      <a-table ref="table" class="order-list-table" :columns="columns" :dataSource="blackList" :loading="loading"
        :pagination="false">
        <template slot="number" slot-scope="text, record, index">{{index+1}}</template>
        <template slot="name" slot-scope="text">{{text}}</template>
        <template slot="idnumber" slot-scope="text">{{text}}</template>
        <template slot="phone" slot-scope="text">{{text}}</template>
        <template slot="reason" slot-scope="text">{{text}}</template>
        <template slot="createDate" slot-scope="text">{{text}}</template>
        <template slot="operation" slot-scope="text, record, index">
          <span style="display:inline-block;min-width:90px;">
            <a-icon type="edit" @click="editBlacklist(record)"></a-icon>
            <a-icon type="delete" @click="deleteBlacklist(record)"></a-icon>
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
  name: 'blacklist',
	data () {
		return {
      userId: '',
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
          title: 'Name',
          dataIndex: 'name'
        },
        {
          align: 'center',
          title: 'ID No.',
          dataIndex: 'idnumber'
        },
        {
          align: 'center',
          title: 'Phone',
          dataIndex: 'phone'
        },
        {
          align: 'center',
          title: 'Reason',
          dataIndex: 'reason'
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
      blackList: [],
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
      this.getBlacklist()
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
    getBlacklist() {
      let params = {
        userId: this.userId,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.loading = true
      this.loading = true
      this.$http({
        url: this.$http.adornUrl('/dev-api/getBlacklist'),
        method: 'get',
        params: this.$http.adornParams({...params})
      }).then(res => {
        if (res.status === 200) {
          this.blackList = []
          this.blackList = res.data.data.blackList
          this.total = res.data.data.blackTotal
          this.loading = false
        } else {
          this.$message.error(res.data.message, 3)
        }
      })
      // this.loading = false
      // this.blackList = []
      // let len = parseInt(Math.random() * 10)
      // this.total = len
      // for (let i = 0; i < len; i++) {
      //   this.blackList.push({
      //     key: i + 1,
      //     name: 'alice',
      //     idnumber: '1,2,3,4',
      //     phone: '09272895968',
      //     reason: 'a;sl;kasj;kdfa;skdfjaasdf@homex.ph',
      //     createDate: '2020-10-5',
      //   })
      // }
    },
    addBlacklist() {
      this.$store.commit('setPath', '/property/personnel/addBlacklist')
      this.$router.push({'path':'/property/personnel/addBlacklist',query:{blackInfo:null}})
    },
    editBlacklist(record) {
      this.$store.commit('setPath', '/property/personnel/addBlacklist')
      this.$router.push({'path':'/property/personnel/addBlacklist',query:{blackInfo:record}})
    },
    deleteBlacklist(record) {
      let params = {
        blackID: record.id,
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/deleteBlack'),
        method: 'post',
        data: this.$http.adornData({...params})
      }).then(res => {
        if (res.status == 200) {
          this.$message.success('success delete Black', 3)
          this.currentPage = 1
          this.getReceptionList()
        } else {
          this.$message.error(res.data.message, 3)
        }
      })
    }
  },
	created() {
    this.userId = JSON.parse(localStorage.getItem('userInfo')).userId
    this.getBlacklist()
	}
}
</script>
