<style lang="less" scoped>
@import './condoManage.less';
@import '../property/form/form.less';
</style>
<template>
  <div>
		<div class="search-head">
      <a-row>
        <a-col :span="20">
          <a-input-search class="search-head-input" v-model="condoName" placeholder="condo name" enter-button @search="onSearch" />
        </a-col>
        <a-col :span="4" :style="{ textAlign: 'right' }">
          <a-button type="primary" @click="addCondo">+Add</a-button>
        </a-col>
      </a-row>
    </div>
    <div class="content-body">
      <table class="form-table">
        <thead class="ant-table-thead">
          <tr>
            <th style="width:10%;text-align:center;">No.</th>
            <th style="width:20%;text-align:center;">Condo Name</th>
            <th style="width:10%;text-align:center;">Phone</th>
            <th style="width:20%;text-align:center;">Email</th>
            <th style="width:20%;text-align:center;">Tower</th>
            <th style="width:10%;text-align:center;">Create Date</th>
            <th style="width:10%;text-align:center;">HomeX</th>
          </tr>
        </thead>
      </table>
      <table class="form-table">
        <tbody class="ant-table-tbody">
          <tr v-for="(record, index) in condoData" :key="index" >
            <td style="width:10%;text-align:center;">{{ index+1 }}</td>
            <td style="width:20%;text-align:center;">
              <a-input v-if="record.isEdit" v-model="editCondoInfo.userName"></a-input>
              <a v-if="!record.isEdit" @click="gotoAbout(record)">{{record.userName}}</a>
            </td>
            <td style="width:10%;text-align:center;">
              <a-input v-if="record.isEdit" v-model="editCondoInfo.userPhone"></a-input>
              <span v-if="!record.isEdit">{{record.userPhone}}</span>
            </td>
            <td style="width:20%;text-align:center;">
              <a-input v-if="record.isEdit" v-model="editCondoInfo.userEmail"></a-input>
              <span v-if="!record.isEdit">{{record.userEmail}}</span>
            </td>
            <td style="width:20%;text-align:center;">
              <a-input v-if="record.isEdit" v-model="editCondoInfo.tower"></a-input>
              <span v-if="!record.isEdit">{{record.tower}}</span>
            </td>
            <td style="width:10%;text-align:center;">
              <a-input v-if="record.isEdit" v-model="record.createTime" :disabled="true"></a-input>
              <span v-if="!record.isEdit">{{record.createTime}}</span>
            </td>
            <td style="width:10%;text-align:center;">
              <span style="display:inline-block;min-width:90px;">
                <a-icon v-if="record.isEdit" type="check-circle" @click="saveCondo(record)"></a-icon>
                <a-icon v-if="record.isEdit" type="close-circle" @click="cancelCondo(record)"></a-icon>
                <a-icon v-if="!record.isEdit" type="edit" @click="editCondo(record)"></a-icon>
                <a-icon v-if="!record.isEdit" type="delete" @click="deleteCondo(record)"></a-icon>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="content-pagination" style="font-size:12pt;">
        <a-pagination
          :total="total"
          :current="currentPage"
          :pageSize="pageSize"
          @change="handlePageChange"
          style="float:right;margin:16px 0;"/>
      </div>
      <!-- <a-table ref="table" class="order-list-table" :columns="columns" :dataSource="condoData" :loading="loading"
        :pagination="false">
        <template slot="number" slot-scope="text, record, index">{{index+1}}</template>
        <template slot="condoName" slot-scope="text, record">
          <a-input v-if="record.isEdit" v-model="editCondoInfo.condoName"></a-input>
          <a v-if="!record.isEdit" @click="gotoAbout(record)">{{text}}</a>
        </template>
        <template slot="phone" slot-scope="text, record">
          <a-input v-if="record.isEdit" v-model="editCondoInfo.phone"></a-input>
          <span v-if="!record.isEdit">{{text}}</span>
        </template>
        <template slot="email" slot-scope="text, record">
          <a-input v-if="record.isEdit" v-model="editCondoInfo.email"></a-input>
          <span v-if="!record.isEdit">{{text}}</span>
        </template>
        <template slot="tower" slot-scope="text, record">
          <a-input v-if="record.isEdit" v-model="editCondoInfo.tower"></a-input>
          <span v-if="!record.isEdit">{{text}}</span>
        </template>
        <template slot="createDate" slot-scope="text, record">
          <a-input v-if="record.isEdit" v-model="record.createDate" :disabled="true"></a-input>
          <span v-if="!record.isEdit">{{text}}</span>
        </template>
        <template slot="operation" slot-scope="text, record, index">
          <span style="display:inline-block;min-width:90px;">
            <a-icon v-if="record.isEdit" type="check-circle" @click="saveCondo(record)"></a-icon>
            <a-icon v-if="record.isEdit" type="close-circle" @click="cancelCondo(record)"></a-icon>
            <a-icon v-if="!record.isEdit" type="edit" @click="editCondo(record)"></a-icon>
            <a-icon v-if="!record.isEdit" type="delete" @click="deleteCondo(record)"></a-icon>
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
      </div>  -->
    </div>
  </div>
</template>

<script>
export default {
	data () {
		return {
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
          title: 'Condo Name',
          dataIndex: 'condoName',
          scopedSlots: {
            customRender: 'condoName'
          }
        },
        {
          align: 'center',
          title: 'Phone',
          dataIndex: 'phone',
          scopedSlots: {
            customRender: 'phone'
          }
        },
        {
          align: 'center',
          title: 'Email',
          dataIndex: 'email',
          scopedSlots: {
            customRender: 'email'
          }
        },
        {
          align: 'center',
          title: 'Tower',
          dataIndex: 'tower',
          scopedSlots: {
            customRender: 'tower'
          }
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
          title: 'HomeX',
          key: 'operation',
          scopedSlots: {
            customRender: 'operation'
          }
        },
      ],
      loading: false,
      condoData: [],
      total: 100,
      currentPage: 1,
      pageSize: 20,

      editCondoInfo: {},
		}
  },
  computed: {
		userInfo () {
			return JSON.parse(localStorage.getItem('userInfo'))
    }
	},
  methods: {
    onSearch(value) {
      this.currentPage = 1
      this.pageSize = 20
      this.getCondoList()
    },
    showTotal() {
      return '共 ' + Math.ceil(this.total / this.pageSize) + ' 页\xa0\xa0\xa0\xa0\xa0\xa0当前 ' + this.currentPage + '/' + Math.ceil(this.total / this.pageSize) + ' 页'
    },
    handlePageChange(page, pageSize) {
      this.currentPage = page
      this.pageSize = pageSize
      this.getCondoList()
    },
    handlePageSizeChange(current, size) {
      this.currentPage = current
      this.pageSize = size
      this.getCondoList()
    },
    getCondoList() {
      let params = {
        userId: this.userId,
        condoName: this.condoName,
        currentPage: this.currentPage,
        pageSize: this.pageSize
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
          this.condoData = []
          // this.condoData = res.data.data
          res.data.rows.forEach(data=>{
            this.condoData.push({
              ...data,
              isEdit: false
            })
          })
          this.total = res.data.total
          this.loading = false
        } else {
          this.$message.error(res.data.message)
        }
      })
      // this.loading = false
      // this.condoData = []
      // let len = parseInt(Math.random() * 10)
      // this.total = len
      // for (let i = 0; i < len; i++) {
      //   this.condoData.push({
      //     key: i + 1,
      //     condoID: i + 1,
      //     condoName: 'jazz residence',
      //     phone: '09272895968',
      //     email: 'a;sl;kasj;kdfa;skdfjaasdf@homex.ph',
      //     tower: '1,2,3,4',
      //     createDate: '2020-10-5',
      //   })
      // }
    },
    addCondo() {
      this.$store.commit('setPath', '/company/addcondo')
      this.$router.push('/company/addcondo')
    },
    editCondo(record) {
      this.editCondoInfo = JSON.parse(JSON.stringify(record))
      record.isEdit = true
    },
    saveCondo(record) {
      let params = {
        condoID: record.condoID,
        userId: this.userInfo.userId,
        condoName: this.editCondoInfo.condoName,
        phone: this.editCondoInfo.phone,
        email: this.editCondoInfo.email,
        tower: this.editCondoInfo.tower,
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/condo/editCondo'),
        method: 'post',
        data: this.$http.adornData({
          ...params
        })
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('success change condo')
          this.cancelCondo()
          this.getCondoList()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    cancelCondo(record) {
      this.editCondoInfo = {}
      record.isEdit = false
    },
    deleteCondo(record) {
      let params = {
        condoId: record.condoId,
        userId: this.userInfo.userId
      }
      this.$http({
        url: this.$http.adornUrl('/dev-api/condo/deleteCondo'),
        method: 'post',
        data: this.$http.adornData({
          ...params
        })
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('success deletcondo/getCondoAboe condo')
          this.currentPage = 1
          this.getCondoList()
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    gotoAbout(record) {
      this.$bus.emit('gotoAbout', record.userId)
		},
  },
	created() {
    this.getCondoList()
	}
}
</script>

